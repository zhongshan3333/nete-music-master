<template>
  <div class="video-item">
    <div class="avator">
      <img :src="imgUrl" />
      <div class="playcount">{{ playCount | formatCount }}</div>
      <div class="duration">{{ duration | formatSecond }}</div>
      <div class="playaction" @click="$emit('click', true)">
        <span class="material-icons play-filter"> play_arrow </span>
      </div>
    </div>
    <div class="desc">
      <div class="title">{{ title }}</div>
      <div class="author">by {{ author }}</div>
    </div>
  </div>
</template>

<script>
import { realFormatSecond } from '@/utils';
export default {
  name: 'NeteVideoItem',
  props: {
    imgUrl: {
      type: String,
    },
    playCount: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    title: '',
    author: '',
  },
  filters: {
    formatSecond(val) {
      return realFormatSecond(Math.round(val / 1000));
    },
    formatCount(val) {
      if (val > 100000) {
        return `${Math.round(val / 10000)}万`;
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avator {
  width: 100%;
  position: relative;
  & img {
    // width: 327px;
    // height: 182px;
    width: inherit;
    display: block;
    object-fit: cover;
    border-radius: 4px;
  }

  .playcount {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0;
    padding: 4px 8px;
    text-align: right;
    color: white;
    // box-shadow: inset 0 8px 8px 0 rgba(#000, 0.3);
  }

  .duration {
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0;
    padding: 4px 8px;
    text-align: right;
    color: white;
  }

  .playaction {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    display: flex;
    z-index: 1;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    // transition: opacity 0.1s ease;
    &:hover {
      opacity: 1;
    }
  }

  .play-filter {
    position: relative;
    z-index: 1;
    width: 46px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    font-size: 30px;
    color: #d43535;
    &::after {
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      width: 46px;
      height: 46px;
      background-color: rgba(#fff, 0.3);
      backdrop-filter: blur(3px);
      //   -webkit-backdrop-filter: blur(3px);
      z-index: -1;
      border-radius: 50%;
    }
  }
}
.desc {
  margin-top: 8px;
  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .author {
    color: #c4c4c4;
  }
}
</style>
