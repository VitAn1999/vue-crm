import fb from "firebase/app";

export default {
  actions: {
    async createRecord(context, payload) {
      try {
        const getUid = await context.dispatch("getUid");
        await fb
          .database()
          .ref(`users/${getUid}/record`)
          .push(payload);
      } catch (e) {
        context.commit("setError");
        throw e;
      }
    },
  },
};
