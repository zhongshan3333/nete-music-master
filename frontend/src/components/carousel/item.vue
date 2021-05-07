<template>
  <div
    ref="carouselItemRef"
    class="carousel-item"
    :style="{ width: itemWidth, height: itemHeight }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NeteCarouselItem',
  inject: ['itemWidth', 'itemHeight', 'activeIndex'],
  methods: {
    updatePosition() {
      const [direct, distance] = this.calcTransform();
      switch (direct) {
        case 0:
          this.setTranslate(0, 1, 5);
          break;
        case -1:
          this.setTranslate(-distance, 0.83, 2);
          break;
        case 1:
          this.setTranslate(distance, 0.83, 2);
          break;
        default:
          this.setTranslate(0, 0.83, 1);
          break;
      }
    },
    calcTransform() {
      const activeIndex = this.$parent.activeIndex;
      const index = this.$parent.items.indexOf(this);
      const length = this.$parent.items.length;
      const selfWidth = this.$refs.carouselItemRef.offsetWidth;
      const containerWidth = this.$parent.$el.offsetWidth;

      const direct = this.calcDirection(activeIndex, index, length);
      const distance = Math.round(containerWidth / 2 - selfWidth / 2);
      return [direct, distance];
    },
    calcDirection(activeIndex, index, length) {
      if (activeIndex === index) {
        return 0;
      } else if (this.decreaseIndex(activeIndex, length) === index) {
        return -1;
      } else if (this.increaseIndex(activeIndex, length) === index) {
        return 1;
      }
      return 2;
    },
    setTranslate(distance, scale, zIndex) {
      this.$refs.carouselItemRef.style.transform = `translateX(${distance}px) scale(${scale})`;
      this.$refs.carouselItemRef.style['z-index'] = zIndex;
    },
    increaseIndex(index, max) {
      return (index + 1) % max;
    },
    decreaseIndex(index, max) {
      const sw = index % max;
      const rever = (max - sw) % max;
      return (max - rever - 1) % max;
    },
    
  },
  created() {
    this.$parent && this.$parent.calcItems();
  },
  destroyed() {
    this.$parent && this.$parent.calcItems();
  }
};
</script>

<style lang="scss" scoped>
.carousel-item {
  position: absolute;
  transition: all 0.5s;
  overflow: hidden;
}
</style>
