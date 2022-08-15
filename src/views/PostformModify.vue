<template>
  <Header />
  <section class="flexcol centercenter new_post_parent">
    <div class="container_new_post card_border flexcol card">
      <h1>Rédigez votre publication</h1>

      <input
        v-model="title"
        type="text"
        name="title"
        placeholder="Titre"
        class="post_title"
      />

      <textarea
        v-model="content"
        type="textarea"
        maxlength="280"
        name="content"
        class="post_content"
        placeholder="Jusqu'à 280 caratères..."
        rows="4"
        cols="100"
        v-on:keyup="countdown"
      />
      <p class="caracter_limit">{{ remainingCount }}</p>
      <button @click="sendPost" class="submit" type="submit">
        <span>Publier</span>
      </button>
    </div>
  </section>
</template>
<script>
import Header from "../components/Header.vue";
export default {
  name: "PostformModify",
  components: {
    Header,
  },
  data() {
    return {
      title: "",
      content: "",
      owner_id: "",
      maxCount: 280,
      remainingCount: 280,
    };
  },
  props: ["id", "title", "content"],

  methods: {
    countdown: function () {
      this.remainingCount = this.maxCount - this.content.length;
      this.hasError = this.remainingCount < 0;
    },
    sendPost: function () {
      const myId = sessionStorage.getItem("userId");
      const self = this;
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("user_id", myId);

      console.log(formData);

      this.$store
        .dispatch("modifyPost", { postId: this.id, postInfos: formData })
        .then(() => {
          self.$router.push("/posts");
          self.$toast.success("Votre post a bien été modifié");
        })
        .catch((err) => {
          self.$router.push("/posts");
          self.$toast.error("Erreur lors de la modification du post");
          console.log(err);
        });
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.new_post_parent {
  height: 80vh;
}
.container_new_post {
  justify-content: space-around;
  align-items: flex-start;
  height: 400px;
  padding: 3%;
  button {
    align-self: flex-end;
    padding: 2%;
  }
  .post_title {
    width: 100%;
    font-size: 20px;
  }
  .post_content {
    width: 100%;
    resize: none;
    border-radius: 5px;
    border-color: red;
    font-family: "Raleway", sans-serif;
    font-size: 20px;
  }
  .caracter_limit {
    align-self: flex-end;
    margin: 0;
  }
}
</style>
