<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ bill | currency }}</h4>
    </div>

    <Loader v-if="loading" />

    <h4 v-else-if="!categories.length" class="center">
      У вас нет активных категорий.
      <router-link to="/categories">Добавить категорию</router-link>
    </h4>

    <section v-else>
      <div v-for="c in categories" :key="c.id">
        <p>
          <strong>{{ c.title }}:</strong>
          12 122 из 14 000
        </p>
        <div class="progress">
          <div class="determinate green" style="width:40%"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  computed: {
    fetchCategories() {
      return this.$store.getters.showAllCategories;
    },
    records() {
      return this.$store.getters.showRecords;
    },
    bill() {
      return this.$store.getters.showInfo.bill;
    },
  },
  mounted() {
    this.$store.dispatch("fetchRecords");
    this.$store.dispatch("fetchCategories").then(() => {
      this.categories = this.fetchCategories;
    });

    this.loading = false;
  },
};
</script>
