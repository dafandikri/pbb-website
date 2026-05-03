import {sanityClient} from '@/lib/sanity/client'
import {newsBySlugQuery, newsListQuery} from '@/lib/sanity/queries'
import type {NewsItem} from '@/lib/sanity/types'

export const revalidate = 120

export async function generateStaticParams() {
  const news = await sanityClient.fetch<NewsItem[]>(newsListQuery)
  return news.map((item) => ({slug: item.slug}))
}

export default async function NewsDetailPage({
  params,
}: {
  params: {slug: string}
}) {
  const news = await sanityClient.fetch<NewsItem | null>(newsBySlugQuery, {
    slug: params.slug,
  })
  if (!news) {
    return <main className="mx-auto max-w-4xl px-6 py-16">Not found</main>
  }
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">{news.title}</h1>
      <p className="mt-4 text-lg text-[#6b6b6b]">{news.excerpt}</p>
    </main>
  )
}
