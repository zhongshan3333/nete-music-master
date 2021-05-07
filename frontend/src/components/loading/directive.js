import Vue from 'vue';
import Loading from './Loading.vue';

const LoadingMask = Vue.extend(Loading);

const LoadingDirective = {};

LoadingDirective.install = function(Vue) {
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      // loading

      InsertDom(el, el, binding);
    } else {
      // unloading

      el.instance.visible = false;
    }
  };

  const InsertDom = (parent, el, binding) => {
    Object.keys(el.maskStyle).forEach((property) => {
      el.mask.style[property] = el.maskStyle[property];
    });

    parent.appendChild(el.mask);

    Vue.nextTick(() => {
      el.instance.visible = true;
    });
  };

  Vue.directive('loading', {
    bind: function(el, binding, vnode) {
      el.classList.add('loading-parent-relative');
      const text = el.getAttribute('loading-text');
      const background = el.getAttribute('loading-background');
      const vm = vnode.context;
      const mask = new LoadingMask({
        el: document.createElement('div'),
        data: {
          text: (vm && vm[text]) || text,
          background: (vm && vm[background]) || background,
        },
      });

      el.instance = mask;
      // loading dom
      el.mask = mask.$el;
      el.maskStyle = {};

      binding.value && toggleLoading(el, binding);
    },
    update: function(el, binding) {
      el.instance.setText(el.getAttribute('loading-text'));
      el.instance.setBackground(el.getAttribute('loading-background'));
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function(el, binding) {
      el.classList.remove('loading-parent-relative');
      el.instance && el.instance.$destroy();
    },
  });
};
export default LoadingDirective;
