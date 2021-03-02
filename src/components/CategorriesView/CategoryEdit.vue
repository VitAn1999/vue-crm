<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{
              c.title
            }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name" class="active">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit" class="active">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            >Минимальная величина
            {{ $v.limit.$params.minValue.min }} рублей</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: ["categories"],
  data() {
    return {
      current: null,
      title: "",
      limit: null,
      select: null,
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(10) },
  },
  watch: {
    current(value) {
      let category = this.categories.find((c) => c.id === value);
      this.title = category.title;
      this.limit = category.limit;
    },
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const editCategory = {
        id: this.current,
        title: this.title,
        limit: this.limit,
      };
      this.$store
        .dispatch("editCategory", editCategory)
        .then(() => {
          this.$message("Категория обновлена");
        })
        .catch((e) => {
          this.$error("Ошибка: ", e);
        });
    },
  },
  created() {
    let category = this.categories[0];
    this.current = category.id;
    this.title = category.title;
    this.limit = category.limit;
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
