export type NewsItem = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  body?: unknown
}

export type EventItem = {
  _id: string
  title: string
  slug: string
  dateStart: string
  dateEnd?: string
  location?: string
  excerpt?: string
  body?: unknown
}

export type BlogItem = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  body?: unknown
  author?: string
}

export type FaqItem = {
  _id: string
  question: string
  answer: string
  category?: string
}
