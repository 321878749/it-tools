import type { OGSchemaType } from '../OGSchemaType.type';

export const image: OGSchemaType = {
  name: '图像',
  elements: [
    {
      type: 'input',
      label: '图像地址',
      placeholder: '您网站的社交图片地址...',
      key: 'image',
    },
    {
      type: 'input',
      label: '图片 alt',
      placeholder: '您网站社交图片的替代文本...',
      key: 'image:alt',
    },
    {
      type: 'input',
      label: '宽度',
      placeholder: '网站社交图片的宽度（以 px 为单位）...',
      key: 'image:width',
    },
    {
      type: 'input',
      label: '高度',
      placeholder: '网站社交图片的高度（以 px 为单位...',
      key: 'image:height',
    },
  ],
};
