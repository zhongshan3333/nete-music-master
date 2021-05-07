<template>
  <div class="comments">
    <div v-if="hotComments.length > 0">
      <h3>精彩评论</h3>
      <div v-for="(hc, idx) in hotComments" :key="idx" class="hotComments-info">
        <img :src="hc.user.avatarUrl" />
        <div class="hotComments-desc">
          <span class="comment-nickname">{{ hc.user.nickname }}: </span>
          <span>{{ hc.content }}</span>
          <span>{{ hc.time | formatDateTime }}</span>
        </div>
      </div>
    </div>
    <div v-if="commentList.length > 0">
      <h3>最新评论</h3>
      <div v-for="(hc, idx) in commentList" :key="idx" class="hotComments-info">
        <img :src="hc.user.avatarUrl" />
        <div class="hotComments-desc">
          <span class="comment-nickname">{{ hc.user.nickname }}: </span>
          <span>{{ hc.content }}</span>
          <div class="comment-replied" v-if="hc.beReplied.length > 0">
            <span v-for="(rep, idx) in hc.beReplied" :key="idx">
              <span class="comment-nickname">@{{ rep.user.nickname }}: </span>
              <span>{{ rep.content }}</span>
            </span>
          </div>
          <span>{{ hc.time | formatDateTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'NeteComment',
  props: {
    hotComments: {
      type: Array,
      default: [],
    },
    commentList: {
      type: Array,
      required: true,
    },
  },
  methods: {},
  filters: {
    formatDateTime(val) {
      return moment(val).format('MM月DD日 HH:mm');
    },
  },
};
</script>

<style lang="scss" scoped>
.comments {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.hotComments-info {
  display: flex;
  align-items: center;
  & img {
    display: block;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .hotComments-desc > span:last-of-type {
    display: block;
    margin-top: 8px;
    color: #c0c0c0;
  }
}

.comment-nickname {
  color: #5983b0;
}

.hotComments-desc {
  width: 100%;
  border-bottom: 1px solid #f3f3f3;
  padding: 16px 0;
}

.comment-replied {
  padding: 6px;
  background-color: #f5f5f5;
}
</style>
