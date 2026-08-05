export function isTodayInFestival(startDate?: string, endDate?: string): boolean {
  if (!startDate) return false;
  const today = new Date().toISOString().split('T')[0];
  if (!endDate) return startDate === today;
  return today >= startDate && today <= endDate;
}

export function isDateInFestival(targetDate: string, startDate?: string, endDate?: string): boolean {
  if (!targetDate || !startDate) return false;
  if (!endDate) return startDate === targetDate;
  return targetDate >= startDate && targetDate <= endDate;
}

export function isThisMonthFestival(startDate?: string, endDate?: string): boolean {
  if (!startDate) return false;
  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  const startYM = startDate.substring(0, 7);
  const endYM = endDate ? endDate.substring(0, 7) : startYM;

  return currentYearMonth >= startYM && currentYearMonth <= endYM;
}

export function isWeekendFestival(startDate?: string, endDate?: string): boolean {
  if (!startDate) return false;
  // If no endDate, check if startDate is Sat/Sun
  const s = new Date(startDate);
  const e = endDate ? new Date(endDate) : s;

  let curr = new Date(s);
  while (curr <= e) {
    const day = curr.getDay();
    if (day === 0 || day === 6) return true; // Sunday or Saturday
    curr.setDate(curr.getDate() + 1);
  }
  return false;
}

export function formatDateKR(dateStr?: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[0]}년 ${parseInt(parts[1])}월 ${parseInt(parts[2])}일`;
  }
  return dateStr;
}
