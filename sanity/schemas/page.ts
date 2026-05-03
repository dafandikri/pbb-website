export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'sections', type: 'array', of: [{type: 'block'}]},
    {
      name: 'seo',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'SEO Title'},
        {name: 'description', type: 'text', title: 'SEO Description'},
      ],
    },
  ],
}
