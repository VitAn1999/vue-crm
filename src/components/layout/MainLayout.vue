<template>
  <div>
    <div class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" :name="name" />
      <Sidebar v-model="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" href="#" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
export default {
  data() {
    return {
      isOpen: true,
    };
  },
  components: {
    Navbar,
    Sidebar,
  },
  async mounted() {
    if (!this.$store.getters.showInfo) {
      await this.$store.dispatch("fetchInfo");
    }
  },
  computed: {
    name() {
      if (this.$store.getters.showInfo) {
        return this.$store.getters.showInfo.name;
      } else {
        return "User name";
      }
    },
  },
};
</script>
