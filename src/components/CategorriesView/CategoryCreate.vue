<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
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
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            >Минимальная величина
            {{ $v.limit.$params.minValue.min }} рублей</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  data: () => ({
    title: "",
    limit: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(10) },
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const category = {
        title: this.title,
        limit: this.limit,
      };
      this.$store
        .dispatch("createNewCategory", category)
        .then(() => {
          this.title = "";
          this.limit = null;
          this.$v.$reset();
          this.$message("Категория была создана");
        })
        .catch(() => {});
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
};
</script>
