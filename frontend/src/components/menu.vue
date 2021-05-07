<template>
  <div class="menu">
    <div class="user-profile">
      <span class="material-icons">
        person_outline
      </span>
      <span>未登陆</span>
    </div>
    <div class="menu-item-container">
      <router-link
        to="/discovery"
        tag="div"
        active-class="isactive"
        class="menu-link"
      >
        <span class="material-icons">music_note</span>
        <span>发现音乐</span>
      </router-link>
      <!-- <router-link to="/radio" tag="div" active-class="isactive" class="menu-link">
        <span class="material-icons">
          radio
        </span>
        <span>私人FM</span>
      </router-link> -->
      <router-link
        to="/video"
        tag="div"
        active-class="isactive"
        class="menu-link"
      >
        <span class="material-icons">
          slideshow
        </span>
        <span>最新MV</span>
      </router-link>
      <!-- <div class="my-music">
        我的音乐
      </div> -->
    </div>

    <!-- <div class="song-list">
      <span>创建的歌单</span>
      ...
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'nete-menu',
};
</script>

<style lang="scss" scoped>
@import '../styles/common';

.menu {
  background-color: $menu-background;
  color: $menu-color;
  width: 200px;
  flex-shrink: 0;
}

.user-profile {
  display: flex;
  align-items: center;

  & span:nth-of-type(1) {
    font-size: 40px;
  }
}

.menu-item-container {
  & div {
    padding: 8px 0;
    font-size: 12px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #e7e7e7;
    }
  }
}

.material-icons {
  margin: 0 8px;
}

.menu-link {
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}
.isactive {
  background-color: #e2e2e2;
}
</style>
