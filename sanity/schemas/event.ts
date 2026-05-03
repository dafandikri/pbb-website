export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'dateStart', type: 'datetime', title: 'Start Date'},
    {name: 'dateEnd', type: 'datetime', title: 'End Date'},
    {name: 'location', type: 'string', title: 'Location'},
    {name: 'excerpt', type: 'text', title: 'Excerpt'},
    {name: 'body', type: 'array', of: [{type: 'block'}]},
    {name: 'coverImage', type: 'image', title: 'Cover Image'},
  ],
}
