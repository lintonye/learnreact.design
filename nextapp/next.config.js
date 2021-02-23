// const withPlugins = require('next-compose-plugins')
// const withMDX = require('@next/mdx')()
const { createLoader } = require('simple-functional-loader')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// const nextConfig = {
//   reactStrictMode: true,
//   async redirects() {
//     return []
//   },
//   webpack: (config, options) => {
//     config.module.rules.push({
//       test: /\.(svg|png|jpe?g|gif|mp4)$/i,
//       use: [
//         {
//           loader: 'file-loader',
//           options: {
//             publicPath: '/_next',
//             name: 'static/media/[name].[hash].[ext]',
//           },
//         },
//       ],
//     })
//     return config
//   },
// }

// module.exports = withPlugins(
//   [
//     // withBundleAnalyzer({
//     //   pageExtensions: ['ts', 'tsx', 'mdx'],
//     //   experimental: {
//     //     modern: true,
//     //   },
//     // }),
//     withMDX({
//       pageExtensions: ['ts', 'tsx', 'mdx'],
//       remarkPlugins: [
//         require('remark-slug'),
//         require('remark-footnotes'),
//         require('remark-code-titles'),
//       ],
//       rehypePlugins: [require('mdx-prism')],
//     }),
//   ],
//   nextConfig,
// )

module.exports = withBundleAnalyzer({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    modern: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(svg|png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    const mdx = [
      options.defaultLoaders.babel,
      {
        loader: '@mdx-js/loader',
        options: {
          rehypePlugins: [require('mdx-prism')],
          remarkPlugins: [
            require('remark-slug'),
            require('remark-footnotes'),
            require('remark-code-titles'),
            // require('remark-external-links')({
            //   rel: ['noopener', 'noreferrer'],
            // }),
          ],
        },
      },
    ]

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        {
          resourceQuery: /preview/,
          use: [
            ...mdx,
            createLoader(function (src) {
              if (src.includes('<!--more-->')) {
                const [preview] = src.split('<!--more-->')
                return this.callback(null, preview)
              }

              const [preview] = src.split('<!--/excerpt-->')
              return this.callback(null, preview.replace('<!--excerpt-->', ''))
            }),
          ],
        },
        {
          use: [
            ...mdx,
            createLoader(function (src) {
              const content = src.includes('export default ')
                ? src
                : [
                    'import { PostLayout } from "@/components/PostLayout"',
                    'export { getStaticProps } from "@/getStaticProps"',
                    'export default function PostPage(props) { return <PostLayout meta={meta} {...props} />}',
                    src,
                  ].join('\n')

              if (content.includes('<!--more-->')) {
                return this.callback(
                  null,
                  content.split('<!--more-->').join('\n'),
                )
              }

              return this.callback(
                null,
                content.replace(/<!--excerpt-->.*<!--\/excerpt-->/s, ''),
              )
            }),
          ],
        },
      ],
    })

    // if (!options.dev && options.isServer) {
    //   const originalEntry = config.entry

    //   config.entry = async () => {
    //     const entries = { ...(await originalEntry()) }
    //     entries['./scripts/build-rss.js'] = './scripts/build-rss.js'
    //     return entries
    //   }
    // }

    return config
  },
})
