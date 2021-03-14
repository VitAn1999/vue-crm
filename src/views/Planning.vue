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
          {{ c.outcome | currency }} из {{ c.limit | currency }}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
            class="determinate"
            :class="[c.color]"
            :style="{ width: c.percent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Planning",
  metaInfo() {
    return { title: this.$title("Панирование") };
  },
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
  async mounted() {
    await this.$store.dispatch("fetchRecords");

    this.$store.dispatch("fetchCategories").then(() => {
      this.categories = this.fetchCategories.map((category) => {
        const sumOutcome = this.records
          .filter((rec) => rec.categoryId === category.id)
          .filter((rec) => rec.type === "outcome")
          .reduce((sum, rec) => {
            return (sum += +rec.amount);
          }, 0);
        const percent = (sumOutcome / category.limit) * 100;
        const progressPercent = percent < 100 ? percent : 100;
        const progressColor =
          percent < 50 ? "green" : percent < 90 ? "yellow" : "red";
        const tooltipValue = category.limit - sumOutcome;
        const tooltip = `${
          tooltipValue >= 0 ? "До лимита:" : "Превышение на:"
        } ${Math.abs(tooltipValue)} BYN`;
        const newCategory = {
          id: category.id,
          title: category.title,
          limit: category.limit,
          outcome: sumOutcome,
          percent: progressPercent,
          color: progressColor,
          tooltip,
        };
        return newCategory;
      });
    });

    this.loading = false;
  },
};
</script>
