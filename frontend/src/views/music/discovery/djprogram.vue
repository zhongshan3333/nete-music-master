<template>
  <div class="djprogram">
    <h3 style="padding: 0 8px;">推荐电台</h3>
    <div class="container">
      <div class="card-item" v-for="(dj, idx) in djlists" :key="idx">
        <div class="avator">
          <img :src="dj.picUrl" />
        </div>
        <div class="content">
          <span>{{ dj.program.name }}</span>
          <span>{{ dj.program.dj.nickname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDJProgram } from '@/api';
export default {
  name: 'nete-djprogram',
  data() {
    return {
      djlists: [],
    };
  },
  async created() {
    const { result } = await getDJProgram();
    this.djlists = result;
    this.$emit('loaded', true)
  },
};
</script>

<style lang="scss" scoped>
.djprogram,
.container {
  width: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 340px;
}
.card-item {
  width: 50%;
  display: flex;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  .avator img {
    display: block;
    width: 90px;
    border-radius: 4px;
  }

  .content {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .content span {
    display: block;
    margin: 4px 0;

    &:last-child {
      color: #9e9e9e;
      &:hover {
        color: #6f6f6f;
      }
    }
  }
}
</style>
