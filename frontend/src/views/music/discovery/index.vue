<template>
  <div
    class="personalized"
    v-loading="loading"
    loading-text="加载中"
    loading-background="white"
  >
    <div class="container">
      <nete-banner @loaded="handleLoading" />
      <nete-rsonglist @loaded="handleLoading" />
      <nete-private-content @loaded="handleLoading" />
      <nete-newsong @loaded="handleLoading" />
      <nete-mv @loaded="handleLoading" />
      <nete-djprogram @loaded="handleLoading" />
    </div>
  </div>
</template>

<script>
import Banner from './banner';
import RSongList from './recommend-songlist';
import PrivateContent from './privatecontent';
import NewSong from './newsong';
import MV from './mv';
import DJProgram from './djprogram';
export default {
  name: 'nete-discovery',
  components: {
    'nete-banner': Banner,
    'nete-rsonglist': RSongList,
    'nete-private-content': PrivateContent,
    'nete-newsong': NewSong,
    'nete-mv': MV,
    'nete-djprogram': DJProgram,
  },
  data() {
    return {
      loadcount: 0,
      loading: false,
    };
  },
  methods: {
    handleLoading(e) {
      e && this.loadcount++;
      if (this.loadcount === 6) {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
.personalized {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow: auto;
}
</style>
