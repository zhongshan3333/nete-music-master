<template>
  <div class="playlist" v-show="show">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>总共{{ playList.length }}首</th>
            <th>收藏全部</th>
            <th>
              <span
                class="clearPlayList"
                @click="$store.commit('music/clearPlayList')"
                >清空</span
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(list, idx) in playList"
            :key="`list-${idx}`"
            @click="currentClick = `list-${idx}`"
            :class="{ active: currentClick === `list-${idx}` }"
            @dblclick="dbclick(list, idx)"
          >
            <td :class="{ dbClickActive: dbclickActive(list, idx) }">
              <i class="material-icons" v-show="dbclickActive(list, idx)"
                >pause</i
              >
            </td>
            <td :class="{ dbClickActive: dbclickActive(list, idx) }">
              {{ list.name }}
            </td>
            <td :class="{ dbClickActive: dbclickActive(list, idx) }">
              {{ list.artists.map((v) => v.name).join(' / ') }}
            </td>
            <td>{{ (list.duration / 1000) | formatSecond }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { realFormatSecond } from '@/utils';
export default {
  name: 'nete-playlist',
  props: {
    show: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentClick: '',
    };
  },
  methods: {
    ...mapMutations('music', ['setCurrentSong']),
    dbclick(song, idx) {
      this.setCurrentSong(song);
      // this.currentDBClick = `list-${idx}`;
    },
    dbclickActive(list, idx) {
      return list.id === this.currentSong.id;
    },
  },
  computed: {
    ...mapState('music', ['playList', 'currentSong']),
  },
  filters: {
    formatSecond: function(second = 0) {
      return realFormatSecond(second);
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  position: absolute;
  top: 50px;
  bottom: 60px;
  right: 0px;
  width: 420px;
  background: white;
  // box-shadow: -1px 0px 1px 1px #f4f4f4;
  -webkit-box-shadow: -1px 0 1px -1px #f4f4f4;
  -moz-box-shadow: -1px 0 1px -1px #f4f4f4;
  box-shadow: -1px 0 1px -1px #f4f4f4;
  z-index: 5;
  padding: 8px 0;
}

.playlist {
  .table-container {
    overflow: auto;
    width: 100%;
    height: 100%;
  }
  table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    position: relative;

    thead tr {
      border-bottom: 1px solid #ededee;
      th {
        text-align: left;
        position: sticky;
        top: 0;
        background-color: white;
      }
      & th:first-child {
        width: 8px;
      }
    }
    tbody {
      overflow: auto;
    }
    th,
    td {
      padding: 8px;
    }
  }
}

.playlist table tbody {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  & tr:hover {
    background-color: #f5f5f5 !important;
    color: black;
  }

  & tr:nth-of-type(2n) {
    background-color: #fafafa;
  }
  & tr:nth-of-type(2n + 1) {
    background-color: white;
  }
}

.active {
  background-color: #f0f0f0 !important;
}
.dbClickActive {
  color: #d13c37;
  & i {
    font-size: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.clearPlayList {
  cursor: pointer;
}
</style>
