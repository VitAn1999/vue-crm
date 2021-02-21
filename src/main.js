import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import router from "./router";
import store from "./store";
import messagePlugin from "./utils/message.plugin";
import dateFilter from "./filters/date.filter";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);

Firebase.initializeApp({
  apiKey: "AIzaSyA7fXTZjh1gcwe0LqZ_2vvEe8lvD8GOI9s",
  authDomain: "vue-crm-fe9fc.firebaseapp.com",
  projectId: "vue-crm-fe9fc",
  storageBucket: "vue-crm-fe9fc.appspot.com",
  messagingSenderId: "153368931288",
  appId: "1:153368931288:web:3379ce0a0889c5cfe1e0ad",
  measurementId: "G-96V4YSJBY8",
});

let add = null;

Firebase.auth().onAuthStateChanged(() => {
  if (!add) {
    add = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
