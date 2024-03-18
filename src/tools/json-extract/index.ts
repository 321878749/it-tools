import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.json-extract.title'),
  path: '/json-extract',
  description: translate('tools.json-extract.description'),
  keywords: ['json', 'viewer', 'format'],
  component: () => import('./json-extract.vue'),
  icon: Braces,
  redirectFrom: ['/json-extract'],
});
