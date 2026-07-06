export const todayKey = () => new Date().toISOString().slice(0, 10);

export const formatShortDate = (date) =>
  new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(date));

export function lastDays(count) {
  return Array.from({ length: count }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (count - index - 1));
    return date.toISOString().slice(0, 10);
  });
}
