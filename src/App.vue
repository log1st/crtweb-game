<template>
  <div :class="$style.app">
  </div>
</template>

<script lang="ts">
import '@/assets/drop.scss';
import '@/assets/root.scss';

import { defineComponent, onBeforeUnmount, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const calcVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
    };

    let vhTimeout: number;
    const handleVh = () => {
      clearTimeout(vhTimeout);
      vhTimeout = setTimeout(calcVh, 500);
    };
    onMounted(() => {
      calcVh();
      window.addEventListener('resize', handleVh);
      window.addEventListener('orientationchange', handleVh);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleVh);
      window.removeEventListener('orientationchange', handleVh);
    });
  },
});
</script>

<style lang="scss" module>
@import "./app";
</style>
