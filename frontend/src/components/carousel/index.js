import Carousel from './main.vue';
import CarouselItem from './item.vue';

Carousel.install = function(Vue, options) {
  Vue.component(Carousel.name, Carousel);
};

CarouselItem.install = function(Vue, options) {
  Vue.component(CarouselItem.name, CarouselItem);
};

export { Carousel, CarouselItem };
