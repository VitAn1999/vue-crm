import _ from "lodash";

export default {
  data() {
    return {
      page: this.$route.query.path || 1,
      pageSize: 5,
      pagesCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
      this.pagesCount = _.size(this.allItems);
    },
    clickPaginateHandler() {
      this.$router.push(`${this.$route.path}?page=${this.page}`);
      this.items = this.allItems[this.page - 1];
    },
  },
};
