<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-model="newUser.name" label="Nome" />
      <q-input v-model="newUser.email" label="Email" />
      <q-input v-model="newUser.password" label="Senha" />
      <q-btn color="primary" icon="check" label="Cadastrar" @click="submit()" />
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
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      axios
        .post("https://web.voxdatati.com.br:4443/api/users", this.newUser)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
