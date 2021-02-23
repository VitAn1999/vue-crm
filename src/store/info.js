import fb from "firebase/app";
export default {
  state: {
    info: null,
  },
  getters: {
    showInfo(state) {
      return state.info;
    },
  },
  mutations: {
    setInfo(state, payload) {
      state.info = payload;
    },
    clearInfo(state) {
      state.info = null;
    },
  },
  actions: {
    async fetchInfo(context) {
      try {
        const uid = await context.dispatch("getUid");
        const info = (
          await fb
            .database()
            .ref(`users/${uid}/info`)
            .once("value")
        ).val();
        context.commit("setInfo", info);
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
  },
};
