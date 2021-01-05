import { parseISO, compareDesc } from 'date-fns'

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
      const pattern = /.*\/([\w-\d]+)\/.+\.mdx$/
      const match = fileName.match(pattern)
      const module = r(fileName)

      return match
        ? {
            slug: match[1],
            ...module.meta,
            date: parseISO(module.meta.date),
            url: `/posts/${match[1]}`,
            excerpt: module.default, // This is a component!
          }
        : null
    })
    .filter(isDefined)
}

export default function getAllPostPreviews() {
  return importAll(
    require.context('./pages/posts/?preview', true, /\.mdx$/),
  ).sort((a, b) => compareDesc(a.date, b.date))
}
