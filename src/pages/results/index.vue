<template>
  <div :class="$style.page">
    <div :class="$style.table">
      <div :class="[$style.header, $style.row]">
        <div :class="$style.cell">
          #
        </div>
        <div :class="$style.cell">
          Name
        </div>
        <div :class="$style.cell">
          Time
        </div>
        <div :class="$style.cell">
          Mistakes
        </div>
        <div :class="$style.cell" />
      </div>
      <div
        v-if="results.length === 0"
        :class="$style.noData"
      >
        No data for now. <router-link
          :to="{name: 'game'}"
        >
          <span>Try to play</span>
        </router-link>.
      </div>
      <!-- @TODO let's think we don't need any ability to unique record in table -->
      <div
        v-else
        :class="[$style.records, $style.row]"
      >
        <Var
          v-for="result in results"
          :key="result.id"
          :data-colorClass="$style[[, 'gold', 'silver', 'bronze'][result.place]]"
        >
          <template #="{colorClass}">
            <div :class="[$style.cell, colorClass, $style.place]">
              {{ result.place }}
            </div>
            <div :class="[$style.cell, colorClass]">
              {{ result.name }}
            </div>
            <div
              :class="[$style.cell, colorClass]"
              :title="[
                result.startedAt.toLocaleString(),
                result.finishedAt.toLocaleString()
              ].join(' - ')"
            >
              {{ result.spentTimeInSeconds }}s
            </div>
            <div :class="[$style.cell, $style.mistakes, colorClass]">
              {{ result.numberOfMistakes }}
            </div>
            <div :class="[$style.cell, $style.actions, colorClass]">
              <button
                :class="[$style.action, $style.danger]"
                @click="dropResult(result.id)"
              >
                <Icon icon="delete" />
              </button>
            </div>
          </template>
        </Var>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useResults } from '@/hooks/useResults';
import Icon from '@/components/icon/Icon.vue';

export default defineComponent({
  name: 'Index',
  components: { Icon },
  setup() {
    const {
      results,
      dropResult,
    } = useResults();

    return {
      results,
      dropResult,
    };
  },
});
</script>

<style lang="scss" module>
@import "./index";
</style>
