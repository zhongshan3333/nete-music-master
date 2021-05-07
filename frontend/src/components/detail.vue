<template>
  <div class="container">
    <div class="left">
      <div class="header-title">
        <span class="material-icons" @click="$router.push('/')">
          arrow_back_ios
        </span>
        <h3>{{ headerTitle }}</h3>
      </div>
      <div id="player"></div>
      <div class="info">
        <div class="username">
          <img :src="avatarUrl" />
          <span>{{ artistName }}</span>
        </div>
        <h2 class="title">{{ title }}</h2>
        <div class="mv-desc">
          <span>发布：{{ publishTime | formatPublishTime }} </span>
          <span>播放：{{ playCount | formatCount }}次 </span>
        </div>
        <div class="tags"></div>
      </div>
      <div class="comment">
        <NeteComment :commentList="comments" :hotComments="hotComments" />
      </div>
    </div>
    <div class="right">
      <h3>相关推荐</h3>
      <div class="mv-list">
        <div v-for="(mv, idx) in relatedVideo" :key="idx" class="mv-item">
          <div class="mv-item__pic" @click="emitVideo(mv.vid, mv.type)">
            <img :src="mv.coverUrl" />
            <div class="mv-item__playcount">
              {{ mv.playTime | formatCount }}
            </div>
            <div class="mv-item__duration">
              {{ mv.durationms | formatSecond }}
            </div>
          </div>
          <div class="mv-list__content">
            <div class="mv-list__title">{{ mv.title }}</div>
            <div class="mv-list__creator">
              {{ mv.creator | appendSlash('userName') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XGPlayer from 'xgplayer';
import NeteComment from '@/components/comment';

import {
  getMVDetail,
  getMVURL,
  getMVRelate,
  getArtists,
  getMVComments,
} from '@/api';
import { objectIsEmpty } from '@/utils';
import { realFormatSecond } from '@/utils';
import moment from 'moment';
export default {
  name: 'NeteDetail',
  components: {
    NeteComment,
  },
  props: {
    headerTitle: '',
    avatarUrl: '',
    artistName: '',
    title: '',
    playCount: {
      // 播放统计
      type: Number,
      default: 0,
    },
    publishTime: {
      // 发布时间
      type: [Number, String],
    },
    commonData: {
      type: Object,
      required: true,
    },
    relatedVideo: {
      // 相关推荐视频
      type: Array,
      required: true,
    },
    comments: {
      // 评论
      type: Array,
    },
    hotComments: {
      // 热门评论
      type: Array,
    },
    videoURL: '',
    articulation: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      player: null,
    };
  },
  watch: {
    videoURL: function(val) {
      console.log('videoURL', val);
      this.loadMVPlayer(val);
    },
    articulation: function(val) {
      if (!Array.isArray(val)) return;
      if (this.player && val.length > 0) {
        this.player.emit('resourceReady', val);
      }
    },
  },
  methods: {
    async loadMVPlayer(url) {
      if (!this.player && url) {
        this.player = new XGPlayer({
          id: 'player',
          url: url,
          videoInit: true,
          autoplay: true,
          definitionActive: 'click',
        });
      } else if (this.player) {
        this.player.src = url;
      }
    },
    emitVideo(id, type) {
      this.$emit('click-video', { id, type });
    },
  },
  mounted() {
    this.loadMVPlayer(this.videoURL);
  },
  updated() {
    this.loadMVPlayer(this.videoURL);
  },
  filters: {
    appendSlash(val, id) {
      if (Array.isArray(val)) {
        const data = val.map((v) => v[id]);
        return data.join(' / ');
      }
      return '';
    },
    formatCount(val) {
      if (val > 10000) {
        return `${Math.round(val / 10000)}万`;
      } else {
        return val;
      }
    },
    formatSecond(val) {
      return realFormatSecond(val / 1000);
    },
    formatPublishTime(val) {
      const f = `${val}`.search(/-/);
      if (f === -1) {
        val = moment(val).format('YYYY-MM-DD');
      }
      return val;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
  width: 100%;
  height: 100%;
}

.left {
  max-width: 620px;
  .header-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    & span {
      font-size: 16px;
      cursor: pointer;
    }
  }
  .info {
    padding: 16px 8px 0 0;
  }
  .username {
    display: flex;
    flex-direction: row;
    align-items: center;
    & img {
      width: 50px;
      height: 50px;
      object-fit: contain;
      display: inline-block;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
}

#player {
  width: 620px;
  height: 350px;
}

.right {
  padding: 0 16px;
}
.mv-item {
  display: flex;
  margin: 12px 0;
  & img {
    width: 140px;
    height: 80px;
    object-fit: cover;
    display: block;
    border-radius: 4px;
  }

  .mv-list__content {
    padding: 8px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mv-list__title {
    cursor: pointer;
  }
  .mv-list__creator {
    color: #9c9c9c;
    cursor: pointer;
  }

  .mv-item__pic {
    position: relative;
    cursor: pointer;
  }

  .mv-item__playcount {
    position: absolute;
    top: 4px;
    right: 4px;
    color: white;
  }

  .mv-item__duration {
    position: absolute;
    bottom: 4px;
    right: 4px;
    color: white;
  }
}
</style>
