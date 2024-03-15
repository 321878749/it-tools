import { Database } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.mybatis-convert.title'),
  path: '/mybatis-convert',
  description: translate('tools.mybatis.description'),
  keywords: ['mybatis', 'viewer', 'prettify', 'format'],
  component: () => import('./mybatis-convert.vue'),
  icon: Database,
  redirectFrom: ['/mybatis-convert'],
});
