import {sanityFetch} from '@/lib/sanity/client'
import {newsListQuery} from '@/lib/sanity/queries'
import type {NewsItem} from '@/lib/sanity/types'

export const revalidate = 120

export default async function NewsPage() {
  const news = await sanityFetch<NewsItem[]>(newsListQuery, undefined, [])
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">News</h1>
      <ul className="mt-6 space-y-3">
        {news.map((item) => (
          <li key={item._id}>
            <a className="text-lg underline" href={`/news/${item.slug}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
