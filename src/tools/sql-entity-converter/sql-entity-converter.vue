<script setup lang="ts">
import { ref } from 'vue';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { startGen } from './sql-java.js';
import { useStyleStore } from '@/stores/style.store';

const inputElement = ref<HTMLElement>();
const styleStore = useStyleStore();
const rawLog = ref('');
const author = ref('');
const packagePath = ref('');
const property = ref(''); 
const cleanSql = computed(() => startGen(rawLog.value,property.value,packagePath.value,author.value));
</script>

<template>

  <div style="flex: 0 0 100%">
    <div style="width: 600px" :class="{ 'flex-col': styleStore.isSmallScreen }" mx-auto mb-5 flex gap-2>
      <c-select
        v-model:value="property"
        placeholder="请选择注释生成方式"
        style="width:600px"
        label="属性注释"
        :options="[
          { label: '文本', value: 'text' },
          { label: 'swagger', value: 'swagger' },
        ]"
      />
      <c-input-text
        v-model:value="packagePath"
        placeholder="请输入包路径"
        label="包路径"
      />
      <c-input-text
        v-model:value="author"
        placeholder="请输入作者"
        label="作者"
      />
    </div>
  </div>
  <n-form-item
    label="MySql"
  >
    <c-input-text
      ref="inputElement"
      v-model:value="rawLog"
      placeholder="将SQL粘贴到此处..."
      rows="20"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </n-form-item>
  <n-form-item label="实体类">
    <TextareaCopyable :value="cleanSql" :follow-height-of="inputElement" />
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
