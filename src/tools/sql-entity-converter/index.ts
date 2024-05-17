import { Database } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.sql-entity-converter.title'),
  path: '/sql-entity-converter',
  description: translate('tools.mybatis.description'),
  keywords: ['mybatis', 'viewer', 'prettify', 'format'],
  component: () => import('./sql-entity-converter.vue'),
  icon: Database,
  redirectFrom: ['/sql-entity-converter'],
});
