<template>
  <div class="recommend-songlist">
    <h3 style="padding: 0 8px">推荐歌单</h3>
    <div class="cardcontainer">
      <div class="carditem" v-for="(song, ind) in songlists" :key="ind">
        <div
          class="card-avator"
          @click="$router.push({ name: 'playlist', params: { id: song.id } })"
        >
          <img :src="song.picUrl" />
          <span>{{
            Math.round(song.playCount / 10000) > 1
              ? `${Math.round(song.playCount / 10000)}万`
              : song.playCount
          }}</span>
          <div class="shade"></div>
        </div>
        <div class="card-content">
          <span>{{ song.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonalized } from '@/api';
export default {
  name: 'nete-rsonglist',
  data() {
    return {
      songlists: [],
    };
  },
  async created() {
    const { result } = await getPersonalized();
    this.songlists = result;
    this.$emit('loaded', true);
  },
};
</script>

<style lang="scss" scoped>
.recommend-songlist {
  width: 100%;
  display: flex;
  flex-direction: column;

  .cardcontainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .carditem {
    width: 20%;
    padding: 8px;
    .card-avator {
      width: 100%;
      position: relative;
      cursor: pointer;
      .shade {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 0px 20px 10px rgba(0, 0, 0, 0.2);
      }
      & img {
        display: block;
        width: 100%;
        border-radius: 4px;
      }
      & span {
        top: 0;
        right: 8px;
        position: absolute;
        color: white;
        z-index: 2;
      }
    }

    .card-content span {
      display: inline-block;
      margin: 8px 0;
      cursor: pointer;
      color: #333333;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
