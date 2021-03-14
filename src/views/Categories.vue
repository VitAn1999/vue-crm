<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate />

        <CategoryEdit
          v-if="showAllCategories.length"
          :categories="showAllCategories"
          :key="showAllCategories.length + updateCount"
        />
        <h3 class="center" v-else>У вас нет созданных категорий</h3>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategorriesView/CategoryCreate";
import CategoryEdit from "../components/CategorriesView/CategoryEdit";
export default {
  metaInfo() {
    return { title: this.$title("Категории") };
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  data() {
    return {
      loading: true,
      updateCount: 0,
    };
  },
  computed: {
    showAllCategories() {
      return this.$store.getters.showAllCategories;
    },
  },
  watch: {
    showAllCategories() {
      this.updateCount++;
    },
  },
  mounted() {
    if (this.$store.getters.showAllCategories) {
      this.$store.dispatch("fetchCategories").then(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },
};
</script>
