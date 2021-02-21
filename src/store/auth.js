import fb from "firebase/app";
export default {
  actions: {
    async login(context, payload) {
      try {
        await fb
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
};
