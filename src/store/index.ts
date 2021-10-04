import { createStore } from 'vuex';

import * as results from './modules/results';
import { ResultRecord, SerializedResultRecord } from '@/hooks/useResults';

export type StoreState = {
  results: results.ResultsState;
}

export default createStore<StoreState>({
  modules: {
    results,
  },
  mutations: {
    restoreModule(state, { module, value }: {module: string; value: any}) {
      const split = module.split('.');
      const last = split.pop();

      if (!last) {
        return;
      }

      (split.length
        ? split.reduce((acc: Record<string, any>, cur: string) => acc[cur], state)
        : state)[last] = value;
    },
  },
  plugins: [
    (store) => {
      const modules = [
        {
          module: 'results.results',
          parser: (results: Array<SerializedResultRecord>): Array<ResultRecord> => results.map(
            (result) => ({
              ...result,
              finishedAt: new Date(result.finishedAt),
              startedAt: new Date(result.startedAt),
            }),
          ),
          serializer: (results: Array<ResultRecord>): Array<SerializedResultRecord> => results.map(
            (result) => ({
              ...result,
              finishedAt: result.finishedAt.getTime(),
              startedAt: result.startedAt.getTime(),
            }),
          ),
        },
      ];

      modules.forEach(({ module, parser = (i) => i }) => {
        const persistedState = JSON.parse(localStorage.getItem('store') || '{}') || {};

        if (!(module in persistedState)) {
          return;
        }

        store.commit('restoreModule', { module, value: parser(persistedState[module]) });
      });

      modules.forEach(({ module, serializer = (i) => i }) => {
        store.watch(
          (state) => module.split('.').reduce(
            (acc, cur) => (acc as any)?.[cur], state,
          ),
          (value) => {
            localStorage.setItem('store', JSON.stringify({
              ...(JSON.parse(localStorage.getItem('store') || '{}') || {}),
              [module]: serializer(value as any),
            }));
          }, {
            deep: true,
          },
        );
      });
    },
  ],
});
