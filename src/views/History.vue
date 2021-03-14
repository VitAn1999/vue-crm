<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <h4 v-else-if="!items.length" class="center">
      Записей пока нет.
      <router-link to="/record">Добавьте запись.</router-link>
    </h4>

    <section v-else>
      <Table :records="items" />

      <Paginate
        v-model="page"
        :page-count="pagesCount"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickPaginateHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import Table from "@/components/HistoryView/Table.vue";
import paginationMixin from "../mixins/pagination.mixin";
import { Pie } from "vue-chartjs";

export default {
  name: "History",
  metaInfo() {
    return { title: this.$title("История") };
  },
  data() {
    return {
      loading: true,
    };
  },
  extends: Pie,
  mixins: [paginationMixin],
  components: {
    Table,
  },
  computed: {
    categories() {
      return this.$store.getters.showAllCategories;
    },
  },
  methods: {
    setup() {
      const fetchRecords = this.$store.getters.showRecords;
      this.setupPagination(
        fetchRecords.map((record) => {
          return {
            ...record,
            categoryName: this.categories.find(
              (c) => c.id === record.categoryId
            ).title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход",
          };
        })
      );

      this.renderChart({
        labels: this.categories.map((category) => category.title),
        datasets: [
          {
            label: "Расходы",
            data: this.categories.map((category) => {
              return fetchRecords.reduce((sum, record) => {
                if (
                  record.categoryId === category.id &&
                  record.type === "outcome"
                ) {
                  sum += record.amount;
                }
                return sum;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(225, 129, 84, 0.2)",
              "rgba(205, 109, 104, 0.2)",
              "rgba(185, 179, 124, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(225, 129, 84, 1)",
              "rgba(205, 109, 104, 1)",
              "rgba(185, 179, 124, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchCategories");
    await this.$store.dispatch("fetchRecords");
    this.setup();
    this.loading = false;
  },
};
</script>
