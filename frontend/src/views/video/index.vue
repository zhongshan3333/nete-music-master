<template>
  <div class="video">
    <div class="header">
      <div class="area">
        <span>地区：</span>
        <ul>
          <li
            v-for="(area, idx) in areas.data"
            :key="idx"
            @click="changeIndex(areas, idx)"
          >
            <span :class="{ 'select-active': areas.index === idx }">
              {{ area }}</span
            >
          </li>
        </ul>
      </div>
      <div class="type">
        <span>类型：</span>
        <ul>
          <li
            v-for="(t, idx) in types.data"
            :key="idx"
            @click="changeIndex(types, idx)"
          >
            <span :class="{ 'select-active': types.index === idx }">
              {{ t }}</span
            >
          </li>
        </ul>
      </div>
      <div class="order">
        <span>排序：</span>
        <ul>
          <li
            v-for="(o, idx) in orders.data"
            :key="idx"
            @click="changeIndex(orders, idx)"
          >
            <span :class="{ 'select-active': orders.index === idx }">
              {{ o }}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="wrapper" v-for="(mv, idx) in mvdata" :key="idx">
        <NeteVideoItem
          :title="mv.name"
          :author="mv.artistName"
          :duration="mv.duration"
          :playCount="mv.playCount"
          :imgUrl="mv.cover"
          class="video-item"
          @click="routerpush(mv)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NeteVideoItem from '@/components/video/item';
import { getMVAll } from '@/api';
export default {
  name: 'nete-video',
  components: {
    NeteVideoItem,
  },
  data() {
    return {
      count: 0,
      mvdata: [],
      areas: {
        index: 0,
        data: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      },
      types: {
        index: 0,
        data: ['全部', '官方版', '原声', '现场版', '网易出品'],
      },
      orders: {
        index: 0,
        data: ['上升最快', '最热', '最新'],
      },
    };
  },
  methods: {
    async fetchAllMV() {
      const { count, data } = await getMVAll(
        0,
        39,
        this.getValue(this.areas),
        this.getValue(this.types),
        this.getValue(this.orders)
      );
      this.count = count;
      data.forEach((d, i) => this.$set(this.mvdata, i, d));
    },
    routerpush(mv) {
      this.$router.push({ name: 'MVDetail', params: { id: mv.id } });
    },
    getValue(data) {
      const idx = data.index;
      return data.data[idx];
    },
    changeIndex(obj, idx) {
      obj.index = idx;
      this.$nextTick(() => {
        this.fetchAllMV();
      });
    },
  },
  async created() {
    await this.fetchAllMV();
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
}

.wrapper {
  width: 33%;
  padding: 8px;
}

.header {
  padding: 8px 16px;
  & > div {
    clear: both;
    display: flex;
    align-items: center;
  }
  ul {
    list-style: none;
    display: inline-block;
    margin: 0;
    padding: 8px 0;
  }
  ul li {
    float: left;
    padding: 0 16px;
    border-right: 1px solid rgba($color: #f0f0ef, $alpha: 1);
    &:last-child {
      border: none;
    }
    &:last-child::after {
      clear: both;
    }

    & span {
      padding: 2px 4px;
      cursor: pointer;
    }
  }

  .select-active {
    background-color: rgba($color: #d43535, $alpha: 0.1);
    border-radius: 3px;
    color: #d43535;
  }
}
</style>
