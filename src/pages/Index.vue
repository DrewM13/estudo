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
              color="primary"
              text-color="white"
              label="Entrar"
              @click="send()"

            /></div>
            <div class="row justify-center">
            <q-btn
              color="primary"
              text-color="white"
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

            />
            <q-input
              filled
              type="email"
              v-model="newUser.email"
              label="Email"

            />
            <q-input
              filled
              v-model="currentUser.password"
              label="Senha"
              :type="isPwd ? 'password' : 'text'">

              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Cadastrar"
              @click="submit()"

            /><div>
            <q-btn color="primary"  label="Voltar" @click="back()" />
            </div>
            <!-- {{ newUser }}-->
          </div>
        </div>
        <div v-if="pagina === 2">
          <div class="column">
            <div>
              <q-input v-model="ToDo.name" label="Digite o afazer" outlined />
            </div>
            <div>
              <q-input
                v-model="ToDo.text"
                label="Digite a descrição do afazer"
                autogrow
                outlined
              />
              <div>
                <q-input outlined v-model="ToDo.token" type="text" label="Token" autogrow />
              </div>
              {{logindt.token}}
            </div>
            <div>
              <q-btn label="Enviar tarefa" color="primary" text-color="white" @click="sendToDo()"></q-btn>
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
        name: "",
        text: "",
        token: ""
      },
      Delete:{
        name:"",
        password:"",
        email:"",
        todo:"",
        description:""
      },
      Update:{
        name:"",
        password:"",
        email:"",
        todo:"",
        description:""
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
          alert(`Usuário já cadastrado ou erro ao criar o usuário \n ${error}`);
        });
    },
    send() {
      axios.post(
          "https://web.voxdatati.com.br:4443/api/authenticate",
          this.currentUser
        )
        .then((res) => {
          this.logindt = res.data;
          this.pagina = 2;
        })
        .catch((error) => {
          console.log(error);
          alert(`Login não encontrado!\n${error}`);
        })
    },
    sendToDo() {

        axios.post("https://web.voxdatati.com.br:4443/api/todo", this.ToDo)
        .then((res) => {

          console.log(res)
          alert("Tarefa criada com sucesso.")

          })



          .catch((error)=>{
            console.log(error)
            alert(`Erro ao criar tarefa.\n${error}`)
          })

    },
    back(){
      this.pagina=0
    }
  }
};



</script>
