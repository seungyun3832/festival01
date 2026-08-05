import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { FALLBACK_FESTIVALS, transformRawFestival } from './src/data/mockFestivals';
import { RawFestivalItem, Festival } from './src/types';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Busan Festival Data Proxy
  app.get('/api/festivals', async (req, res) => {
    try {
      const apiKey = process.env.FESTIVAL_SERVICE_KEY || 'ZptLw498M1ZXvczUAe2fV5ES1EB7ppeOohofwB8B4%2Bql5g8%2B%2BPXwgJKQCm%2F2GtkxmsGaGs6%2F50j23tK8EZYokw%3D%3D';
      
      // Construct public data API URL
      // apis.data.go.kr expects serviceKey parameter
      const targetUrl = `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${apiKey}&pageNo=1&numOfRows=100&resultType=json`;

      console.log('Fetching Busan festivals from public API...');
      const apiRes = await fetch(targetUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!apiRes.ok) {
        console.warn(`Public API HTTP error: ${apiRes.status}, returning enhanced fallback dataset.`);
        return res.json({
          source: 'fallback',
          total: FALLBACK_FESTIVALS.length,
          items: FALLBACK_FESTIVALS
        });
      }

      const textData = await apiRes.text();
      let jsonData: any = null;
      try {
        jsonData = JSON.parse(textData);
      } catch (err) {
        console.warn('Public API returned non-JSON response (likely XML error or maintenance). Using fallback data.');
        return res.json({
          source: 'fallback',
          total: FALLBACK_FESTIVALS.length,
          items: FALLBACK_FESTIVALS
        });
      }

      // Check for items inside getFestivalKr.item
      const rawItems: RawFestivalItem[] = jsonData?.getFestivalKr?.item || [];

      if (Array.isArray(rawItems) && rawItems.length > 0) {
        const transformed: Festival[] = rawItems.map((raw, idx) => transformRawFestival(raw, idx));
        
        // Merge with fallback to ensure rich coverage of famous festivals
        const existingTitles = new Set(transformed.map(f => f.title));
        const missingFeatured = FALLBACK_FESTIVALS.filter(f => !existingTitles.has(f.title));
        const combined = [...transformed, ...missingFeatured];

        return res.json({
          source: 'api',
          total: combined.length,
          items: combined
        });
      } else {
        console.log('API returned empty item list, returning fallback dataset.');
        return res.json({
          source: 'fallback',
          total: FALLBACK_FESTIVALS.length,
          items: FALLBACK_FESTIVALS
        });
      }
    } catch (error) {
      console.error('Error fetching festival data:', error);
      return res.json({
        source: 'fallback_error',
        total: FALLBACK_FESTIVALS.length,
        items: FALLBACK_FESTIVALS
      });
    }
  });

  // API Route: AI Festival Planner / Assistant via Gemini
  app.post('/api/ai-recommend', async (req, res) => {
    try {
      const { prompt, currentFestivals } = req.body;
      const geminiApiKey = process.env.GEMINI_API_KEY;

      if (!geminiApiKey || geminiApiKey === 'MY_GEMINI_API_KEY') {
        return res.status(400).json({
          error: 'GEMINI_API_KEY가 설정되지 않았습니다. AI 기능을 사용하려면 환경변수를 확인해 주세요.'
        });
      }

      const ai = new GoogleGenAI({ apiKey: geminiApiKey });

      const festivalListSummary = (currentFestivals || FALLBACK_FESTIVALS)
        .slice(0, 15)
        .map((f: Festival) => `- [${f.district}] ${f.title} (${f.usageDayRaw}) : ${f.subTitle} (장소: ${f.mainPlace})`)
        .join('\n');

      const systemInstruction = `당신은 부산광역시 문화 관광 축제 전문 AI 가이드 "부산 축제 브릿지"입니다.
사용자의 질문이나 상황(예: 데이트, 가족 나들이, 아이와 함께, 먹거리 탐방, 특정 월/구 방문 등)에 맞춰 가장 매력적이고 구체적인 부산 축제 일정과 코스를 친절하게 추천해 주세요.

[현재 등록된 주요 부산 축제 목록]
${festivalListSummary}

답변은 가독성 높은 마크다운 형식으로 작성해 주시고, 각 축제의 구·군 위치, 개최 시기, 주요 관람 포인트, 추천 연계 코스(주변 맛집, 카페, 야경 명소)를 포함해 주세요.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\n사용자 질문: ${prompt}` }] }
        ]
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini AI call error:', err);
      return res.status(500).json({ error: 'AI 일정 추천 처리 중 오류가 발생했습니다: ' + (err?.message || '') });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
