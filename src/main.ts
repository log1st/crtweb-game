import { createApp } from 'vue';

import App from './App.vue';
import store from '@/store';

const app = createApp(App)
  .use(store);

app.component('Var', {
  render() {
    return this.$slots.default(this.$attrs);
  },
});

app.mount('#app');
