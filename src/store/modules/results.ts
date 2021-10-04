import { Module } from 'vuex';
import { StoreState } from '@/store';
import { RawResultRecord, ResultRecord, StandardizedResultRecord } from '@/hooks/useResults';

export const namespaced = true;

export type ResultsState = {
  results: Array<ResultRecord>;
}

type ResultsModule = Module<ResultsState, StoreState>;

export const state: ResultsModule['state'] = () => ({
  results: [],
});

export const getters: ResultsModule['getters'] = {
  results: (state): Array<StandardizedResultRecord> => {
    const localResults: Array<StandardizedResultRecord> = [...state.results].map((record) => ({
      ...record,
      spentTimeInSeconds: Math.ceil(
        (record.finishedAt.getTime() - record.startedAt.getTime()) / 1000,
      ),
      place: 0,
    }));

    localResults.sort((a, b) => (
      a.numberOfMistakes === b.numberOfMistakes ? (
        a.spentTimeInSeconds - b.spentTimeInSeconds > 0 ? 1 : -1
      ) : (a.numberOfMistakes - b.numberOfMistakes > 0 ? 1 : -1)
    ));

    return localResults.map((result, index) => ({
      ...result,
      place: index + 1,
    }));
  },
};

// immutability? what's that?
export const mutations: ResultsModule['mutations'] = {
  addResult: (state, result: ResultRecord) => {
    state.results.push(result);
  },
  removeResultById: (state, resultId: ResultRecord['id']) => {
    const index = state.results.findIndex((result) => result.id === resultId);
    if (index === -1) {
      return;
    }
    state.results.splice(index, 1);
  },
};

export const actions: ResultsModule['actions'] = {
  async saveResult({ commit }, result: RawResultRecord) {
    commit('addResult', {
      ...result,
      id: Math.random().toString(36).substr(2, 7),
    });
  },
  async dropResult({ commit }, resultId: ResultRecord['id']) {
    commit('removeResultById', resultId);
  },
};
