<template>
  <section>
    <div class="hero"></div>
  </section>
  <section class="login_section">
    <div class="card">
      <div class="tabs" v-if="mode == 'login'">
        <div class="tab connexion_tab">
          <h2 class="activ">Connexion</h2>
        </div>
        <div class="tab register_tab" @click="switchToRegister">
          <h2>S'enregistrer</h2>
        </div>
      </div>
      <div class="tabs" v-if="mode == 'create'">
        <div class="tab connexion_tab" @click="switchToLogin">
          <h2>Connexion</h2>
        </div>
        <div class="tab register_tab">
          <h2 class="activ">S'enregistrer</h2>
        </div>
      </div>
      <div class="form">
        <input v-model="email" type="text" name="email" placeholder="  Email" />
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="  Mot de passe"
        />

        <button
          @click="login"
          class="submit"
          type="submit"
          v-if="mode == 'login'"
        >
          <span v-if="status === 'loading'">Connexion en cours...</span>
          <span v-else>Se connecter</span>
        </button>
        <button
          @click="createAccount"
          class="submit"
          type="submit"
          v-if="mode == 'create'"
        >
          S'enregistrer
        </button>
      </div>
    </div>
    <div class="error_msg" v-if="mode == login && status == 'error_login'">
      <p>Adresse mail et/ou mot de passe invalide</p>
    </div>
    <div class="error_msg" v-if="mode == create && status == 'error_create'">
      <p>Adresse mail déjà utilisée</p>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data: function () {
    return {
      mode: "login",
      email: "",
      password: "",
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/posts");
      return;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToRegister: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            console.log("toto");
            self.$router.push("/posts");
            console.log("tato");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    createAccount: function () {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.login();
            self.$router.push("/posts");
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>
<style>
.hero {
  height: 400px;
  width: 100%;
  background-image: url("../assets/icon-left-font.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 20% 50%;
}
.login_section {
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  display: flex;
  border-radius: 0 15px 15px 15px;
  box-shadow: 5px 7px 15px -5px #000000;
  padding: 20% 20% 10% 20%;
  flex-direction: column;
  justify-content: space-around;
  height: 250px;
}
.tabs {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
h2 {
  color: rgb(0, 0, 0);
}
.activ {
  color: red;
}
input {
  font-family: "raleway";
  height: 45px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid red;
}
.submit {
  border: none;
  background: red;
  border-radius: 8px;
  padding: 4%;
  font-family: "Raleway", sans-serif;
  font-size: 18px;
  color: white;
  align-self: flex-end;
}
.disabled {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
