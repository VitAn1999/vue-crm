<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="createCategory" />

        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategorriesView/CategoryCreate";
import CategoryEdit from "../components/CategorriesView/CategoryEdit";
export default {
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  computed: {
    showAllCategories() {
      return this.$store.getters.showAllCategories;
    },
  },
  methods: {
    createCategory() {
      console.log(this.showAllCategories);
    },
  },
};
</script>
