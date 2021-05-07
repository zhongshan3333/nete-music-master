<template>
  <transition name="loading">
    <div
      class="loading-mask"
      v-show="visible"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NeteLoading',
  data() {
    return {
      visible: true,
      text: null,
      background: null,
      spinner: null,
    };
  },
  methods: {
    setText(text) {
      this.text = text;
    },
    setBackground(color) {
      this.background = color;
    }
  },
};
</script>

<style lang="scss" scoped>
.loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 100%;
  text-align: center;
  position: absolute;

  .loading-text {
    color: #d13c37;
    margin: 3px 0;
    font-size: 14px;
  }

  .circular {
    height: 60px;
    width: 60px;
    animation: loading-rotate 2s linear infinite;
  }

  .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #d13c37;
    stroke-linecap: round;
  }

  i {
    color: #d13c37;
  }
}

.loading-fade-enter,
.loading-fade-leave {
  opacity: 0;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
