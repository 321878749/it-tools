<script setup lang="ts">
import {
  camelCase,
  capitalCase,
  constantCase,
  headerCase,
  paramCase,
  pathCase,
  snakeCase,
} from 'change-case';
import InputCopyable from '../../components/InputCopyable.vue';

const baseConfig = {
  stripRegexp: /[^A-Za-zÀ-ÖØ-öø-ÿ]+/gi,
};

const input = ref('lorem ipsum dolor sit amet');

const formats = computed(() => [
  {
    label: '小写:',
    value: input.value.toLocaleLowerCase(),
  },
  {
    label: '大写:',
    value: input.value.toLocaleUpperCase(),
  },
  {
    label: '驼峰:',
    value: camelCase(input.value, baseConfig),
  },
  {
    label: '开头字母大写:',
    value: capitalCase(input.value, baseConfig),
  },
  {
    label: '常量大写:',
    value: constantCase(input.value, baseConfig),
  },
  {
    label: '标题大小写:',
    value: headerCase(input.value, baseConfig),
  },
  {
    label: '连接符连接:',
    value: paramCase(input.value, baseConfig),
  },
  {
    label: '斜杠连接:',
    value: pathCase(input.value, baseConfig),
  },
  {
    label: '下划线连接:',
    value: snakeCase(input.value, baseConfig),
  },
]);

const inputLabelAlignmentConfig = {
  labelPosition: 'left',
  labelWidth: '120px',
  labelAlign: 'right',
};
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="input"
      label="您的字符串:"
      placeholder="您的字符串..."
      raw-text
      v-bind="inputLabelAlignmentConfig"
    />

    <div my-16px divider />

    <InputCopyable
      v-for="format in formats"
      :key="format.label"
      :value="format.value"
      :label="format.label"
      v-bind="inputLabelAlignmentConfig"
      mb-1
    />
  </c-card>
</template>
