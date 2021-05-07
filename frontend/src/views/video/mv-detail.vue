<template>
  <div class="mv-detail">
    <NeteHeader />
    <NeteDetail
      headerTitle="MV详情"
      :title="mvdata.name"
      :avatarUrl="artists.img1v1Url"
      :artistName="mvdata.artistName"
      :commonData="mvdata"
      :relatedVideo="relatedVideo"
      :comments="comments"
      :hotComments="hotComments"
      :videoURL="videoURL"
      :publishTime="mvdata.publishTime"
      :playCount="mvdata.playCount"
      @click-video="routerpush"
    />
  </div>
</template>

<script>
import NeteDetail from '@/components/detail';
import NeteHeader from '@/components/header';
import {
  getMVDetail,
  getMVURL,
  getArtists,
  getMVComments,
  getAllRelated,
} from '@/api';
export default {
  name: 'NeteMVDetail',
  components: {
    NeteHeader,
    NeteDetail,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      mvdata: {},
      relatedVideo: [],
      artists: {},
      comments: [],
      hotComments: [],
      videoURL: '',
    };
  },
  methods: {
    async fetchMVDetail() {
      const id = this.id;
      const { data } = await getMVDetail(id);
      Object.keys(data).forEach((key) =>
        this.$set(this.mvdata, key, data[key])
      );
    },
    async fetchVideoURL() {
      const { data } = await getMVURL(this.id);
      this.videoURL = data.url;
    },
    async fetchMVRelated(id) {
      const { data } = await getAllRelated(id);
      data.forEach((d, idx) => this.$set(this.relatedVideo, idx, d));
    },
    async fetchArtistsInfo(artistId) {
      const { artist } = await getArtists(artistId);
      Object.keys(artist).forEach((k) => this.$set(this.artists, k, artist[k]));
    },
    async fetchComments(id) {
      const { comments, hotComments } = await getMVComments(id);
      comments.forEach((c, idx) => this.$set(this.comments, idx, c));
      hotComments.forEach((c, idx) => this.$set(this.hotComments, idx, c));
    },
    routerpush(data) {
      const { id, type } = data;
      switch (type) {
        case 0: {
          // mv
          this.$router.push({ name: 'MVDetail', params: { id: id } });
          break;
        }
        case 1: {
          // video
          this.$router.push({ name: 'VideoDetail', params: { id: id } });
          break;
        }
        default: {
          break;
        }
      }
    },
  },
  async mounted() {
    console.log(this.id);
    await this.fetchMVDetail();
    this.fetchVideoURL();
    this.fetchArtistsInfo(this.mvdata.artistId);
    this.fetchMVRelated(this.mvdata.id);
    this.fetchComments(this.mvdata.id);
  },
};
</script>
