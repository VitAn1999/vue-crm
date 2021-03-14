export default {
  install(Vue) {
    Vue.prototype.$title = function(pageName) {
      const appName = process.env.VUE_APP_TITLE;
      return `${pageName} | ${appName}`;
    };
  },
};
