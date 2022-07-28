<template>
  <nav id="header">
    <li class="header_list">
      <router-link class="header_link" to="/">Accueil</router-link>
      <router-link class="header_link" to="/posts">Posts</router-link>
    </li>
  </nav>
  <router-view />
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway&display=swap");
body {
  font-family: "Raleway", sans-serif;
  width: 100%;
  height: 100%;
}
#header {
  width: 100%;
  height: 70px;
  border-bottom: 1px rgba(191, 191, 191, 0.582) solid;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.header_list {
  width: 30%;
  display: flex;
  justify-content: space-around;
}
.header_link {
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 25px;
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
</style>
