import getAllPostPreviews from '@/getAllPostPreviews'

export async function getStaticProps() {
  return {
    props: {
      // remove non-serializable field "excerpt" since it's a component
      posts: getAllPostPreviews().map(({ excerpt, ...props }) => ({
        ...props,
      })),
    },
  }
}
