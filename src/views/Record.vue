<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <h4 v-else-if="!categories.length" class="center">
      У вас нет активных категорий.
      <router-link to="/categories">Добавить категорию</router-link>
    </h4>

    <form v-else class="form">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{
            c.title
          }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input id="description" type="text" />
        <label for="description">Описание</label>
        <span class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "../components/app/Loader.vue";
export default {
  components: { Loader },
  name: "Record",
  data() {
    return {
      loading: true,
      select: null,
      category: null,
    };
  },
  computed: {
    categories() {
      return this.$store.getters.showAllCategories;
    },
  },
  mounted() {
    this.$store
      .dispatch("fetchCategories")
      .then(() => {
        this.loading = false;
      })
      .then(() => {
        if (this.categories.length) {
          this.category = this.categories[0].id;
        }
      })
      .then(() => {
        // eslint-disable-next-line no-undef
        this.select = M.FormSelect.init(this.$refs.select);
        // eslint-disable-next-line no-undef
        M.updateTextFields();
      });
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
