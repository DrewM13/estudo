<template>
  <q-page class="flex flex-center">
    <div>
      <div class="row justify-center">
        <div class="q-gutter-xl" v-if="pagina === 0">
          <div>
            <q-input
              outlined
              type="email"
              v-model="currentUser.email"
              label="Email"
              color=""
            >
            </q-input>
          </div>
          <div>
            <q-input
              outlined
              v-model="currentUser.password"
              label="Senha"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="row justify-center">
            <q-btn
              color="white"
              text-color="black"
              label="Entrar"
              @click="send()"
            />
            <q-btn
              color="white"
              text-color="black"
              label="Realizar cadastro"
              @click="pagina = 1"
            />
          </div>
        </div>
        <div class="q-pa-md" v-if="pagina === 1">
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
            <q-btn
              color="primary"
              icon="check"
              label="Cadastrar"
              @click="submit()"
            />
            <!-- {{ newUser }}-->
          </div>
        </div>
        <div v-if="pagina === 2">
          <div class="column">
            <div>
              <q-input v-model="ToDo.name" label="Digite o a fazer" outlined />
            </div>
            <div>
              <q-input
                v-model="ToDo.text"
                label="Digite a descrição do a fazer"
                autogrow
                outlined
              />
            </div>
            <div>
              <q-btn label="Enviar tarefa" @click="sendToDo()"></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      logindt: null,
      pagina: 0,
      isPwd: true,
      newUser: {
        name: "",
        email: "",
        password: ""
      },
      currentUser: {
        email: "",
        password: ""
      },
      ToDo: {
        token: "",
        name: "",
        text: ""
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
          this.pagina = 0;
        })
        .catch((error) => {
          console.log(error);
          alert("Usuário já cadastrado ou erro ao criar o usuário");
        });
    },
    send() {
      axios
        .post(
          "https://web.voxdatati.com.br:4443/api/authenticate",
          this.currentUser
        )
        .then((res) => {
          alert("login efetuado com sucesso!");
          this.logindt = res.data;
          this.pagina = 2;
        })
        .catch((error) => {
          console.log(error);
          alert("Login não encontrado!");
        });
    },
    sendToDo() {
      axios
        .post("https://web.voxdatati.com.br:4443/api/todo", this.ToDo)
        .then((res) => {
          alert("Tarefa criada com sucesso.");
          console.log(this.logindt);
        });
    }
  }
};
</script>
