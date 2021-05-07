<template>
  <div
    class="progressbar"
    ref="progressbar"
    @click="progressClick"
    @mousedown="dragMouseDown"
  >
    <div class="progress-inner">
      <div :class="{ progress: true }" :style="progressCSS" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progress-btn-wrap">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nete-progress',
  props: {
    progressPercent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  computed: {
    progressCSS: {
      get: function() {
        return {
          width: `${this.progressPercent}%`,
        };
      },
    },
  },
  watch: {
    progressPercent: function(val) {
      this.$refs.progress.style.width = `${val}%`;
    },
  },
  methods: {
    progressClick(e) {
      const rect = this.$refs.progressbar.getBoundingClientRect();
      const clientWidth = this.$refs.progressbar.clientWidth;
      const offsetWidth = Math.max(
        0,
        Math.min(e.pageX - rect.left, clientWidth)
      );

      const offsetPercent = (offsetWidth / clientWidth) * 100;
      this.setOffset(offsetPercent);
    },
    setOffset(offsetPercent) {
      this.$refs.progress.style.width = `${offsetPercent}%`;
      this.triggerParent(offsetPercent);
    },
    dragMouseDown(e) {
      document.onmouseup = this.closeDragElement;
      document.onmousemove = this.progressClick.bind(this);
    },
    closeDragElement() {
      console.log('clean');
      document.onmouseup = null;
      document.onmousemove = null;
    },
    triggerParent(percent) {
      //   if (document.onmouseup !== null) return;
      if (this.timeout !== null) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$emit('percentChange', percent);
        console.log('emit percent change: ', percent);
      }, 400);
    },
  },
};
</script>

<style lang="scss" scoped>
.progressbar {
  height: 2px;
  width: 100%;
  cursor: pointer;
  background-color: #FAFAFA;
  position: relative;
  //   border: 1px solid red;
  & .progress-inner {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }
  & .progress {
    height: 100%;
    background-color: #d13c37;
  }
}

.progress-btn-wrapper {
  position: relative;
}

.progress-btn {
  position: absolute;
  top: -5px;
  left: -4px;
  background-color: #d13c37;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  // transform: translateX(-7px);
}
</style>
