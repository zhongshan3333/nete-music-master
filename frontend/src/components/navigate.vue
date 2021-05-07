<template>
  <div class="navigate"></div>
</template>

<script>
export default {
  name: 'NeteNavigate',
};
</script>

<style lang="scss" scoped>
@import '../styles/common';

.navigate {
  flex-grow: 1;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 36px;
  color: $header-right-color;
}
</style>
