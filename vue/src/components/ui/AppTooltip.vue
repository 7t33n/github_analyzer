<template>
  <div
    ref="rootEl"
    class="app-tooltip"
  >
    <slot />
    <div
      v-show="isActive"
      class="app-tooltip__content"
      v-html="$props.content"
    />
  </div>
</template>
<script>
export default {

  name: 'AppTooltip',

  props: {
    content: {
      type: String,
      default: '',
      required: false,
    },
  },

  data() {
    return {
      isActive: '',
    };
  },

  mounted() {
    if (this.$props.content) {
      this.$refs.rootEl.addEventListener('mouseover', () => this.changeIsActive(true));
      this.$refs.rootEl.addEventListener('mouseleave', () => this.changeIsActive(false));
    }
  },

  methods: {
    changeIsActive(value) {
      this.isActive = value;
    }
  },

}
</script>
<style lang="scss" scoped>
.app-tooltip {
  position: relative;

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;
    padding: 4px;
    transform: translateX(100%);
  }
}
</style>
