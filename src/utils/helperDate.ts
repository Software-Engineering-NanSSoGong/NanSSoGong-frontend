/**
 * YYYY-MM-DD 형태로 출력
 * @param date 바꿀 Date
 * @returns YYYY-MM-DD
 */
export function formatDateToYYYYMMDD(date: Date): string {
  return date
    .toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
}
