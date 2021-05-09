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
            <tr v-for="(cur, index) in curList" :key="index">
              <td>{{ cur["Cur_Scale"] }} {{ cur["Cur_Abbreviation"] }}</td>
              <td>
                {{ cur["Cur_OfficialRate"] | round }}
              </td>
              <td>{{ cur["Date"] | date("date") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currencies"],
  computed: {
    curList() {
      return this.currencies.filter((cur) => {
        return (
          cur["Cur_Abbreviation"] === "USD" ||
          cur["Cur_Abbreviation"] === "EUR" ||
          cur["Cur_Abbreviation"] === "RUB"
        );
      });
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
