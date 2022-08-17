<template>
  <Header />
  <section class="flexcol centercenter new_post_parent">
    <div id="container_new_post" class="container_new_post card_border flexcol card">
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
        maxlength="255"
        name="content"
        class="post_content new_post_content"
        placeholder="Contenu de la publication jusqu'à 255 caratères..."
        rows="4"
        cols="100"
        v-on:keyup="countdown"
      />
      <p class="caracter_limit">{{ remainingCount }}</p>
      <input id="file" type="file" @change="onFileSelected">
      <label for="file">Uploadez un fichier</label>
      <p class="facultatif">*facultatif</p>
      <button @click="createPost" class="submit" type="submit">
        <span>Envoyer</span>
      </button>
    </div>
  </section>
</template>
<script>
import Header from "../components/Header.vue";
export default {
  name: "newPost",
  components: {
    Header,
  },
  data() {
    return {
      title: "",
      content: "",
      selectedFile: null,
      owner_id: "",
      maxCount: 255,
      remainingCount: 255,
    };
  },
  methods: {
    countdown: function () {
      this.remainingCount = this.maxCount - this.content.length;
      this.hasError = this.remainingCount < 0;
    },
    onFileSelected: function(e){
      const file = e.target.files[0];
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
      ];
      if (allowedTypes.includes(file.type)) {
        this.file = file;
        this.url = URL.createObjectURL(file);
      } else {
        
        this.$toast.error("Type de fichier inconnu");
      } 
    },
    createPost: function () {
      const myId = sessionStorage.getItem("userId");
      const self = this;
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("file", this.file);
      formData.append("user_id", myId);
      //formData.append("file", this.file);
      this.$store
        .dispatch("createPost", formData)
        .then(() => {
          self.$router.push("/posts");
          self.$toast.success("Votre post est maintenant visible");
        })
        .catch((err) => {
          err.message == "Request failed with status code 422" ?
          self.$toast.error("Vous devez remplir le formulaire"):
          self.$toast.error("Erreur lors de la création du post");
          console.log(err.message);
        });
    },
  },
  computed: {
    validatedFields: function () {
      if (this.title != "" && this.description != "") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/_vars.scss';
.new_post_parent {
  height: 80vh;
  padding:5%
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
    border-color: $primaryColor;
    font-family: "Raleway", sans-serif;
    font-size: 20px;
  }
  .caracter_limit {
    align-self: flex-end;
    margin: 0;
  }
}
#file{
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
#file + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: $secondaryColor;
    border-radius: 5px;
    padding: 2%;
    display: inline-block;
    cursor: pointer;
}
.facultatif{
  margin:0
}

#file:focus + label,
#file + label:hover {
    background-color: $primaryColor;
}

@media (max-width: 1200px) {
  #container_new_post {
    height: 600px;
    

  }
  .new_post_content {
      height: 200px;
    }
}
@media (max-width: 800px) {
  #container_new_post{
    border: none;
    box-shadow: none;
  }
    .new_post_content {
      height: 300px;
    }

  
}
</style>
