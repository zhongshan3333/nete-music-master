<template>
  <div class="personalize-mv">
    <h3 style="padding: 0 8px">推荐MV</h3>
    <div class="card-container">
      <div class="card-item" v-for="(mv, idx) in mvlists" :key="idx">
        <div
          class="card-avator"
          @mouseover="copywriteOver(idx)"
          @mouseleave="mouseLeave"
          @click="$router.push({ name: 'MVDetail', params: { id: mv.id } })"
        >
          <img :src="mv.picUrl" />

          <transition name="copywriter">
            <span v-if="!(copywriterShow && hoverIndex === idx)">{{
              mv.playCount > 100000
                ? Math.round(mv.playCount / 10000)
                : mv.playCount
            }}</span>
            <div class="copywriter" v-if="copywriterShow && hoverIndex === idx">
              {{ mv.copywriter }}
            </div>
          </transition>
        </div>
        <div class="card-content">
          <div class="name">{{ mv.name }}</div>
          <div class="author">
            {{ mv.artists.map((v) => v.name).join(' / ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMV } from '@/api';
export default {
  name: 'nete-mv',
  data() {
    return {
      mvlists: [],
      copywriterShow: false,
      hoverIndex: -1,
      timeout: null,
    };
  },
  methods: {
    copywriteOver(idx) {
      if (this.timeout !== null) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.hoverIndex = idx;
        this.copywriterShow = true;
      }, 400);
    },
    mouseLeave() {
      setTimeout(() => {
        this.hoverIndex = -1;
        this.copywriterShow = false;
      }, 400);
    },
  },
  async created() {
    const { result } = await getMV();
    this.mvlists = result;
    this.$emit('loaded', true);
  },
};
</script>

<style lang="scss" scoped>
.personalize-mv {
  width: 100%;
}

.card-container {
  width: 100%;
  display: flex;
  .card-item {
    width: 25%;
    margin: 0 8px;
  }
  .card-avator {
    position: relative;
    overflow: hidden;
    & span {
      position: absolute;
      top: 0;
      right: 8px;
      color: white;
    }
  }
  .card-avator img {
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: 4px;
  }
  .name {
    cursor: pointer;
  }
  .author {
    color: #676767;
  }
  .copywriter {
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.3);
    padding: 8px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    width: 100%;
  }

  .copywriter-enter-active,
  .copywriter-leave-active {
    transition: transform 0.3s ease-in;
    transform: translateY(0%);
  }
  .copywriter-enter,
  .copywriter-leave-to {
    transform: translateY(-100%);
  }
}
</style>
