<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import messages from "@/utils/messages";
export default {
  computed: {
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
