
<template>
  <nav id="header">
    <img class="header_logo" src="../assets/header.png" alt="" />
    <ul class="header_list">
     <li><router-link class="header_link" to="/posts">Fil d'actualité</router-link></li> 
     <li><router-link @click="logout()" class="header_link" to="/">Déconnexion</router-link></li>
    </ul>
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
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    }
  },
  computed: {},
};
</script>
<style lang="scss">
@import '@/assets/scss/_vars.scss';
#header {
  width: 100%;

  padding-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul{
    padding: 0;
    li{
      list-style: none;
    }
    
  }
}
.border_nav {
  background-image: linear-gradient(
    90deg,
    $thirdColor 0%,
    rgba(122, 0, 0, 1) 20%,
    $primaryColor 40%
  );
  border: 0;
  height: 2px;
  width: 90%;
  margin-right: 0;
  margin-bottom: 0;
}
.header_logo {
  margin-left: 60px;
  height: 60px;
}
.header_list {
  width: 400px;
  display: flex;
  justify-content: space-around;
}
.header_link {
  text-decoration: none;
  color: $thirdColor;
  font-size: 25px;
}

@media (max-width: 980px) {
  .border_nav{
    width: 100%;
  }
}

@media (max-width: 850px) {
  #header{
    .header_logo {
  margin-left: 0;
  height: 80px;
}
    flex-direction: column;
    justify-content: space-between;
    ul{
      padding: 0;
      margin: 0;
    }
    
    
  }
  
  .header_list {
    width: 70%;
    justify-content: space-between;
  }
}
@media (max-width: 585px) {
  .header_list {
    width: 100%;
    flex-direction: column;
    align-items: center;
    
    li{
      text-align: center;
      width: 100%;
      padding-bottom: 20px;
      padding-top: 20px;
      border-top: solid 1px $thirdColor;
    }
    li:hover{
      background-color: $secondaryColor;

    }
  }
  .border_nav{
      margin: 0;
  }
}
</style>
