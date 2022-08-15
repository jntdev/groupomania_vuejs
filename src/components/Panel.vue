<template>
  <div class="board">
    <hr class="board_hr" />
    <div class="left_panel">
      <button @click="logout()" class="board_button button">Déconnexion</button>
      <button @click="newPost()" class="new_post_button board_button button">
        Nouveau Post
      </button>
    </div>
  </div>
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
      this.$router.push("/postform");
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.board {
  display: flex;
  .left_panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    height: 20vh;
  }
  .board_button {
    margin-top: 50px;
    padding: 3% 6%;
  }
  .new_post_button {
    border-color: rgb(0, 0, 0);
  }
}
.board_hr {
  margin-top: 0;
  height: 80vh;
  border: 0;
  background-image: linear-gradient(
    rgba(0, 0, 0, 1) 0%,
    rgba(122, 0, 0, 1) 20%,
    rgba(255, 0, 0, 1) 60%
  );
  width: 2px;
}
</style>
