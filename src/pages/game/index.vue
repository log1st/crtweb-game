<template>
  <div :class="$style.page">
    <transition
      :enter-from-class="$style.enterFrom"
      :enter-active-class="$style.enterActive"
      :leave-to-class="$style.leaveTo"
      :leave-active-class="$style.leaveActive"
    >
      <div
        v-if="isStarted"
        :class="$style.game"
      >
        <div :class="$style.time">
          Time: {{ spendTime }}s
        </div>
        <div
          :class="$style.cards"
          :style="{
            '--items-per-line': Math.ceil(Math.sqrt(numberOfCards)),
            '--duration': `${duration}ms`,
          }"
        >
          <div
            v-for="(card, index) in numberOfCards"
            :key="card.id"
            :class="[
              $style.card,
              picked.includes(index) && $style.picked,
              opened.has(index) && $style.picked,
            ]"
            @click="pickCard(index)"
          >
            <Icon
              :icon="map[index]"
              :class="$style.icon"
            />
          </div>
        </div>
      </div>
      <button
        v-else
        key="start"
        :class="$style.start"
        @click="start"
      >
        <Icon
          :class="$style.startIcon"
          icon="play"
        /> Start
      </button>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, onBeforeUnmount, ref, watch,
} from 'vue';
import { useRouter } from 'vue-router';
import Icon from '@/components/icon/Icon.vue';
import { useResults } from '@/hooks/useResults';

export default defineComponent({
  name: 'Index',
  components: { Icon },
  setup() {
    const isStarted = ref(false);
    const spendTime = ref(0);
    let startedAt = new Date();

    let interval: number;
    let isWaiting = false;
    let timeout: number;
    const map = ref<string[]>([]);
    const numberOfMistakes = ref(0);

    const duration = 400;
    const numberOfCards = 36;

    const sourceIcons = [
      'build',
      'savings',
      'pets',
      'android',
      'gavel',
      'support',
      'redeem',
      'opacity',
      'token',
      'content_cut',
      'gesture',
      'cake',
      'science',
      'sports',
      'hive',
      'flash_on',
      'chat_bubble',
      'two_wheeler',
    ].slice(0, Math.min(Math.ceil(numberOfCards / 2), 18));

    const reset = () => {
      spendTime.value = 0;
      startedAt = new Date();
      map.value = sourceIcons.reduce((acc, item) => ([
        ...acc,
        item, item,
      ]), [] as string[]);
      // yup, doesn't look good, but it's only const:numberOfCards items, so doesn't matter
      map.value.sort(() => 0.5 - Math.random());
      clearInterval(interval);
      clearTimeout(timeout);
    };

    onBeforeUnmount(reset);

    const start = () => {
      isStarted.value = true;
      reset();
      interval = setInterval(() => {
        spendTime.value += 1;
      }, 1000);
    };

    const picked = ref<number[]>([]);
    const opened = ref(new Map<number, boolean>());

    const pickCard = async (index: number) => {
      if (isWaiting) {
        return;
      }
      if (opened.value.has(index)) {
        return;
      }
      if (picked.value[0] === index) {
        return;
      }
      clearTimeout(timeout);
      if (map.value[picked.value[0]] === map.value[index]) {
        opened.value.set(picked.value[0], true);
        opened.value.set(index, true);
        return;
      }
      if (picked.value.length === 1) {
        picked.value.push(index);
        numberOfMistakes.value += 1;
        isWaiting = true;
        await new Promise((r) => {
          timeout = setTimeout(r, duration);
        });
        isWaiting = false;
        picked.value = [];
        return;
      }
      isWaiting = false;
      picked.value.push(index);
      timeout = setTimeout(() => {
        picked.value = [];
        numberOfMistakes.value += 1;
      }, 5000);
    };

    const {
      saveResult,
    } = useResults();

    const router = useRouter();

    watch(computed(() => opened.value.size === numberOfCards), async (value) => {
      if (!value) {
        return;
      }
      clearInterval(interval);
      await new Promise((r) => {
        interval = setInterval(() => {
          r(true);
          clearInterval(interval);
        }, 1000);
      });
      await saveResult({
        numberOfMistakes: numberOfMistakes.value,
        startedAt,
        finishedAt: new Date(),
        // eslint-disable-next-line no-alert
        name: prompt('Enter your name') || 'Some name',
      });
      await router.push({ name: 'results' });
    }, {
      immediate: true,
    });

    return {
      isStarted,
      spendTime,
      start,
      picked,
      opened,
      pickCard,
      map,
      numberOfCards,
      sourceIcons,
      duration,
    };
  },
});
</script>

<style lang="scss" module>
@import "./index";
</style>
