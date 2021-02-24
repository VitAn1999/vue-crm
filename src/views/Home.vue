<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="updateCurrance"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :rates="this.currency.rates" />

      <HomeCurrency :rates="this.currency.rates" :date="this.currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "../components/HomeViews/HomeBill";
import HomeCurrency from "../components/HomeViews/HomeCurrency";
export default {
  name: "Home",
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    if (this.currency) {
      this.loading = false;
    }
  },
  methods: {
    async updateCurrance() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      if (this.currency) {
        this.loading = false;
      }
    },
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
};
</script>
