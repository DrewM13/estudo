<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input
        filled
        type="email"
        v-model="currentUser.email"
        label="Usuário"
      />
      <q-input
        filled
        type="password"
        v-model="currentUser.password"
        label="senha"
      />
      <q-btn color="primary" icon="check" label="Enviar" @click="send()" />
      <!--{{currentUser}}-->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentUser: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    send() {
      axios
        .post(
          "https://web.voxdatati.com.br:4443/api/authenticate",
          this.currentUser
        )
        .then((res) => {
          console.log(res);
          alert("login efetuado com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          alert("Login não encontrado!");
        });
    }
  }
};
</script>
