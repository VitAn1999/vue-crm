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

    <form @submit.prevent="onSubmit" v-else class="form">
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
          <input
            class="with-gap"
            v-model="radio"
            name="type"
            type="radio"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            v-model="radio"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >Минимальная сумма {{ $v.amount.$params.minValue.min }} р.</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
          >Описание должно быть заполнено</span
        >
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
import { required, minValue } from "vuelidate/lib/validators";
export default {
  components: { Loader },
  name: "Record",
  metaInfo() {
    return { title: this.$title("Создать запись") };
  },
  data() {
    return {
      loading: true,
      select: null,
      category: null,
      radio: "outcome",
      description: "",
      amount: 1,
    };
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(1) },
  },
  computed: {
    categories() {
      return this.$store.getters.showAllCategories;
    },
    bill() {
      return this.$store.getters.showInfo.bill;
    },
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.bill < this.amount && this.radio === "outcome") {
        this.$message(
          `На счете недостаточно средств (${this.bill - this.amount})`
        );
      } else {
        let bill = null;
        this.radio === "outcome"
          ? (bill = this.bill - this.amount)
          : (bill = this.bill + this.amount);
        this.$store.dispatch("createRecord", {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.radio,
          date: new Date().toJSON(),
        });
        this.$store.dispatch("updateInfo", { bill }).then(() => {
          this.$v.$reset();
          this.amount = 1;
          this.description = "";
          this.$message("Транзакция прошла успешно");
        });
      }
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
