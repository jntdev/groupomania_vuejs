<template>
  <router-view />
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway&display=swap");
@import "@/assets/scss/_vars.scss";

body {
  font-family: "Raleway", sans-serif;
  width: 100%;
  height: 100%;
  margin: 0;
}
//rules
.flex {
  display: flex;
  align-items: center;
}
.flexcol {
  display: flex;
  flex-direction: column;
}
.centercenter {
  justify-content: center;
  align-items: center;
}
.card_border {
  border-radius: 0 15px 15px 15px;
  box-shadow: 5px 7px 15px -5px $thirdColor;
}
button {
  cursor: pointer;
}
</style>
