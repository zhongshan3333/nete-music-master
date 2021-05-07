<template>
  <div
    class="carousel-container"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="carousel-wrapper">
      <slot></slot>
    </div>
    <div @click="prev" class="carousel-prev">
      <i class="material-icons">navigate_before</i>
    </div>
    <div @click="next" class="carousel-next">
      <i class="material-icons">navigate_next</i>
    </div>
    <div class="carousel-index">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        :class="{ 'carousel-index__bg': activeIndex === idx }"
        @mouseover="activeIndex = idx"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NeteCarousel',
  props: {
    itemWidth: {
      type: String,
      default: '540px',
    },
    itemHeight: {
      type: String,
      default: '200px',
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },
  provide: function() {
    return {
      itemWidth: this.itemWidth,
      itemHeight: this.itemHeight,
      activeIndex: this.activeIndex,
    };
  },
  data() {
    return {
      items: [],
      activeIndex: this.defaultIndex,
      timer: null,
      interval: 5000,
    };
  },
  methods: {
    updatePositions() {
      this.items.forEach((child) => child.updatePosition());
    },
    calcItems() {
      this.items = this.$children.filter(
        (child) => child.$options.name === 'NeteCarouselItem'
      );
    },
    prev() {
      this.activeIndex = this.decreaseIndex(
        this.activeIndex,
        this.items.length
      );
      this.updatePositions();
    },
    next() {
      this.activeIndex = this.increaseIndex(
        this.activeIndex,
        this.items.length
      );
      this.updatePositions();
    },
    increaseIndex(index, max) {
      return (index + 1) % max;
    },
    decreaseIndex(index, max) {
      const sw = index % max;
      const rever = (max - sw) % max;
      return (max - rever - 1) % max;
    },
    startTimer() {
      if (this.timer) return;
      this.timer = setInterval(() => {
        this.activeIndex = this.increaseIndex(
          this.activeIndex,
          this.items.length
        );
      }, this.interval);
    },
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleMouseEnter() {
      this.pauseTimer();
    },
    handleMouseLeave() {
      this.startTimer();
    },
  },
  watch: {
    items(val) {
      if (val.length > 0) this.updatePositions();
    },
    activeIndex(val, oldval) {
      this.updatePositions();
    },
  },
  mounted() {
    this.calcItems();
    this.updatePositions();
  },
};
</script>
<style lang="scss" scoped>
.carousel-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.carousel-prev,
.carousel-next {
  position: absolute;
  z-index: 5;
  display: none;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  & i {
    font-size: 36px;
  }
}

.carousel-prev {
  left: 0;
}

.carousel-next {
  right: 0;
}

.carousel-container:hover .carousel-prev,
.carousel-container:hover .carousel-next {
  display: block;
}

.carousel-index {
  position: absolute;
  bottom: 0;
  display: flex;
  & > div {
    margin: 0 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #e6e6e6;
  }
}

.carousel-index__bg {
  background-color: #d13c37 !important;
}
</style>
