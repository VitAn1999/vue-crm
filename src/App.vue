<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/components/layout/EmptyLayout.vue';
import MainLayout from '@/components/layout/MainLayout.vue';
import Home from './views/Home';
import Login from './views/Login';
import Registration from './views/Registration';
import Categories from './views/Categories';
import DetailRecord from './views/DetailRecord';
import History from './views/History';
import Planning from './views/Planning';
import Profile from './views/Profile';
import Record from './views/Record';

export default {
  components: {
    EmptyLayout,
    MainLayout,
    Home,
    Login,
    Registration,
    Categories,
    DetailRecord,
    History,
    Planning,
    Profile,
    Record,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'main-layout';
    },
  },
};
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/index';
</style>
