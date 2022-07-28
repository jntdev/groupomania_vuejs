<template>
  <div class="left_panel">
    <button @click="logout()" class="board_button button">Déconnexion</button>
    <button @click="newPost()" class="new_post_button board_button button">
      Nouveau Post
    </button>
  </div>
  <hr class="board_hr" />
</template>
<script>
export default {
  name: "Panel",
  components: {},
  data() {
    return {};
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    newPost: function () {
      this.$router.push("/newpost");
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.board {
  display: flex;
  flex: 2;
  padding: 3%;
  .left_panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;
    height: 20vh;
    justify-content: space-around;
  }
  .board_button {
    padding: 3% 6%;
  }
  .new_post_button {
    border-color: rgb(0, 0, 0);
  }
}
.board_hr {
  margin-left: 50px;
  height: 60vh;
  border: solid 1px red;
}
</style>
