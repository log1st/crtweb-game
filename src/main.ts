import { createApp } from 'vue';

import App from './App.vue';
import store from '@/store';
import router from '@/router';

const app = createApp(App)
  .use(store)
  .use(router);

app.component('Var', {
  render() {
    return this.$slots.default(
      Object.entries(this.$attrs)
        .filter(
          ([key]) => key.startsWith('data-'),
        ).reduce((acc, [key, value]) => ({
          ...acc,
          [key.replace('data-', '')]: value,
        }), {}),
    );
  },
});

app.mount('#app');
