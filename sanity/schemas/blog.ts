export const blog = {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'publishedAt', type: 'datetime', title: 'Published At'},
    {name: 'excerpt', type: 'text', title: 'Excerpt'},
    {name: 'body', type: 'array', of: [{type: 'block'}]},
    {name: 'coverImage', type: 'image', title: 'Cover Image'},
    {name: 'tags', type: 'array', of: [{type: 'string'}]},
    {name: 'author', type: 'string', title: 'Author'},
  ],
}
