export default function startsCase(string: string): string {
  return string.replace(/^([^])/, (_, a) => a.toUpperCase())
}
