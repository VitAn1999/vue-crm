import fb from "firebase/app";

export default {
  state: {
    categories: [],
  },
  actions: {
    async fetchCategories(context) {
      try {
        const uid = await context.dispatch("getUid");
        const categorFB = (
          await fb
            .database()
            .ref(`users/${uid}/categories`)
            .once("value")
        ).val();
        const categories = [];
        if (categorFB) {
          Object.keys(categorFB).forEach((key) => {
            const category = categorFB[key];
            categories.push({
              title: category.title,
              limit: category.limit,
              id: key,
            });
          });
        }
        context.commit("loadCategories", categories);
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
    async createNewCategory(context, payload) {
      try {
        const uid = await context.dispatch("getUid");
        const category = await fb
          .database()
          .ref(`users/${uid}/categories`)
          .push(payload);
        context.commit("createNewCategory", {
          title: payload.title,
          limit: payload.limit,
          id: category.key,
        });
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
    async editCategory(context, payload) {
      try {
        const uid = await context.dispatch("getUid");
        await fb
          .database()
          .ref(`users/${uid}/categories`)
          .child(payload.id)
          .update({ title: payload.title, limit: payload.limit });
        context.commit("editCategory", payload);
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
  },
  mutations: {
    loadCategories(state, payload) {
      state.categories = payload;
    },
    clearCategories(state) {
      state.categories = [];
    },
    createNewCategory(state, payload) {
      state.categories.push(payload);
    },
    editCategory(state, payload) {
      const newCategories = state.categories.map((item) => {
        if (item.id === payload.id) {
          return { id: payload.id, title: payload.title, limit: payload.limit };
        } else {
          return item;
        }
      });
      state.categories = newCategories;
    },
  },
  getters: {
    showAllCategories(state) {
      return state.categories;
    },
  },
};
