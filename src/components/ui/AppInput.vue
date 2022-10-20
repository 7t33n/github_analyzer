<template>
  <div
    v-click-outside="onBlur"
    class="app-input"
    @click="onFocus"
  >
    <input
      class="app-input__input"
      :class="`app-input__input--${props.type}`"
      :type="props.defaultType"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="onInput"
    >
    <template v-if="props.type === 'select'">
      <div
        v-show="isFocus"
        class="app-input__select"
      >
        <div
          v-for="(item, index) in props.datalist"
          v-show="includes(item)"
          :key="index"
          class="app-input__option"
          @click.self.stop="onClick(item)"
        >
          {{ item }}
        </div>
      </div>
    </template>
    <template v-if="props.type === 'date'">
      <app-icon
        class="app-input__date"
        name="date"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  placeholder?: string;
  defaultType?: string;
  modelValue?: string;
  type?: string;
  datalist?: string[];
}>();
const emits = defineEmits(['update:modelValue', 'blur', 'input', 'focus']);

const isFocus = ref<boolean>(false);

const onFocus = () => {
  if (isFocus.value) return;
  isFocus.value = true;
  emits('focus');
}
const onBlur = () => {
  if (!isFocus.value) return;
  isFocus.value = false;
  emits('blur');
}
const onInput = (e: { target: HTMLInputElement }) => {
  emits('update:modelValue', e.target.value);
  emits('input', e);
}
const onClick = (value: string) => {
  emits('update:modelValue', value);
  onBlur();
}

const includes = (value: string) => props.modelValue && value.includes(props.modelValue);
</script>
<style scoped lang="scss">
.app-input {
  position: relative;
  display: flex;
  width: 100%;
  height: 34px;

  &__input {
    width: 100%;
    height: 100%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
    background-color: #0d1117;
    border: 1px solid #30363d;
    color: #c9d1d9;
    background-repeat: no-repeat;
    background-position: right 8px center;
    border-radius: 6px;
    box-shadow: 0 0 transparent;
    transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);

    &--date {
      width: calc(100% - 48px);
    }
  }

  &__date {
    display: block;
    width: 36px;
    height: 36px;
    margin-left: auto;
    cursor: pointer;
  }

  &__select {
    position: absolute;
    top: 34px;
    left: 0;
    z-index: 2;
    width: 100%;
    background-color: $background-primary;
    border: 1px solid #30363d;
    border-radius: 8px;
  }

  &__option {
    padding: 6px 0 6px 8px;
    display: flex;
    align-items: center;
    width: 100%;
    color: #fff;
    border-bottom: 1px solid $border-primary;
    cursor: pointer;

    &:hover {
      box-shadow: $shadow-primary-hover;
    }
  }
}
</style>
