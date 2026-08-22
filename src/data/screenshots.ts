// Drop a real screenshot into src/assets/screenshots/ named after a project slug
// (e.g. eventhub.png, lifelog.jpg, predictor.webp, frametext.png) and it will
// automatically replace the placeholder. No code changes needed.
const modules = import.meta.glob('../assets/screenshots/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export function shotFor(slug: string): string | null {
  for (const key of Object.keys(modules)) {
    const name = key.slice(key.lastIndexOf('/') + 1)
    const base = name.slice(0, name.lastIndexOf('.'))
    if (base === slug) return modules[key]
  }
  return null
}
