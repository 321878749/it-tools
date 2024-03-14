<script setup lang="ts">
import { useTimestamp } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { useQRCode } from '../qr-code-generator/useQRCode';
import { base32toHex, buildKeyUri, generateSecret, generateTOTP, getCounterFromTime } from './otp.service';
import TokenDisplay from './token-display.vue';
import { useStyleStore } from '@/stores/style.store';
import InputCopyable from '@/components/InputCopyable.vue';
import { computedRefreshable } from '@/composable/computedRefreshable';

const now = useTimestamp();
const interval = computed(() => (now.value / 1000) % 30);
const theme = useThemeVars();
const styleStore = useStyleStore();

const secret = ref(generateSecret());

function refreshSecret() {
  secret.value = generateSecret();
}

const [tokens] = computedRefreshable(
  () => ({
    previous: generateTOTP({ key: secret.value, now: now.value - 30000 }),
    current: generateTOTP({ key: secret.value, now: now.value }),
    next: generateTOTP({ key: secret.value, now: now.value + 30000 }),
  }),
  { throttle: 500 },
);

const keyUri = computed(() => buildKeyUri({ secret: secret.value }));

const { qrcode } = useQRCode({
  text: keyUri,
  color: {
    background: computed(() => (styleStore.isDarkTheme ? '#ffffff' : '#00000000')),
    foreground: '#000000',
  },
  options: { width: 210 },
});

const secretValidationRules = [
  {
    message: 'Secret should be a base32 string',
    validator: (value: string) => value.toUpperCase().match(/^[A-Z234567]+$/),
  },
  {
    message: 'Please set a secret',
    validator: (value: string) => value !== '',
  },
];
</script>

<template>
  <div style="max-width: 350px">
    <c-input-text
      v-model:value="secret"
      label="密钥"
      placeholder="请设置一个密钥..."
      mb-5
      :validation-rules="secretValidationRules"
    >
      <template #suffix>
        <c-tooltip tooltip="生成一个新的随机密钥">
          <c-button circle variant="text" size="small" @click="refreshSecret">
            <icon-mdi-refresh />
          </c-button>
        </c-tooltip>
      </template>
    </c-input-text>

    <div>
      <TokenDisplay :tokens="tokens" />

      <n-progress :percentage="(100 * interval) / 30" :color="theme.primaryColor" :show-indicator="false" />
      <div style="text-align: center">
        下一个在 {{ String(Math.floor(30 - interval)).padStart(2, '0') }}s后
      </div>
    </div>
    <div mt-4 flex flex-col items-center justify-center gap-3>
      <n-image :src="qrcode" />
      <c-button :href="keyUri" target="_blank">
        在新选项卡中打开密钥
      </c-button>
    </div>
  </div>
  <div style="max-width: 350px">
    <InputCopyable
      label="十六进制中的密钥"
      :value="base32toHex(secret)"
      readonly
      placeholder="十六进制中的密钥将显示在这里"
      mb-5
    />

    <InputCopyable
      label="时间戳"
      :value="Math.floor(now / 1000).toString()"
      readonly
      mb-5
      placeholder="时间戳显示在这里"
    />

    <p>迭代</p>

    <InputCopyable
      :value="String(getCounterFromTime({ now, timeStep: 30 }))"
      readonly
      label="计数:"
      label-position="left"
      label-width="90px"
      label-align="right"
      placeholder="迭代计数将显示在这里"
    />

    <InputCopyable
      :value="getCounterFromTime({ now, timeStep: 30 }).toString(16).padStart(16, '0')"
      readonly
      placeholder="此处将显示十六进制的迭代计数"
      label-position="left"
      label-width="90px"
      label-align="right"
      label="填充16进制:"
    />
  </div>
</template>

<style lang="less" scoped>
.n-progress {
  margin-top: 10px;
  ::v-deep(.n-progress-graph-line-fill) {
    transition-duration: 0.05s !important;
  }
}

.token {
  text-align: center;
  &.token-current {
    font-size: 20px;
  }
}
</style>
