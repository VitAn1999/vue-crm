/* eslint-disable no-undef */
export default {
  bind(el, { value }) {
    M.Tooltip.init(el, { html: value, position: "top" });
  },
  unbind(el) {
    const instance = M.Tooltip.getInstance(el);
    if (instance && instance.destroy()) {
      instance.destroy();
    }
  },
};
