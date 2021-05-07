<template>
  <div class="private-content">
    <h3 style="padding: 0 8px">独家放送</h3>
    <div class="card-container">
      <div class="carditem" v-for="(content, idx) in lists" :key="idx">
        <div
          class="avator"
          @click="
            $router.push({ name: 'MVDetail', params: { id: content.id } })
          "
        >
          <img :src="content.sPicUrl" />
        </div>
        <div class="content">
          <span>{{ content.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPrivateContent } from '@/api';
export default {
  name: 'nete-private-content',
  data() {
    return {
      lists: [],
    };
  },
  async created() {
    const { result } = await getPrivateContent();
    this.lists = result;
    this.$emit('loaded', true);
  },
};
</script>

<style lang="scss" scoped>
.private-content,
.card-container {
  width: 100%;
}

.card-container {
  display: flex;
}

.carditem {
  width: 25%;
  padding: 8px;
  .avator img {
    display: block;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
  }
  .content span {
    display: inline-block;
    margin: 8px 0;
    cursor: pointer;
    color: #333333;
    &:hover {
      color: #000;
    }
  }
}
</style>
