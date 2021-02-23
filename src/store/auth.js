import fb from "firebase/app";
export default {
  actions: {
    async login(context, payload) {
      try {
        await fb
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
      } catch (e) {
        const error = await e;
        context.commit("setError", error);
        throw e;
      }
    },
    async logout(context) {
      try {
        await fb.auth().signOut();
        context.commit("clearInfo");
      } catch (e) {
        const error = await e;
        context.commit("setError", error);
        throw e;
      }
    },
    async registration(context, payload) {
      try {
        const fbAuth = await fb
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        const user = {
          name: payload.name,
          id: fbAuth.user.uid,
        };
        await context.dispatch("createUser", user);
      } catch (e) {
        const error = await e;
        context.commit("setError", error);
        throw e;
      }
    },
    async createUser(context, payload) {
      try {
        await fb
          .database()
          .ref(`users/${payload.id}/info`)
          .set({
            name: payload.name,
            bill: 1000,
          });
      } catch (e) {
        const error = await e;
        context.commit("setError", error);
        throw e;
      }
    },
    getUid() {
      const user = fb.auth().currentUser;
      if (user) {
        return user.uid;
      } else {
        return null;
      }
    },
  },
};
