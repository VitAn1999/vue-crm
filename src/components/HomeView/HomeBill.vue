<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line">
          <span>{{ Math.round(bill) | currency }}</span>
        </p>
        <p class="currency-line" v-for="(cur, index) in curList" :key="index">
          <span>{{
            Math.round((bill / cur["Cur_OfficialRate"]) * cur["Cur_Scale"])
              | currency(cur["Cur_Abbreviation"])
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["currencies"],
  computed: {
    bill() {
      return this.$store.getters.showInfo.bill;
    },
    curList() {
      return this.currencies.filter((cur) => {
        return (
          cur["Cur_Abbreviation"] === "USD" ||
          cur["Cur_Abbreviation"] === "EUR" ||
          cur["Cur_Abbreviation"] === "RUB" ||
          cur["Cur_Abbreviation"] === "BYN"
        );
      });
    },
  },
};
</script>
