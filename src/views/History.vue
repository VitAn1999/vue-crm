<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <h4 v-else-if="!records.length" class="center">
      Записей пока нет.
      <router-link to="/record">Добавьте запись.</router-link>
    </h4>

    <section v-else>
      <Table :records="records" />
    </section>
  </div>
</template>

<script>
import Table from "@/components/HistoryView/Table.vue";

export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Table,
  },
  computed: {
    categories() {
      return this.$store.getters.showAllCategories;
    },
    records() {
      const fetchRecords = this.$store.getters.showRecords;
      const records = fetchRecords.map((record) => {
        return {
          ...record,
          categoryName: this.categories.find((c) => c.id === record.categoryId)
            .title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "Доход" : "Расход",
        };
      });
      return records;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchCategories");
    await this.$store.dispatch("fetchRecords");
    this.loading = false;
  },
};
</script>
