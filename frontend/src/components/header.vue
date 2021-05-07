<template>
  <div class="header">
    <div class="header-left">
      <div class="fn">
        <button id="home"></button>
        <button id="min"></button>
        <button id="fullscreen"></button>
      </div>
      <span class="material-icons" @click="$router.back()">
        arrow_back_ios
      </span>
      <span class="material-icons" @click="$router.forward()">
        arrow_forward_ios
      </span>
    </div>
    <div class="right-side">
      <NeteNavigate />
      <div class="search">
        <input type="text" placeholder="搜索" />
        <i class="material-icons">search</i>
      </div>
      <span class="material-icons-outlined">settings</span>
      <div class="github-icon" @click="toGithub()">
        <svg
          class="octicon octicon-mark-github v-align-middle"
          height="24"
          viewBox="0 0 16 16"
          version="1.1"
          width="24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import NeteNavigate from '@/components/navigate';
export default {
  name: 'NeteHeader',
  components: {
    NeteNavigate,
  },
  methods: {
    toGithub() {
      window.open('https://github.com/caizhiyuannn/nete-music');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/common';
.header {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.header-left {
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 8px;
  width: 200px;
  align-items: center;
  background-color: $header-left-background;
  color: $header-left-color;
  & span {
    font-size: 13px;
    display: flex;
    margin-left: 16px;
    cursor: pointer;
    &:nth-of-type(2) {
      margin-right: 8px;
    }
  }
  justify-content: flex-end;
}

.right-side {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: $header-right-background;
  padding: 0 8px;
  & > div {
    margin: 0 16px;
  }
  .search {
    position: relative;
  }
  .search input[type='text'] {
    outline: none;
    border: none;
    border-radius: 40px;
    background-color: #ededed;
    height: 24px;
    padding-left: 24px;

    &:focus {
      background-color: #f2f2f2;
    }
  }

  .search i {
    position: absolute;
    left: 0;
    font-size: 20px;
    top: 0;
    padding: 3px;
  }
}

.fn {
  width: 100%;
  height: 100%;
  display: flex;
  & button {
    border-radius: 50%;
    height: 12px;
    width: 12px;
    display: block;
    border: none;
    margin-left: 6px;
    outline: none;
  }
}
#home {
  background-color: #fc5b57;
}

#min {
  background-color: #e5bf3c;
}
#fullscreen {
  background-color: #33c849;
}

.github-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
