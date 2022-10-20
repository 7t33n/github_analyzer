<template>
  <section class="auth">
    <img
      class="auth__logo"
      src="@/assets/img/logo.jfif"
      :alt="i18n.appName"
    >
    <h1 class="auth__title">
      {{ i18n.authTitle }}
    </h1>
    <auth-form @submit="onSubmit" />
  </section>
</template>
<script setup lang="ts">
import AuthForm from '@/components/views/pages/PagesAuth/AuthForm.vue';

import i18n from "@/mocks/i18n";
import {GITHUB_LOGIN} from "@/constants/url";

const onSubmit = () => {
  window.open(GITHUB_LOGIN, '_self');
}
</script>
<style scoped lang="scss">
.auth {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    @include typography($t_lg, $w_bold, $white);
  }

  &__logo {
    width: 128px;
    height: 128px;
  }
}
</style>
