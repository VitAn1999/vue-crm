import Vue from "vue";
import App from "./App.vue";
import Loader from "./components/app/Loader";
import Vuelidate from "vuelidate";
import Firebase from "firebase/app";
import Paginate from "vuejs-paginate";
import VueMeta from "vue-meta";
import "firebase/auth";
import "firebase/database";
import router from "./router";
import store from "./store";
import messagePlugin from "./utils/message.plugin";
import titlePlugin from "./utils/title.plugin";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import tooltipDirective from "./directive/tolltip.directive";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

Firebase.initializeApp({
  apiKey: "AIzaSyA7fXTZjh1gcwe0LqZ_2vvEe8lvD8GOI9s",
  authDomain: "vue-crm-fe9fc.firebaseapp.com",
  databaseURL: "https://vue-crm-fe9fc-default-rtdb.firebaseio.com",
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
