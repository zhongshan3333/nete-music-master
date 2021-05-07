<template>
  <div class="panel" v-show="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NeteTabPanel',
  props: {
    name: {
      type: String,
      retuired: true,
    },
  },
  created() {
    this.$parent && this.$parent.updateItems();
  },
  destroyed() {
    this.$parent && this.$parent.updateItems();
  },
  computed: {
    show: function() {
      const idx = this.$parent.items.indexOf(this);
      return idx === this.$parent.currentIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
.panel {
  display: flex;
  width: 100%;
  height: 100%;
  // padding: 8px;
}
</style>
