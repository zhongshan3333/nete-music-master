<template>
  <div class="tabs">
    <div class="nav">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        @click="currentIndex = idx"
        :class="{ 'is-active': idx === currentIndex }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="panel">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NeteTabs',
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      items: [],
      currentIndex: this.activeIndex,
    };
  },
  methods: {
    updateItems() {
      const items = this.$children.filter(
        (child) => child.$options.name === 'NeteTabPanel'
      );
      items.forEach((item, idx) => this.$set(this.items, idx, item));
    },
  },
  mounted() {
    this.updateItems();
  },
};
</script>

<style lang="scss" scoped>
.is-active {
  color: #d13c37;
  border-bottom: 2px solid #d13c37;
}

.tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
  border-bottom: 1px solid #f3f3f3;
  font-size: 14px;
  & > div {
    cursor: pointer;
    padding: 4px;
    margin: 0 8px;
  }

  & > div:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }
}
</style>
