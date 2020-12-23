import getAllPostPreviews from '@/getAllPostPreviews'

export async function getStaticProps() {
  return {
    props: {
      // remove non-serializable fields
      //   -- "excerpt" since it's a component
      //   -- "date" since it's a Date
      posts: getAllPostPreviews().map(({ excerpt, date, ...props }) => ({
        ...props,
      })),
    },
  }
}
