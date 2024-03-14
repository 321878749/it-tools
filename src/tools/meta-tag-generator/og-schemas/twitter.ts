import type { OGSchemaType } from '../OGSchemaType.type';

export const twitter: OGSchemaType = {
  name: '推特',
  elements: [
    {
      type: 'select',
      options: [
        { label: '总结', value: 'summary' },
        { label: '大图摘要', value: 'summary_large_image' },
        { label: '应用', value: 'app' },
        { label: '选手', value: 'player' },
      ],
      label: 'Card 类型',
      placeholder: 'The Twitter card type...',
      key: 'twitter:card',
    },
    {
      type: 'input',
      label: '网站账户',
      placeholder: '网站的 Twitter 帐户的名称（例如：@ittoolsdottech）...',
      key: 'twitter:site',
    },
    {
      type: 'input',
      label: '创建者账户',
      placeholder: '创建者的 Twitter 帐户的名称（例如：@cthmsst）...',
      key: 'twitter:creator',
    },
  ],
};
