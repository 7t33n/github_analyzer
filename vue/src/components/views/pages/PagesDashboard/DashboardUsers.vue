<template>
  <a
    v-for="(item, index) in props.list"
    :key="index"
    :href="item.author.html_url"
    target="_blank"
    class="card"
  >
    <img
      :src="item.author.avatar_url"
      :alt="item.author.login"
      class="card__image"
    >
    <div class="card__wrapper">
      <p class="card__login">{{ item.author.login }}</p>
      <p class="card__information">
        commits: {{ item.total }}
      </p>
    </div>
  </a>
</template>
<script setup lang="ts">
const props = defineProps<{
  list: IContributors[]
}>();
</script>
<style scoped lang="scss">
.card {
  border: 1px solid $border-primary;
  border-radius: 4px;
  margin: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  text-decoration: none;
  width: 260px;
  height: calc(64px + 16px);
  color: #fff;

  &:hover {
    box-shadow: $shadow-primary-hover;
    background-color: $background-primary;
  }

  &__image {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  &__wrapper {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
  }

  &__information {
    font-size: 12px;
  }
}
</style>
