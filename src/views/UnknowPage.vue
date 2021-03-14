<template>
  <div>
    <h3 class="center">
      <span style="color: red">404</span> Такой страницы не существует
    </h3>
  </div>
</template>

<script>
export default {
  name: "Unknow-page",
  metaInfo() {
    return { title: this.$title("Страница не найдена") };
  },
};
</script>
