<template>
  <div class="banner">
    <Carousel itemHeight="200px">
      <CarouselItem
        v-for="(banner, ind) in banners"
        :key="ind"
        class="banner-img"
      >
        <img :src="banner.imageUrl" alt="" />
        <span class="banner-typeTitle" v-if="!!banner.typeTitle">{{
          banner.typeTitle
        }}</span>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
import { getBanner } from '../../../api';
import { Carousel, CarouselItem } from '@/components/carousel';

export default {
  name: 'nete-banner',
  components: {
    Carousel,
    CarouselItem,
  },
  data() {
    return {
      banners: [],
    };
  },
  async created() {
    const { banners } = await getBanner();
    this.banners = banners;
    this.$emit('loaded', true)
  },
};
</script>
<style lang="scss" scoped>
.banner {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 230px;
  overflow: hidden;
}
.banner-img {
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}
.banner-img img {
  //   position: absolute;
  width: 100%;
  height: 100%;
}

.banner-typeTitle {
  background-color: #ca4b4d;
  color: white;
  padding: 2px 8px;
  position: absolute;
  bottom: 0;
  right: 0;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 8px;
}
</style>
