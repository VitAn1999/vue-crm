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
        console.log("start");
        const info = await fb
          .database()
          .ref(`users/${uid}/info`)
          .once("value");
        const userInfo = info.val();
        console.log("finish");
        context.commit("setInfo", userInfo);
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
    async updateInfo(context, payload) {
      try {
        const uid = await context.dispatch("getUid");
        const updateData = { ...context.getters.showInfo, ...payload };
        await fb
          .database()
          .ref(`users/${uid}/info`)
          .update(updateData);
        context.commit("setInfo", updateData);
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
  },
};
