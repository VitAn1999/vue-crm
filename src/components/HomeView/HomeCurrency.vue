<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td v-if="cur === 'RUB'">100 {{ cur }}</td>
              <td v-else>1 {{ cur }}</td>
              <td v-if="cur === 'RUB'">
                {{ ((rates["BYN"] / rates[cur]) * 100) | round }}
              </td>
              <td v-else>
                {{ (rates["BYN"] / rates[cur]) | round }}
              </td>
              <td>{{ date | date("date") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates", "date"],
  data() {
    return {
      currencies: ["USD", "EUR", "RUB"],
    };
  },
  computed: {
    baseCurrency() {
      return this.rates["BYN"] / this.rates["EUR"];
    },
  },
  filters: {
    round(cur) {
      return +cur.toFixed(4);
    },
  },
};
</script>

<style scoped>
table {
  margin-top: 50px;
}
</style>
