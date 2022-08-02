
<template>
  <nav id="header">
    <img class="header_logo" src="../assets/header.png" alt="" />
    <li class="header_list">
      <router-link class="header_link" to="/posts">Posts</router-link>
    </li>
  </nav>
  <hr class="border_nav" />
  <router-view />
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style>
#header {
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.border_nav {
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(122, 0, 0, 1) 20%,
    rgba(255, 0, 0, 1) 40%
  );
  border: 0;
  height: 2px;
  width: 90%;
  margin-right: 0;
  margin-bottom: 0;
}
.header_logo {
  margin-left: 60px;
  height: 100%;
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
</style>
