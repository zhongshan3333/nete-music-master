<template>
  <div class="video-detail">
    <NeteHeader />
    <NeteDetail
      headerTitle="视频详情"
      :title="videodata.title"
      :avatarUrl="getPlayListValue(videodata, 'avatarUrl')"
      :artistName="getPlayListValue(videodata, 'creator.nickname')"
      :commonData="videodata"
      :relatedVideo="relatedVideo"
      :comments="comments"
      :hotComments="hotComments"
      :videoURL="videoURL"
      :publishTime="getPlayListValue(videodata, 'publishTime')"
      :playCount="videodata.playTime"
      :articulation="articulation"
      @click-video="routerpush"
    />
  </div>
</template>

<script>
import NeteHeader from '@/components/header';
import NeteDetail from '@/components/detail';
import { getPlayListValue } from '@/utils';
import {
  getVideoDetail,
  getVideoURL,
  getVideoComments,
  getAllRelated,
} from '@/api';
export default {
  name: 'NeteVideoDetail',
  components: {
    NeteDetail,
    NeteHeader,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      videodata: {},
      relatedVideo: [],
      artists: {},
      comments: [],
      hotComments: [],
      videoURL: '',
      articulation: [],
    };
  },
  methods: {
    getPlayListValue,
    async fetchVideoDetail() {
      const id = this.id;
      const { data } = await getVideoDetail(id);
      Object.keys(data).forEach((key) =>
        this.$set(this.videodata, key, data[key])
      );
    },
    async fetchVideoURL() {
      const { urls } = await getVideoURL(this.id);
      const data = urls.slice(0, 1).pop();
      this.videoURL = data.url;
      urls.forEach((u, i) => {
        this.$set(this.articulation, i, { name: u.r, url: u.url });
      });
      console.log(this.articulation);
    },
    async fetchRelated(id) {
      const { data } = await getAllRelated(id);
      data.forEach((d, idx) => this.$set(this.relatedVideo, idx, d));
    },

    async fetchComments(id) {
      const { comments, hotComments } = await getVideoComments(id);
      comments.forEach((c, idx) => this.$set(this.comments, idx, c));
      hotComments.forEach((c, idx) => this.$set(this.hotComments, idx, c));
    },
    async updatePage() {
      await this.fetchVideoDetail();
      this.fetchVideoURL();
      this.fetchRelated(this.videodata.vid);
      this.fetchComments(this.videodata.vid);
    },
    routerpush(data) {
      const { id, type } = data;
      console.log(data);
      switch (type) {
        case 0: {
          // mv
          this.$router.push({ name: 'MVDetail', params: { id: id } });
          break;
        }
        case 1: {
          // video
          console.log('1');
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
    await this.updatePage();
  },
  beforeRouteUpdate(to, from, next) {
    this.updatePage();
    next();
  },
};
</script>
