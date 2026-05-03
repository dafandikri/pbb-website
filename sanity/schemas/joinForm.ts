export const joinForm = {
  name: 'joinForm',
  title: 'Join Form',
  type: 'document',
  fields: [
    {
      name: 'fieldsConfig',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Fields Config',
    },
    {name: 'thankYouMessage', type: 'text', title: 'Thank You Message'},
  ],
}
