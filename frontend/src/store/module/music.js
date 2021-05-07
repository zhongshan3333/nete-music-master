import { MusicPlayController } from '@/utils';

const state = {
  prevSong: {},
  currentSong: {},
  playList: [],
  historyList: [],
  playmode: 'repeat',
  loop: false,
};

const mutations = {
  setCurrentSong(state, payload) {
    state.currentSong = payload;
  },
  addPlayList(state, payload) {
    if (state.playList.length <= 0) state.loop = true;
    else state.loop = false;

    const isExists = state.playList.some((v) => v.id === payload.id);
    if (!isExists) {
      state.playList = [...state.playList, payload];
    }
    if (Object.keys(state.currentSong).length < 1) {
      state.currentSong = state.playList[0];
    }
  },
  addHistoryList(state, payload) {
    const isExists = state.historyList.some((v) => v.id === payload.id);
    if (!isExists) {
      state.historyList = [...state.historyList, payload];
    }
  },
  clearPlayList(state) {
    console.log('clean');
    state.playList = [];
    state.currentSong = Object.assign({});
  },
  toNextSong(state) {
    if (state.playList.length === 0) return;
    // 下一首
    switch (state.playmode) {
      case 'repeat_one':
      case 'replay':
      case 'repeat': {
        // repeat
        const idx = repeat_index(state.playList, state.currentSong);
        state.currentSong = state.playList[idx];
        break;
      }
      case 'shuffle': {
        // shuffle
        const [prevSong, currentSong] = shuffle(
          state.playList,
          state.currentSong
        );
        state.currentSong = currentSong;
        break;
      }
    }
  },
  setPlayMode(state, mode) {
    if (mode === 'repeat_one') state.loop = true;
    else state.loop = false;
    state.playmode = mode;
  },

  toPrevSong(state) {
    let currentIDX = state.playList.findIndex(
      (v) => v.id === state.currentSong.id
    );
    const idx = reverse(currentIDX, state.playList.length);
    state.currentSong = state.playList[idx];
  },

  autoPlayNext(state) {
    if (state.playList.length === 0) return;

    if (state.playList.length <= 1 && state.playmode !== 'replay')
      state.loop = true;
    else state.loop = false;
    // 下一首
    switch (state.playmode) {
      case 'repeat': {
        // repeat

        const idx = repeat_index(state.playList, state.currentSong);
        state.currentSong = state.playList[idx];

        break;
      }
      case 'repeat_one': {
        // repeat_one
        // stay currentSong
        if (Object.keys(state.currentSong) === 0 && state.musicLength > 0)
          state.currentSong = state.playList[0];
        else {
          const swap = state.currentSong;
          state.currentSong = {};
          state.currentSong = swap;
        }
        break;
      }
      case 'replay': {
        // replay
        let currentIDX = state.playList.findIndex(
          (v) => v.id === state.currentSong.id
        );
        if (currentIDX + 1 === state.playList.length) break;
        else {
          const idx = (currentIDX + 1) % state.playList.length;
          state.currentSong = state.playList[idx];
        }
        break;
      }
      case 'shuffle': {
        // shuffle
        const [pre, current] = shuffle(state.playList, state.currentSong);
        state.currentSong = current;
        break;
      }
    }
  },
};

function reverse(value, max) {
  const i = value % max;
  const r = (max - i) % max;
  return max - r - 1;
}

const actions = {
  async startSong(ctx, songinfo) {
    const song = Object.assign({}, songinfo);
    ctx.commit('setCurrentSong', song);
  },
};

const getters = {};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(playList, currentSong) {
  let currentIDX = null;
  let idx = null;

  if (currentSong != null) {
    currentIDX = playList.findIndex((v) => v.id === currentSong.id);
  }

  while (true) {
    if (playList.length === currentIDX) break;
    idx = getRandomInt(0, playList.length);
    if (idx !== currentIDX) break;
  }
  return [currentSong, playList[idx]];
}

function repeat_index(playList, currentSong) {
  let currentIDX = playList.findIndex((v) => v.id === currentSong.id);
  return (currentIDX + 1) % playList.length;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
