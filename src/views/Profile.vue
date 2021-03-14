<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$dirty && $v.name.name }"
        />
        <label for="description">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.name"
          class="helper-text invalid"
          >Введите ваше имя</small
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Profile",
  metaInfo() {
    return { title: this.$title("Профиль") };
  },
  data() {
    return {
      name: "",
    };
  },
  validations: {
    name: { required },
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const name = this.name;
      this.$store.dispatch("updateInfo", { name }).then(() => {
        this.$v.$reset();
        this.$message("Изменения сохранены");
      });
    },
  },
  mounted() {
    this.name = this.$store.getters.showInfo.name;
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  },
};
</script>
