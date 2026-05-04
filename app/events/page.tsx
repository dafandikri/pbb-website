import {sanityFetch} from '@/lib/sanity/client'
import {eventListQuery} from '@/lib/sanity/queries'
import type {EventItem} from '@/lib/sanity/types'

export const revalidate = 120

export default async function EventsPage() {
  const events = await sanityFetch<EventItem[]>(eventListQuery, undefined, [])
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Events</h1>
      <ul className="mt-6 space-y-3">
        {events.map((item) => (
          <li key={item._id}>
            <a className="text-lg underline" href={`/events/${item.slug}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
