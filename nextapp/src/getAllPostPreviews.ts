type ImportedMdx = {
  categorySlug: string
  slug: string
  module: any
}

// user defined type guard: https://bigfont.ca/filter-undefined-and-null-values-from-an-array-while-still-satisfying-typescripts-strict-mode/
const isDefined = <T>(input: T | undefined | null): input is T => {
  return typeof input !== 'undefined' && input !== null
}

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r
    .keys()
    .map((fileName) => {
      const pattern = /.*\/([\w-\d]+)\/([\w-\d]+)\/.+\.mdx$/
      const match = fileName.match(pattern)
      const module = r(fileName)

      return match
        ? {
            categorySlug: match[1],
            slug: match[2],
            ...module.meta,
            excerpt: module.default, // This is a component!
          }
        : null
    })
    .filter(isDefined)
}

function dateSortDesc(a: Date, b: Date) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export default function getAllPostPreviews() {
  return importAll(
    require.context('./pages/?preview', true, /\.mdx$/),
  ).sort((a, b) => dateSortDesc(a.date, b.date))
}
