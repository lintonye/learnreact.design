import { Link } from './design-system'
import * as SEOData from '@/../next-seo.json'
import { FiTwitter } from 'react-icons/fi'

export function DiscussionTwitter({
  pageUrl,
  title,
}: {
  pageUrl: string
  title: string
}) {
  const fullUrl = SEOData.siteUrl + pageUrl
  const authorTwitterId = 'lintonye'
  const author = 'Linton Ye'
  return (
    <div className="flex space-x-2 items-center">
      <FiTwitter />
      <Link
        href={`https://twitter.com/share?url=${fullUrl}&text=%E2%80%9C${encodeURI(
          title,
        )}%E2%80%9D%2C%20an%20article%20from%20${encodeURI(
          author,
        )}.%20&via=${authorTwitterId}`}
        target="_blank"
      >
        Discuss on Twitter
      </Link>
      <Link
        href={`https://twitter.com/search?q=${encodeURI(
          fullUrl,
        )}&src=typed_query`}
        target="_blank"
      >
        Current discussions
      </Link>
    </div>
  )
}
