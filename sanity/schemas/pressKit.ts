export const pressKit = {
  name: 'pressKit',
  title: 'Press Kit',
  type: 'document',
  fields: [
    {name: 'logoFiles', type: 'array', of: [{type: 'file'}]},
    {
      name: 'colorPalette',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Color Palette',
    },
    {name: 'typography', type: 'text', title: 'Typography'},
    {name: 'guidelinesText', type: 'text', title: 'Guidelines'},
  ],
}
