import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import draggable from 'vuedraggable'
Vue.component('vue-draggable', draggable)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.config.productionTip = false
Vue.use(Antd);

Vue.component('VButton',()=>import('@/components/VButton.vue'));
Vue.component('VInput',()=>import('@/components/VInput.vue'));

new Vue({
  render: h => h(App),
}).$mount('#app')
