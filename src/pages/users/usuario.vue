<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-model="newUser.nome" label="Nome" />
      <q-input v-model="newUser.email" label="Email" />
      <q-input v-model="newUser.senha" label="Senha" />
      {{ newUser }}
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      newUser: {
        nome: "",
        email: "",
        senha: ""
      }
    };
  }
};
axios
  .get("https://web.voxdatati.com.br:4443/api/authenticate")
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
</script>
