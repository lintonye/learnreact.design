import { Link } from './design-system'
import * as SEOData from '@/../next-seo.json'
import { FiTwitter } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function DiscussionTwitter({
  pageUrl,
  title,
  large = false,
}: {
  pageUrl: string
  title: string
  large?: boolean
}) {
  const fullUrl = SEOData.siteUrl + pageUrl
  const authorTwitterId = 'lintonye'
  const author = 'Linton Ye'
  const [mode, setMode] = useState('default')
  return (
    <div>
      <Link
        href={`https://twitter.com/share?url=${fullUrl}&text=%E2%80%9C${encodeURI(
          title,
        )}%E2%80%9D%2C%20an%20article%20from%20${encodeURI(
          author,
        )}.%20&via=${authorTwitterId}`}
        target="_blank"
        rel="noopener"
      >
        <motion.div
          className={`flex ${large ? 'space-x-4' : 'space-x-2'} items-center`}
          onHoverStart={() => setMode('hovered')}
          onHoverEnd={() => setMode('default')}
          animate={mode}
        >
          <motion.div
            variants={{ default: { rotate: 0 }, hovered: { rotate: 10 } }}
          >
            <FiTwitter
              {...(large
                ? { size: 40, strokeWidth: 1, className: 'text-blue-500' }
                : {})}
            />
          </motion.div>
          <div>Discuss on Twitter</div>
        </motion.div>
      </Link>
      {/* <Link
        href={`https://twitter.com/search?q=${encodeURI(
          fullUrl,
        )}&src=typed_query`}
        target="_blank"
      >
        Current discussions
      </Link> */}
    </div>
  )
}
