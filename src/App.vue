<template>
  <div :class="$style.app">
    <div :class="$style.header">
      <router-link
        :to="{name: 'game'}"
        :class="$style.title"
      >
        <Icon
          icon="memory"
          :class="$style.logo"
        />
        Memory Game
      </router-link>
      <div :class="$style.links">
        <router-link
          :to="{name: 'results'}"
          :class="$style.link"
          :active-class="$style.active"
        >
          Results
        </router-link>
        <a
          :href="gitHubURL"
          target="_blank"
          :class="$style.link"
        >
          Github
        </a>
      </div>
    </div>
    <router-view>
      <template #="{Component}">
        <component
          :is="Component"
          :class="$style.content"
        />
      </template>
    </router-view>
  </div>
</template>

<script lang="ts">
import '@/assets/drop.scss';
import '@/assets/root.scss';

import { defineComponent, onBeforeUnmount, onMounted } from 'vue';
import Icon from '@/components/icon/Icon.vue';

export default defineComponent({
  components: { Icon },
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

    const gitHubURL = 'https://github.com/log1st/crtweb-game';

    return {
      gitHubURL,
    };
  },
});
</script>

<style lang="scss" module>
@import "./app";
</style>
