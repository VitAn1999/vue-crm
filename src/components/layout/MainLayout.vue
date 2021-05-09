<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" :name="name" />
      <Sidebar v-model="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          href="#"
          to="/record"
          v-tooltip="'Добавить запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "../../utils/messages";
export default {
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  components: {
    Navbar,
    Sidebar,
  },
  async mounted() {
    if (!this.$store.getters.showInfo) {
      console.log("start");
      await this.$store.dispatch("fetchInfo");
      console.log("finish");
      this.loading = false;
    } else {
      this.loading = false;
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
    showError() {
      return this.$store.getters.showError;
    },
  },
  watch: {
    showError(e) {
      this.$error(messages[e.code] || "Что то пошло не так");
    },
  },
};
</script>
