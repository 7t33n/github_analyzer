<template>
  <form
    class="auth-form"
    @submit.prevent="onSubmit"
  >
    <app-button
      title="Login by github"
      default-type="submit"
    />
  </form>
</template>
<script setup lang="ts">
const emits = defineEmits(['submit']);

const onSubmit = (e: Event) => {
  emits('submit', e);
};
</script>
<style scoped lang="scss">
.auth-form {
  @include formWrapper;
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
</style>
