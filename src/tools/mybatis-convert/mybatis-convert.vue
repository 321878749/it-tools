<script setup lang="ts">
import { ref } from 'vue';
import { type FormatOptionsWithLanguage, format as formatSQL } from 'sql-formatter';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { withDefaultOnError } from '@/utils/defaults';

const inputElement = ref<HTMLElement>();
const rawLog = ref('');
function transLog(rawLog): string {
  const textVa: string = rawLog.value;

  // 获取带问号的 SQL 语句
  const statementStartIndex: number = textVa.indexOf('Preparing: ');
  let statementEndIndex: number = textVa.length - 1;
  for (let i: number = statementStartIndex; i < textVa.length; i++) {
    if (textVa[i] === '\n') {
      statementEndIndex = i;
      break;
    }
  }
  let statementStr = textVa.substring(statementStartIndex + 'Preparing: '.length, statementEndIndex);

  // 获取参数
  const parametersStartIndex: number = textVa.indexOf('Parameters: ');
  let parametersEndIndex: number = textVa.length;
  for (let i: number = parametersStartIndex; i < textVa.length; i++) {
    if (textVa[i] === '\n') {
      parametersEndIndex = i;
      break;
    }
  }
  const parametersStr: string = textVa.substring(parametersStartIndex + 'Parameters: '.length, parametersEndIndex);

  // 参数列表
  const parametersStrArr: string[] = parametersStr.split(',');

  for (let i: number = 0; i < parametersStrArr.length; i++) {
    let tempStr: string = parametersStrArr[i].substring(0, parametersStrArr[i].indexOf('('));
    // 不含"("是 null
    if (tempStr === '') {
      tempStr = 'null';
    }
    // 如果数据中带括号需要判断参数类型
    const typeStr: string = parametersStrArr[i].substring(parametersStrArr[i].indexOf('(') + 1, parametersStrArr[i].indexOf(')'));
    if (typeStr === 'String' || typeStr === 'Timestamp') {
      statementStr = statementStr.replace('?', `'${tempStr.trim()}'`);
    }
    else {
      statementStr = statementStr.replace('?', tempStr.trim());
    }
  }
  return statementStr;
}
const config = reactive<FormatOptionsWithLanguage>({
  keywordCase: 'upper',
  useTabs: false,
  language: 'sql',
  indentStyle: 'standard',
  tabulateAlias: true,
});

const rawSQL = ref('select field1,field2,field3 from my_table where my_condition;');
const cleanSql = computed(() => withDefaultOnError(() => formatSQL(transLog(rawLog), config), ''));
</script>

<template>
  <n-form-item
    label="mybatis log"
  >
    <c-input-text
      ref="inputElement"
      v-model:value="rawLog"
      placeholder="将mabatys log 粘贴到此处..."
      rows="20"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </n-form-item>
  <n-form-item label="格式化后的sql">
    <TextareaCopyable :value="cleanSql" language="sql" :follow-height-of="inputElement" />
  </n-form-item>
</template>

<style lang="less" scoped>
.result-card {
  position: relative;
  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
