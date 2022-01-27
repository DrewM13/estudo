<template>
  <div
    class="q-pa-md"
    style="
      padding-left: 900px;
      padding-right: 300px;
      padding-top: 300px;
      padding-bottom: 300px;
    "
  >
    <div class="q-gutter-md" style="">
      <q-input
        filled
        v-model="newUser.name"
        label="Nome"
        style="width: 200px"
      />
      <q-input
        filled
        type="email"
        v-model="newUser.email"
        label="Email"
        style="width: 200px"
      />
      <q-input
        filled
        type="password"
        v-model="newUser.password"
        label="Senha"
        style="width: 200px"
      />
      <q-btn color="primary" icon="check" label="Cadastrar" @click="submit()" />
      <!-- {{ newUser }}-->
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
          alert("Usuário criado com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          alert("Usuário já cadastrado ou erro ao criar o usuário");
        });
    }
  }
};
</script>
