<template>
  <div class="footer">
    <nete-progress
      class="progress"
      :progressPercent="progress"
      @percentChange="percentChange"
    />

    <div class="playcontainer">
      <div class="payinfo">
        <div class="playavatar" v-if="!objectIsEmpty(currentSong)">
          <img :src="currentSong.picUrl" />
        </div>
        <div class="musicinfo" v-if="!objectIsEmpty(currentSong)">
          <div class="music-name">
            <span id="song-name">{{ currentSong.name }}</span>
            -
            <span>{{
              currentSong.artists.map((v) => v.name).join(' / ')
            }}</span>
          </div>
          <div class="music-progress">
            <span>{{ audio.currentTime | formatSecond }}</span> /
            <span>{{ audio.maxTime | formatSecond }}</span>
          </div>
        </div>
      </div>
      <div class="playop">
        <div class="like">
          <span class="material-icons">
            favorite_border
          </span>
        </div>
        <div class="opaction">
          <div class="pre" @click="toPrevSong()">
            <span class="material-icons">skip_previous</span>
          </div>
          <div class="action" @click="playMusic">
            <span class="material-icons">{{
              playStatus ? 'pause_circle_filled' : 'play_circle_filled'
            }}</span>
          </div>
          <div class="next" @click="toNextSong()">
            <span class="material-icons">skip_next</span>
          </div>
        </div>
        <div class="share">
          <span class="material-icons">open_in_new</span>
        </div>
      </div>
      <div class="playmode">
        <div class="loop" @click="loopModeChange">
          <i class="material-icons">{{ loop.playmode }}</i>
          <span class="hits">{{ loop.hits[loop.index] }}</span>
        </div>
        <div class="playlist" @click="$emit('click-playlist', true)">
          <i class="material-icons">playlist_play</i>
        </div>
        <div class="volume">
          <i class="material-icons" @click="volume_off_op">{{
            volume.value === 0 ? 'volume_off' : 'volume_up'
          }}</i>
          <nete-progress
            :progressPercent="volume.value"
            class="volume-progress"
            @percentChange="volumeChange"
          />
        </div>
      </div>
      <audio
        ref="audio"
        :src="audioSrc"
        :loop="isLoop"
        @ended="onEnded"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeUpdate"
        @loadedmetadata="onLoadedMetaData"
        autoplay
      ></audio>
    </div>
  </div>
</template>

<script>
import Progress from '@/components/progress';

import { mapState, mapMutations } from 'vuex';
import { objectIsEmpty, realFormatSecond } from '../../utils';

export default {
  name: 'nete-footer',
  components: {
    'nete-progress': Progress,
  },
  data() {
    return {
      progress: 0,
      audio: {
        playing: false,
        currentTime: 0,
        maxTime: 0,
      },
      loop: {
        // loop: 列表循环，单曲循环，顺序播放，随机播放
        hits: ['列表循环', '单曲循环', '顺序播放', '随机播放'],
        loopmode: ['repeat', 'repeat_one', 'replay', 'shuffle'],
        index: 0,
        playmode: 'repeat',
      },
      volume: {
        value: 50,
        swap: 50,
      },
    };
  },
  computed: {
    ...mapState('music', {
      currentSong: 'currentSong',
      isLoop: 'loop',
    }),
    audioSrc: {
      get: function() {
        const id = this.currentSong.id ? this.currentSong.id : '';
        return id
          ? `https://music.163.com/song/media/outer/url?id=${id}.mp3`
          : '';
      },
    },
    playStatus: {
      get: function() {
        if (Object.keys(this.currentSong).length === 0) {
          this.audio.playing = false;
        }
        return this.audio.playing;
      },
    },
  },
  methods: {
    ...mapMutations('music', [
      'toNextSong',
      'toPrevSong',
      'setPlayMode',
      'autoPlayNext',
    ]),
    objectIsEmpty: objectIsEmpty,
    playMusic(e) {
      if (this.audio.playing) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    onTimeUpdate(res) {
      this.audio.currentTime = res.target.currentTime;
      this.progress = Math.floor(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
    onLoadedMetaData(res) {
      this.audio.maxTime = parseInt(res.target.duration);
    },
    percentChange(percent) {
      const currentTime = Math.round(this.audio.maxTime * (percent / 100));
      this.$refs.audio.currentTime = currentTime;
    },
    onPlay(e) {
      this.audio.playing = true;
      this.$refs.audio.volume = this.volume.value / 100;
    },
    onPause(e) {
      this.audio.playing = false;
    },
    volumeChange(vol) {
      this.volume.value = vol;
      this.volume.swap = vol;
      this.$refs.audio.volume = vol / 100;
    },
    volume_off_op() {
      if (this.volume.value > 0) {
        this.volume.swap = this.volume.value;
        this.volume.value = 0;
      } else {
        this.volume.value = this.volume.swap;
      }
      this.$refs.audio.volume = this.volume.value / 100;
    },
    loopModeChange() {
      // loop: 列表循环，单曲循环，顺序播放，随机播放
      // 0, 1, 2, 3
      const index = (this.loop.index + 1) % 4;
      this.loop.playmode = this.loop.loopmode[index];
      this.loop.index = index;
      this.setPlayMode(this.loop.playmode);
    },
    onEnded(e) {
      console.log(e);
      const self = this;
      setTimeout(() => {
        console.log('change to next');
        self.autoPlayNext();
      }, 1000);
    },
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-user-select: none;
  user-select: none;
  & .playcontainer {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .playcontainer > div {
    width: 300px;
  }
}

.payinfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
  .playavatar {
    width: 42px;
    height: 42px;
    background-color: #f3f3f3;
    margin: 0 8px;
    & img {
      width: 100%;
      border-radius: 4px;
    }
    .music-progress span {
      color: #b5b5b5;
    }
  }
}

.playop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  & > div {
    display: block;
    margin: 0 16px;
  }

  .like span {
    display: block;
    text-align: center;
    font-size: 18px;
  }

  .opaction {
    display: flex;
    flex-direction: row;
    align-items: center;
    & div {
      margin: 0 12px;
      cursor: pointer;
    }
    .pre span,
    .next span {
      width: 18px;
      height: 18px;
      color: #d13c37;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }
    .action span {
      font-size: 46px;
      color: #d13c37;
    }
  }

  .share span {
    font-size: 18px;
    display: block;
    text-align: center;
  }
}

.playmode {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 16px;
  & > div {
    margin: 0 10px;
    & i,
    img {
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
    }
  }

  .loop {
    cursor: pointer;
    position: relative;
    .hits {
      display: none;
    }
    &:hover .hits {
      display: block;
      position: absolute;
      top: -25px;
      left: -18px;
      padding: 1px;
      background-color: white;
      width: max-content;
      height: max-content;
      box-shadow: 0 0 2px 1px #f3f3f3;
      z-index: 1;
      min-width: 50px;
    }
  }
  .playlist {
    cursor: pointer;
  }
  .volume {
    display: flex;
    justify-content: center;
    align-items: center;
    & i {
      cursor: pointer;
    }
    .volume-progress {
      margin-left: 8px;
      width: 100px;
    }
  }
}
</style>
