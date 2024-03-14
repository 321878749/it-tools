<script setup lang="ts">
import JSON5 from 'json5';
import type { UseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const defaultValue = '{\n\t"hello": [\n\t\t"world"\n\t]\n}';
const transformer = (value: string) => withDefaultOnError(() => JSON.stringify(JSON5.parse(value), null, 0), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || JSON5.parse(v),
    message: '提供的 JSON 无效.',
  },
];
</script>

<template>
  <format-transformer
    input-label="原始JSON"
    :input-default="defaultValue"
    input-placeholder="将原始 JSON 粘贴到此处..."
    output-label="JSON 的缩小版本"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
