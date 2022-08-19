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
      <input id="file" type="file" @change="onFileSelected" />
      <label id="inputLabel" for="file">Uploadez un fichier</label>
      <p class="facultatif">
        *N'importez pas d'image si vous ne souhaitez pas la modifier
      </p>
      <button @click="modifyPost(id, owner_id)" class="submit" type="submit">
        <span>Publier</span>
      </button>
    </div>
  </section>
</template>
<script>
import Header from "../components/Header.vue";
export default {
  name: "ModifyPost",
  components: {
    Header,
  },
  data() {
    return {
      owner_id: "",
      maxCount: 280,
      remainingCount: 280,
    };
  },
  props: ["id", "title", "content", "owner_id"],
  methods: {
    countdown: function () {
      this.remainingCount = this.maxCount - this.content.length;
      this.hasError = this.remainingCount < 0;
    },
    onFileSelected: function (e) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (allowedTypes.includes(file.type)) {
        this.file = file;
        this.url = URL.createObjectURL(file);
        document.getElementById("inputLabel").innerHTML = file.name;
      } else {
        this.$toast.error("Type de fichier inconnu");
      }
    },
    modifyPost: function (id, owner_id) {
      const myId = sessionStorage.getItem("userId");
      const self = this;
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("file", this.file);
      //formData.append("file", this.file);
      this.$store.dispatch("checkIfICan", myId).then((res) => {
        if (res.data.isAdmin == 1 || res.data.id == owner_id) {
          if (this.file != null && this.file.size > 1800000) {
            e.preventDefault();
            this.$toast.error("Le fichier ne doit pas dépasser 1.8mo");
            return;
          } else {
            this.$store
              .dispatch("modifyPost", { postId: id, postInfos: formData })
              .then(() => {
                self.$router.push("/posts");
                self.$toast.success("Votre post a été correctement modifié");
              });
          }
        } else {
          self.$router.push("/posts");
          sessionStorage.setItem("userRole", JSON.stringify(0));
          self.$toast.error("Vous n'avez pas les droits necessaires");
        }
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
