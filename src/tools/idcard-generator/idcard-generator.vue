<script setup lang="ts">
import type { RegionModel } from 'v-region';
import { RegionSelects } from 'v-region';
import { ref } from 'vue';

// 随机生成姓名
function generateChineseName(): string {
  const lastNameList: string[] = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩',
    '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶',
    '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭',
    '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史',
    '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安',
    '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平',
    '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明',
  ];

  const firstNameList: string[] = [
    '子璇', '淼', '国栋', '夫子', '瑞堂', '甜', '敏', '尚', '国强', '兴华', '冬雪', '亦凡', '家辉', '志浩',
    '国华', '婷婷', '子涵', '洁', '凯', '梦洁', '婷', '凯', '倩', '欢', '乐', '悦', '晨', '冰冰', '欣欣',
    '文杰', '东', '洋', '雪', '明', '芳', '立', '兰', '青', '华', '成', '洋', '宇', '磊', '涛', '昊', '东',
    '建国', '建华', '亚男', '亚妹', '月明', '月强', '国庆', '建军', '建林', '建军', '玉成', '玉华', '玉环', '庆华',
    '玉环', '家玲', '玉玲', '秋燕', '小玲', '小玲', '迎秋', '冬梅', '冬雪', '冬青', '瑞娥', '甜甜', '甜玉', '梦梅',
    '梦琪', '梦秋', '梦竹', '梦玉', '梦洋', '梦雪', '梦月', '梦泽', '梦竹', '梦梅', '梦琪', '梦秋', '梦竹', '梦玉',
  ];

  const lastNameIndex = Math.floor(Math.random() * lastNameList.length);
  const firstNameIndex = Math.floor(Math.random() * firstNameList.length);

  const lastName = lastNameList[lastNameIndex];
  const firstName = firstNameList[firstNameIndex];

  return `${lastName}${firstName}`;
}
// 姓名列表
const helpers = ref(
  [
  ],
);

// 地区
const region = ref({
  province: '350000',
  city: '350100',
  area: '350104',
});
const regionCode = ref('350104');
function regionChange(data: RegionModel): void {
  regionCode.value = data.area?.key;
}
// 出生日期单选框
const checkedValueRef = ref<string | null>(null);
checkedValueRef.value = 'random';
const checkedValue = checkedValueRef;
// 时间选择
const timestamp = ref(1183135260000);
const dateFlag = ref(false);
// 年龄
const ageFlag = ref(false);
const startAge = ref(1);
const endAge = ref(10);
// 性别选择框
const checkedSexValueRef = ref<string | null>(null);
checkedSexValueRef.value = '2';
const checkedSexValue = checkedSexValueRef;

function handleChange(e: Event) {
  checkedValueRef.value = (e.target as HTMLInputElement).value;
  checkedValueRef.value === 'date' ? dateFlag.value = true : dateFlag.value = false;
  checkedValueRef.value === 'age' ? ageFlag.value = true : ageFlag.value = false;
}
function sexChange(e: Event) {
  checkedSexValueRef.value = (e.target as HTMLInputElement).value;
}
// 生成数量
const count = ref(10);

function idcardGenertor(e: Event) {
  const coefficientArray: string[] = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']; // 加权因子
  const lastNumberArray: string[] = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; // 校验码
  const address: string = regionCode.value; // 住址
  let birthday: string; // 生日
  const year = new Date().getFullYear();
  const yearNum = Math.floor(Math.random() * (year - 1970 + 1)) + 1970;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 30) + 1;
  birthday = yearNum.toString() + (month < 10 ? `0${month.toString()}` : month.toString()) + (day.toString() < 10 ? `0${day.toString()}` : day.toString());
  if (dateFlag.value && timestamp.value) {
    birthday = timestampToDateString(timestamp.value);
  }
  if (ageFlag.value) {
    const yearNum = Math.floor(Math.random() * (endAge.value - startAge.value + 1)) + (year - endAge.value);
    const month = Math.floor(Math.random() * 12 + 1);
    const day = Math.floor(Math.random() * 30 + 1);
    birthday = yearNum.toString() + (month < 10 ? `0${month.toString()}` : month.toString()) + (day.toString() < 10 ? `0${day.toString()}` : day.toString());
  }
  let sex = Math.floor(Math.random() * 10);
  if (checkedSexValue.value === '0') {
    do {
      sex = Math.floor(Math.random() * 10);
    } while (sex % 2 !== 0); // 保证是偶数
  }
  if (checkedSexValue.value === '1') {
    do {
      sex = Math.floor(Math.random() * 10);
    } while (sex % 2 === 0); // 保证是偶数
  }
  const s: string = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + sex.toString();
  const array: string[] = (address + birthday + s).split('');
  let total: number = 0;
  for (let i = 0; i < array.length; i++) {
    total += Number.parseInt(array[i]) * Number.parseInt(coefficientArray[i]);
  }
  const lastNumber: string = lastNumberArray[Number.parseInt((total % 11).toString())];
  const id_no_String: string = address + birthday + s + lastNumber;
  helpers.value.push({ 身份证号: id_no_String, 姓名: generateChineseName() });
  return id_no_String;
}
function idCardGenertors(e: Event) {
  helpers.value = [];
  for (let i = 0; i < count.value; i++) {
    idcardGenertor(e);
  }
}

function timestampToDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从 0 开始计数的
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}
</script>

<template>
  <c-card>
    <div style="margin-bottom: 15px">
      <n-input-group style="margin-bottom: 15px">
        <n-input-group-label style="flex: 0 0 110px">
          {{ "出生地" }}
        </n-input-group-label>
        <RegionSelects
          v-model="region"
          class="region-select"
          @change="regionChange"
        />
      </n-input-group>
      <n-input-group style="margin-bottom: 15px">
        <n-input-group-label style="flex: 0 0 110px">
          {{ "出生日期" }}
        </n-input-group-label>
        <n-space class="birthday">
          <n-radio
            :checked="checkedValue === 'date'"
            value="date"
            label="指定日期"
            name="birthday"
            @change="handleChange"
          />
          <n-radio
            :checked="checkedValue === 'age'"
            value="age"
            label="指定年龄"
            name="birthday"
            @change="handleChange"
          />
          <n-radio
            :checked="checkedValue === 'random'"
            value="random"
            name="birthday"
            label="随机"
            @change="handleChange"
          />
        </n-space>
      </n-input-group>
      <n-input-group v-if="dateFlag" style="margin-bottom: 15px">
        <n-input-group-label style="flex: 0 0 110px">
          {{ "日期" }}
        </n-input-group-label>
        <n-date-picker v-model:value="timestamp" type="date" style="width:300px;" />
      </n-input-group>
      <n-input-group v-if="ageFlag" style="margin-bottom: 15px">
        <n-input-group-label style="flex: 0 0 110px">
          {{ "年龄" }}
        </n-input-group-label>
        <n-input-number
          v-model:value="startAge"
          :min="1"
          :max="100"
          clearable style="width:130px"
        />
        <div style="margin-left:18px !important;margin-right:18px;">
          -
        </div>
        <n-input-number
          v-model:value="endAge"
          :min="2"
          :max="100"
          clearable style="width:130px" />
      </n-input-group>
      <n-input-group style="margin-bottom: 15px">
        <n-input-group-label style="flex: 0 0 110px">
          {{ "性别" }}
        </n-input-group-label>
        <n-space class="birthday">
          <n-radio
            :checked="checkedSexValue === '1'"
            value="1"
            label="男"
            name="sex"
            @change="sexChange"
          />
          <n-radio
            :checked="checkedSexValue === '0'"
            value="0"
            label="女"
            name="sex"
            @change="sexChange"
          />
          <n-radio
            :checked="checkedSexValue === '2'"
            value="2"
            name="sex"
            label="随机"
            @change="sexChange"
          />
        </n-space>
      </n-input-group>
      <n-input-group style="margin-bottom: 15px">
        <n-input-group-label style="flex: 0 0 110px">
          {{ "数量" }}
        </n-input-group-label>
        <n-input-number
            v-model:value="count"
            :min="1"
            :max="50"
            clearable style="width:300px" />
      </n-input-group>
    </div>
    <div flex justify-center>
      <c-button @click="idCardGenertors">
        生成
      </c-button>
    </div>
  </c-card>
  <c-card>
    <div class="title">
      生成结果
    </div>
    <c-table :data="helpers" />
  </c-card>
</template>

<style lang="less" scoped>
::v-deep(input) {
  font-size: 30px;
  font-family: monospace;
  padding: 5px;
  text-align: center;
}

.cron-string {
  text-align: center;
  font-size: 22px;
  opacity: 0.8;
  margin: 5px 0 15px;
}

pre {
  overflow: auto;
  padding: 10px 0;
}

.region-select {
  margin-left : 20px !important;
}
.birthday {
  margin-left : 20px !important;
  margin-top : 8px;
}
.title {
  text-align: center;
  width: auto;
  font-size: 16px;
  font-weight: bold;
}
</style>
