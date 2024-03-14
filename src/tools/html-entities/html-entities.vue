<script setup lang="ts">
import { escape, unescape } from 'lodash';

import { useCopy } from '@/composable/copy';

const escapeInput = ref('<title>IT Tool</title>');
const escapeOutput = computed(() => escape(escapeInput.value));
const { copy: copyEscaped } = useCopy({ source: escapeOutput });

const unescapeInput = ref('&lt;title&gt;IT Tool&lt;/title&gt;');
const unescapeOutput = computed(() => unescape(unescapeInput.value));
const { copy: copyUnescaped } = useCopy({ source: unescapeOutput });
</script>

<template>
  <c-card title="转义 html 实体">
    <n-form-item label="你的字符串 :">
      <c-input-text
        v-model:value="escapeInput"
        multiline
        placeholder="要转义的字符串"
        rows="3"
        autosize
        raw-text
      />
    </n-form-item>

    <n-form-item label="你的转义字符串 :">
      <c-input-text
        multiline
        readonly
        placeholder="你的转义字符串"
        :value="escapeOutput"
        rows="3"
        autosize
      />
    </n-form-item>

    <div flex justify-center>
      <c-button @click="copyEscaped()">
        复制
      </c-button>
    </div>
  </c-card>
  <c-card title="取消转义 html 实体">
    <n-form-item label=" 您的转义字符串 :">
      <c-input-text
        v-model:value="unescapeInput"
        multiline
        placeholder="需要转成未转义的字符串"
        rows="3"
        autosize
        raw-text
      />
    </n-form-item>

    <n-form-item label="您未转义的字符串 :">
      <c-input-text
        :value="unescapeOutput"
        multiline
        readonly
        placeholder="您未转义的字符串"
        rows="3"
        autosize
      />
    </n-form-item>

    <div flex justify-center>
      <c-button @click="copyUnescaped()">
        复制
      </c-button>
    </div>
  </c-card>
</template>
