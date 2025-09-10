export const truncateFileName = (name: string, maxLength = 20): string => {
  const parts = name.split('.')
  if (parts.length < 2) {
    return name.length > maxLength ? name.slice(0, maxLength) + '…' : name
  }

  const ext = parts.pop() as string
  const base = parts.join('.')

  return base.length > maxLength ? base.slice(0, maxLength) + '….' + ext : base + '.' + ext
}

export const formatSize = (size: number): string => {
  const format = (num: number) => (Number.isInteger(num) ? num.toString() : num.toFixed(1))

  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${format(size / 1024)} KB`
  return `${format(size / (1024 * 1024))} MB`
}
