const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')()

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return []
  },
}

module.exports = withPlugins(
  [
    withMDX({
      pageExtensions: ['ts', 'tsx', 'mdx'],
      remarkPlugins: [
        require('remark-slug'),
        require('remark-footnotes'),
        require('remark-code-titles'),
        require('remark-images'),
      ],
      rehypePlugins: [require('mdx-prism')],
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
        return config
      },
    }),
  ],
  nextConfig,
)
