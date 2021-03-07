import fb from "firebase/app";

export default {
  state: {
    records: [],
  },
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
    async fetchRecords(context) {
      try {
        const uid = await context.dispatch("getUid");
        const recordsFB = (
          await fb
            .database()
            .ref(`users/${uid}/records`)
            .once("value")
        ).val();
        const records = [];
        if (recordsFB) {
          Object.keys(recordsFB).forEach((key) => {
            const record = recordsFB[key];
            records.push({
              amount: record.amount,
              description: record.description,
              type: record.type,
              categoryId: record.categoryId,
              date: record.date,
              id: key,
            });
          });
        }
        context.commit("loadRecords", records);
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
  },
  mutations: {
    loadRecords(state, payload) {
      state = payload;
    },
  },
  getters: {
    showRecords(state) {
      return state.records;
    },
  },
};
