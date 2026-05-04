import {sanityFetch} from '@/lib/sanity/client'
import {eventBySlugQuery, eventListQuery} from '@/lib/sanity/queries'
import type {EventItem} from '@/lib/sanity/types'

export const revalidate = 120

export async function generateStaticParams() {
  const events = await sanityFetch<EventItem[]>(eventListQuery, undefined, [])
  return events.map((item) => ({slug: item.slug}))
}

export default async function EventDetailPage({
  params,
}: {
  params: {slug: string}
}) {
  const event = await sanityFetch<EventItem | null>(
    eventBySlugQuery,
    {slug: params.slug},
    null
  )
  if (!event) {
    return <main className="mx-auto max-w-4xl px-6 py-16">Not found</main>
  }
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">{event.title}</h1>
      <p className="mt-4 text-lg text-[#6b6b6b]">{event.excerpt}</p>
    </main>
  )
}
