export const humanize = (string) => (
  string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
)