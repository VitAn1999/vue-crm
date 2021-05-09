import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
import record from "./record";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const nbrb = await fetch(
        "https://www.nbrb.by/api/exrates/rates?periodicity=0"
      );
      const cur = await nbrb.json();
      // const key = process.env.VUE_APP_FIXER;
      // const responce = await fetch(
      //   `http://data.fixer.io/api/latest?access_key=${key}&symbols=BYN,USD,EUR,RUB`
      // );
      // const currency = await responce.json();
      return cur;
    },
  },
  getters: {
    showError(state) {
      return state.error;
    },
  },
  modules: { auth, info, category, record },
});
