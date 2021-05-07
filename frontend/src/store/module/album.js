import { getAlbum } from '@/api';

const state = {
  album: {},
};
const mutations = {
  updateAlbum(state, payload) {
    state.album = payload;
  },
};
const actions = {
  async getAlbum(ctx, id) {
    const { data } = await getAlbum(id);
    ctx.commit('updateAlbum', data);
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
