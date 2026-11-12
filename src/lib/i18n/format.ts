/** Fills {placeholders} in a dictionary string: fmt("{n} words", { n: 12 }) → "12 words". */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    Object.hasOwn(values, key) ? String(values[key]) : whole,
  );
}
