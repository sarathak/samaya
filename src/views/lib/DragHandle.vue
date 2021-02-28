<template>
  <span class="drag-handle">
    <slot></slot>
  </span>
</template>

<script>
export default {
  mounted() {
    this.$el.sortableHandle = true;
  },
};
</script>
<style scoped>
.drag-handle {
  display: inline-block;
  width: 25px;
  height: 25px;
  background:#000;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.5;
  margin-right: 10px;
  cursor: grab;
}
</style>