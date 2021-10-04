import { useStore } from 'vuex';
import { computed } from 'vue';

export type RawResultRecord = {
  name: string;
  startedAt: Date;
  finishedAt: Date;
  numberOfMistakes: number;
}

export type ResultRecord = RawResultRecord & {
  id: number;
}

export type SerializedResultRecord = Omit<ResultRecord, 'startedAt' | 'finishedAt'> & {
  startedAt: number;
  finishedAt: number;
}

export type StandardizedResultRecord = ResultRecord & {
  place: number;
  spentTimeInSeconds: number;
}

export const useResults = () => {
  const store = useStore();

  const results = computed(
    () => store.getters['results/results'],
  );

  const saveResult = async (result: RawResultRecord) => store.dispatch('results/saveResult', result);
  const dropResult = async (resultId: ResultRecord['id']) => store.dispatch('results/dropResult', resultId);

  return {
    results,
    saveResult,
    dropResult,
  };
};
