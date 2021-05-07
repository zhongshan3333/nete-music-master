<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
};
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  flex-direction: row;
  & button {
    padding: 4px 8px;
    // border-radius: 16px;
    border: none;
    background-color: #dc433c;
    color: white;
    position: relative;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #d3423c;
    }
  }

  & button:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  & button:not(:last-child) {
    border-right: 1px solid #CC4D49;
  }

  & button:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
</style>
