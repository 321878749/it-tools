<script setup lang="ts">
import JSON5 from 'json5';
import { get, useStorage } from '@vueuse/core';

import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const inputElement = ref<HTMLElement>();

const rawJson = useStorage('json-prettify:raw-json', '{"hello": "world", "foo": "bar"}');
const fieldName = ref('field');
const cleanJson = computed(() => withDefaultOnError(() => extractFieldValueFromArrayOfObjects(get(rawJson), fieldName.value), ''));

const rawJsonValidation = useValidation({
  source: rawJson,
  rules: [
    {
      validator: v => v === '' || JSON5.parse(v),
      message: '提供的 JSON 不是有效的.',
    },
  ],
});

function extractFieldValueFromArrayOfObjects(rawJson: string, fieldName: string): string {
  const jsonData = JSON.parse(rawJson);

  // 检查 JSON 数据是否为空
  if (!jsonData) {
    return '';
  }
  let jsonDataArr = [];
  if (Array.isArray(jsonData)) {
    jsonDataArr = jsonData;
  }
  else {
    jsonDataArr.push(jsonData);
  }
  // 遍历数组中的每个对象
  var resultStr= '';
  for (const obj of jsonDataArr) {
    // 检查当前对象是否包含指定的字段
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(fieldName)) {
      // 如果字段是一个简单值，则直接返回
      if (typeof obj[fieldName] !== 'object') {
        resultStr += (`${obj[fieldName]}\n`);
        continue;
      }
      // 如果字段是一个对象或数组，则继续递归地调用函数
      resultStr += (`${extractFieldValueFromArrayOfObjects(JSON.stringify([obj[fieldName]]), fieldName).toString()}\n`);
    }
    // 如果字段不存在于当前对象中，则检查是否存在于当前对象的子对象或数组中
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
        const value = extractFieldValueFromArrayOfObjects(JSON.stringify(obj[key]), fieldName);
        if (value !== null) {
          resultStr += (`${value}\n`);
        }
      }
    }
  }
  // 如果字段不存在，则返回 null
  return resultStr;
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px" flex justify-center gap-3>
      <n-form-item label="提取字段 :" label-placement="left" label-width="100" :show-feedback="false">
        <n-input v-model:value="fieldName" min="0" max="10" style="width: 100px" />
      </n-form-item>
    </div>
  </div>

  <n-form-item
    label="原始 JSON"
    :feedback="rawJsonValidation.message"
    :validation-status="rawJsonValidation.status"
  >
    <c-input-text
      ref="inputElement"
      v-model:value="rawJson"
      placeholder="将原始 JSON 粘贴到此处..."
      rows="20"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </n-form-item>
  <n-form-item label="提取结果">
    <TextareaCopyable :value="cleanJson" :follow-height-of="inputElement" />
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
