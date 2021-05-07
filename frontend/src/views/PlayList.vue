<template>
  <div class="song-list">
    <div class="header">
      <div class="avator">
        <img :src="getPlayListValue(playlist, 'coverImgUrl')" />
      </div>
      <div class="info">
        <div class="title">
          <span>歌单</span>
          <span>{{ getPlayListValue(playlist, 'name') }}</span>
        </div>
        <div class="creator">
          <img :src="getPlayListValue(playlist, 'creator.avatarUrl')" />
          <span>{{ getPlayListValue(playlist, 'creator.nickname') }}</span>
          <span
            >{{
              getPlayListValue(playlist, 'createTime') | formatDate
            }}创建</span
          >
        </div>
        <div class="action">
          <ButtonGroup class="action-buttons">
            <button @click="playAll">播放全部</button>
            <button @click="addToPlaylist">
              <i class="material-icons">add</i>
            </button>
          </ButtonGroup>
        </div>
        <div class="desc">
          <div class="tags">
            标 签：{{ getPlayListValue(playlist, 'tags') | joins(' / ') }}
          </div>
          <span class="trackCount">
            歌曲书：{{ getPlayListValue(playlist, 'trackCount') }}
          </span>
          <span class="playCount">
            播放数：{{ getPlayListValue(playlist, 'playCount') | formatCount }}
          </span>
          <div class="description">
            简介：{{ getPlayListValue(playlist, 'description') }}
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <nete-tabs>
        <nete-tab-panel name="歌曲列表">
          <table class="songtable">
            <thead align="left">
              <tr>
                <th></th>
                <th>音乐标题</th>
                <th>歌手</th>
                <th>专辑</th>
                <th>时长</th>
              </tr>
            </thead>
            <tbody align="left">
              <tr
                v-for="(d, idx) in getPlayListValue(playlist, 'tracks')"
                :key="idx"
                @dblclick="playSong(d, idx)"
              >
                <td style="padding-right:8px">{{ idx | insertZero }}</td>
                <td :class="{ dbClickActive: dbclickActive(d, idx) }">
                  {{ d.name }}
                </td>
                <td>{{ d.ar.map((v) => v.name) | joins(' / ') }}</td>
                <td>{{ d.al.name }}</td>
                <td>{{ d.dt | formatSecond }}</td>
              </tr>
            </tbody>
          </table>
        </nete-tab-panel>
        <nete-tab-panel
          :name="`评论 (${getPlayListValue(playlist, 'commentCount')})`"
        >
          <NeteComment
            :commentList="getPlayListValue(commentList, 'comments')"
            :hotComments="getPlayListValue(commentList, 'hotComments')"
          />
        </nete-tab-panel>
        <nete-tab-panel name="收藏者">
          <div class="subscribers">
            <div
              v-for="(subs, idx) in getPlayListValue(playlist, 'subscribers')"
              :key="idx"
              class="subscribers-item"
            >
              <img :src="subs.avatarUrl" />
              <div>
                <p>{{ subs.nickname }}</p>
                <p>{{ subs.signature }}</p>
              </div>
            </div>
          </div>
        </nete-tab-panel>
      </nete-tabs>
    </div>
  </div>
</template>

<script>
import { getPlayList, getCommentList } from '@/api';
import { NeteTabs, NeteTabPanel } from '@/components/tabs';
import { ButtonGroup } from '@/components/button-group';
import NeteComment from '@/components/comment';
import { realFormatSecond, getPlayListValue } from '@/utils';
import { mapState, mapActions, mapMutations } from 'vuex';
import moment from 'moment';

// props 0 歌单 ，1 专辑
export default {
  name: 'nete-PlayList',
  components: {
    NeteTabs,
    NeteTabPanel,
    ButtonGroup,
    NeteComment,
  },
  props: {
    id: {
      type: Number,
      default: 2409342460,
    },
  },
  data() {
    return {
      playlist: {},
      commentList: {},
    };
  },
  computed: {
    ...mapState('music', ['currentSong']),
  },
  methods: {
    ...mapActions('music', ['startSong']),
    ...mapMutations('music', [
      'addPlayList',
      'addHistoryList',
      'clearPlayList',
      'setCurrentSong',
    ]),
    getPlayListValue: getPlayListValue,
    addToPlaylist() {
      const { tracks } = this.playlist;
      const songs = tracks.map((song) => {
        const { id, name, ar, dt, al } = song;
        this.addPlayList({
          id,
          name,
          picUrl: al.picUrl,
          artists: ar,
          duration: dt,
        });
      });
    },
    playAll() {
      this.clearPlayList();
      this.addToPlaylist();
    },
    playSong(song, idx) {
      const { id, name, ar, dt, al } = song;
      song = {
        id,
        name,
        picUrl: al.picUrl,
        artists: ar,
        duration: dt,
      };
      this.addPlayList(song);
      this.setCurrentSong(song);
    },
    dbclickActive(list, idx) {
      return list.id === this.currentSong.id;
    },
  },
  async created() {
    if (!!this.id) {
      const { playlist } = await getPlayList(this.id);
      playlist &&
        Object.keys(playlist).forEach((key) =>
          this.$set(this.playlist, key, playlist[key])
        );
    }
  },
  async mounted() {
    if (!!this.id) {
      const { hotComments, comments } = await getCommentList(this.id);
      this.$set(this.commentList, 'hotComments', hotComments);
      this.$set(this.commentList, 'comments', comments);
    }
  },
  filters: {
    joins: function(val, str) {
      console.log('joins');
      if (!val) {
        return '';
      } else {
        return val.join(str);
      }
    },
    formatDate: function(val) {
      const d = new Date(val).toLocaleDateString().split('/');
      d[1] = d[1] < 10 ? `0${d[1]}` : d[1];
      d[2] = d[2] < 10 ? `0${d[2]}` : d[2];
      return d.join('-');
    },
    formatCount(val) {
      if (val > 10000) {
        return `${Math.round(val / 10000)}万`;
      }
      return val;
    },
    formatSecond(second) {
      return realFormatSecond(second / 1000);
    },
    insertZero(val) {
      return val < 10 ? `0${val}` : val;
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  height: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  padding: 16px;
}
.avator img {
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 6px;
  margin: 0 8px;
}

.title {
  display: flex;
  align-items: center;
  & span {
    margin: 0 4px;
  }
  & span:first-child {
    border: 1px solid #d13c37;
    color: #d13c37;
    padding: 0 4px;
    margin-left: 0;
    border-radius: 4px;
  }
  & span:nth-child(2) {
    font-size: 18px;
    font-weight: bold;
  }
}

.creator {
  display: flex;
  align-items: center;
  margin: 16px 0;
  & img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  & span {
    margin: 0 4px;
  }
  & span:first-of-type {
    display: inline-block;
    color: #5983b0;
  }
}

.action {
  margin: 16px 0;
}

.content {
  padding: 16px 24px;
}

.songtable {
  width: 100%;
  border-spacing: 0;
}
thead tr th {
  padding: 8px 0;
}

tbody tr td {
  padding: 8px 0;
}

tbody tr:nth-of-type(2n + 1) {
  background-color: #fafafa;
}

tbody tr:hover {
  background-color: #f2f2f3;
}

.subscribers {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.subscribers-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  width: 50%;
  & img {
    width: 90px;
    object-fit: contain;
    border-radius: 50%;
    display: block;
    margin-right: 8px;
  }
}

.dbClickActive {
  color: #d13c37;
}
</style>
