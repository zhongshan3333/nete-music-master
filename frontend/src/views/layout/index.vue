<template>
  <div id="layout">
    <header>
      <NeteHeader />
    </header>
    <main>
      <nete-menu />
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
    <footer>
      <nete-footer @click-playlist="playListOpen = !playListOpen" />
    </footer>

    <nete-playlist :show="playListOpen" />
  </div>
</template>

<script>
import Menu from '@/components/menu';
import PlayList from '@/components/playlist';
import Footer from './footer';
import NeteHeader from '@/components/header';
export default {
  name: 'Layout',
  components: {
    NeteHeader,
    'nete-menu': Menu,
    'nete-footer': Footer,
    'nete-playlist': PlayList,
  },
  data() {
    return {
      playListOpen: false,
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common';

#layout {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;

  header {
    background-color: $header-left-background;
  }

  header,
  footer,
  main {
    display: flex;
    flex-direction: row;
  }

  header {
    height: 50px;
    width: 100%;
  }
  main {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    height: calc(100% - 110px);
  }
  .content {
    overflow: auto;
    width: 100%;
    height: 100%;
  }

  footer {
    height: 60px;
    width: 100%;
    background-color: $footer-background;
    color: $footer-color;
    z-index: 10;
    position: relative;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
