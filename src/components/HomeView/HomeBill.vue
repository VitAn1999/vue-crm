<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="cur in currencies" :key="cur">
          <span>{{ getBill(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["rates"],
  data() {
    return {
      currencies: ["BYN", "USD", "EUR", "RUB"],
    };
  },
  computed: {
    base() {
      return (
        this.$store.getters.showInfo.bill /
        (this.rates["BYN"] / this.rates["EUR"])
      );
    },
  },
  methods: {
    getBill(currency) {
      return Math.round(this.base * this.rates[currency]);
    },
  },
};
</script>
