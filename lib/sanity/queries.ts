import {defineQuery} from 'next-sanity'

export const newsListQuery = defineQuery(`*[_type == "news"]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}`)

export const newsBySlugQuery = defineQuery(`*[_type == "news" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body
}`)

export const eventListQuery = defineQuery(`*[_type == "event"]|order(dateStart desc){
  _id,
  title,
  "slug": slug.current,
  dateStart,
  dateEnd,
  location,
  excerpt
}`)

export const eventBySlugQuery = defineQuery(`*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  dateStart,
  dateEnd,
  location,
  excerpt,
  body
}`)

export const blogListQuery = defineQuery(`*[_type == "blog"]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}`)

export const blogBySlugQuery = defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  author
}`)

export const faqListQuery = defineQuery(`*[_type == "faq"]|order(_createdAt desc){
  _id,
  question,
  answer,
  category
}`)
