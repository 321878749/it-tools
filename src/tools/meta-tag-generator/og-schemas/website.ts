import type { OGSchemaType } from '../OGSchemaType.type';

const typeOptions = [
  { label: '网站', value: 'website' },
  { label: '文章', value: 'article' },
  { label: '书', value: 'book' },
  { label: '文件', value: 'profile' },
  {
    type: 'group',
    label: '音乐',
    key: 'Music',
    children: [
      { label: '歌', value: 'music.song' },
      { label: '音乐专辑', value: 'music.album' },
      { label: '播放列表', value: 'music.playlist' },
      { label: '电台', value: 'music.radio_station' },
    ],
  },
  {
    type: 'group',
    label: '视频',
    key: 'Video',
    children: [
      { label: '电影', value: 'video.movie' },
      { label: '剧情', value: 'video.episode' },
      { label: '电视节目', value: 'video.tv_show' },
      { label: '其他视频', value: 'video.other' },
    ],
  },
];

export const website: OGSchemaType = {
  name: '一般信息',
  elements: [
    {
      type: 'select',
      label: '页面类型',
      placeholder: '选择您的网站类型...',
      key: 'type',
      options: typeOptions,
    },
    { type: 'input', label: '标题', placeholder: '输入您网站的标题...', key: 'title' },
    {
      type: 'input',
      label: '描述',
      placeholder: '请输入和您网站的描述...',
      key: 'description',
    },
    {
      type: 'input',
      label: '页面地址',
      placeholder: '请输入您网站的页面地址...',
      key: 'url',
    },
  ],
};
