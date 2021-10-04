<template>
  <component
    :is="component"
    :class="$style.icon"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String as PropType<string>,
      required: true,
    },
    style: {
      type: String as PropType<'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone'>,
      default: 'filled',
    },
  },
  setup(props) {
    const map = new Map();
    map.set('memory-filled', require('@material-design-icons/svg/filled/memory.svg').default);
    map.set('delete-filled', require('@material-design-icons/svg/filled/delete.svg').default);
    map.set('play-filled', require('@material-design-icons/svg/filled/play_arrow.svg').default);

    map.set('build-filled', require('@material-design-icons/svg/filled/build.svg').default);
    map.set('savings-filled', require('@material-design-icons/svg/filled/savings.svg').default);
    map.set('pets-filled', require('@material-design-icons/svg/filled/pets.svg').default);
    map.set('android-filled', require('@material-design-icons/svg/filled/android.svg').default);
    map.set('gavel-filled', require('@material-design-icons/svg/filled/gavel.svg').default);
    map.set('support-filled', require('@material-design-icons/svg/filled/support.svg').default);
    map.set('redeem-filled', require('@material-design-icons/svg/filled/redeem.svg').default);
    map.set('opacity-filled', require('@material-design-icons/svg/filled/opacity.svg').default);
    map.set('token-filled', require('@material-design-icons/svg/filled/token.svg').default);
    map.set('content_cut-filled', require('@material-design-icons/svg/filled/content_cut.svg').default);
    map.set('gesture-filled', require('@material-design-icons/svg/filled/gesture.svg').default);
    map.set('cake-filled', require('@material-design-icons/svg/filled/cake.svg').default);
    map.set('science-filled', require('@material-design-icons/svg/filled/science.svg').default);
    map.set('sports-filled', require('@material-design-icons/svg/filled/sports.svg').default);
    map.set('hive-filled', require('@material-design-icons/svg/filled/hive.svg').default);
    map.set('flash_on-filled', require('@material-design-icons/svg/filled/flash_on.svg').default);
    map.set('chat_bubble-filled', require('@material-design-icons/svg/filled/chat_bubble.svg').default);
    map.set('two_wheeler-filled', require('@material-design-icons/svg/filled/two_wheeler.svg').default);

    const component = computed(() => (
      map.get(`${props.icon}-${props.style}`)
    ));

    return {
      component,
    };
  },
});
</script>

<style lang="scss" module>
@import "./icon";
</style>
