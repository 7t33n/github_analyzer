<template>
  <a
    class="item"
    target="_blank"
    :href="props.html_url"
  >
    <div class="item__title">{{ props.title }}</div>
    <div class="item__wrapper">
      <div class="item__user">Author: {{ props.user.login }}</div>
      <div class="item__date">
        Created at: {{ getDate(props.created_at) }}
        <span v-if="props.type === 'oldest'">({{ getDaysAgo(props.created_at) }} days ago)</span>
      </div>
      <div
        v-if="props.type === 'oldest'"
        class="item__date"
      >Updated: {{ getDaysAgo(props.updated_at) }} days ago</div>
      <div
        v-if="props.type === 'closed'"
        class="item__date"
      >
        Closed at: {{ getDate(props.closed_at) }}
        <span>({{ getDaysAgo(props.closed_at) }} days ago)</span>
      </div>
    </div>
  </a>
</template>
<script setup lang="ts">
/* eslint-disable vue/prop-name-casing */
const props = defineProps<{
  title: string;
  user?: {
    login: string;
  };
  html_url?: string;
  created_at?: string;
  updated_at?: string;
  closed_at?: string;
  type?: string;
}>();

const getDate = (date: string) => new Date(date).toLocaleDateString();
const getDaysAgo = (date: string) => {
  const current = new Date().getTime();
  const timestamp = new Date(date).getTime();
  return Math.round((current - timestamp) / (1000 * 60 * 60 * 24));
}
</script>
<style scoped lang="scss">
.item {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  text-decoration: none;
  height: 64px;
  border: 1px solid $border-primary;
  padding: 0 12px;

  &:hover {
    box-shadow: $shadow-primary-hover;
    background-color: $background-primary;
  }

  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__wrapper {
    width: 100%;
    display: flex;
  }

  &__user, &__date {
    @include typography($t_sm, $w_normal, $white);
    margin-right: 16px;
  }
}
</style>
