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
            />
          </div>
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
            <q-input filled v-model="newUser.name" label="Nome" />
            <q-input
              filled
              type="email"
              v-model="newUser.email"
              label="Email"
            />
            <q-input
              filled
              v-model="newUser.password"
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
            <q-btn color="primary" label="Cadastrar" @click="submit()" />
            <div>
              <q-btn color="primary" label="Voltar" @click="back()" />
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
            </div>
            <div>
              <q-btn
                label="Enviar tarefa"
                color="primary"
                text-color="white"
                @click="sendToDo()"
              ></q-btn>
            </div>
            <div>
              <q-btn
                color="primary"
                label="Verificar Afazeres"
                @click="ToDoCreated()"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="pagina === 3" class="q-mt-xl q-pa-md">
        <q-table
          title="Lista de afazeres"
          :data="todoList"
          :columns="columns"
          row-key="name"
        />
        {{ this.todoList }}
        <div>
          <q-input
            type="number"
            v-model="idTodo"
            label="Digite o Id do item a ser excluído"
          />
          <q-btn color="primary" label="Deletar dado" @click="deleteData()" />
        </div>
        <div>
          <q-input
            filled
            v-model="this.todoList.name"
            label="Digite o novo nome da tarefa"
          />
          <q-input
            v-model="this.todoList.text"
            type="text"
            label="Digite a nova descrição da tarefa"
            autogrow
          />
          <q-input type="number" label="Digite o Id do item a ser atualizado" />
          <q-btn color="primary" label="Atualizar dado" @click="updateData()" />
        </div>
        <div>
          <q-btn color="primary" label="Voltar" @click="backTable()" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";
const api = axios.create({
  baseURL: "https://web.voxdatati.com.br:4443/api/"
});
export default {
  data() {
    return {
      logindt: null,
      todoList: null,
      idTodo: null,
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
        id: "",
        name: "",
        text: ""
      },
      Delete: {
        id: ""
      },
      Update: {
        id: ""
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "Id",
          align: "left",
          field: "id",
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Afazer",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "text",
          required: true,
          label: "Descrição do afazer",
          align: "center",
          field: "text",
          sortable: true
        }
      ]
    };
  },
  created() {
    this.datalogin();
  },
  methods: {
    datalogin() {
      api.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${this.logindt?.token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },

    submit() {
      api
        .post("users", this.newUser)
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
      api
        .post("authenticate", this.currentUser)
        .then((res) => {
          this.logindt = res.data;
          this.pagina = 2;
        })
        .catch((error) => {
          console.log(error);
          alert(`Login não encontrado!\n${error}`);
        });
    },
    sendToDo() {
      api
        .post("todo", this.ToDo)
        .then((res) => {
          console.log(res);
          alert("Tarefa criada com sucesso.");
        })

        .catch((error) => {
          console.log(error);
          alert(`Erro ao criar tarefa.\n${error}`);
        });
    },
    back() {
      this.pagina = 0;
    },
    ToDoCreated() {
      api
        .get("todo")
        .then((res) => {
          this.todoList = res.data;
          this.pagina = 3;
        })
        .catch((error) => {
          alert(`Erro ao acessar lista.\n${error}`);
        });
    },
    backTable() {
      this.pagina = 2;
    },
    deleteData() {
      api
        .delete(`todo/${this.idTodo}`)
        .then((res) => {
          this.ToDoCreated();
        })
        .catch((error) => {
          alert(`Erro ao deletar item \n${error}`);
        });
    },
    updateData() {
      api
        .put(`todo/${this.idTodo}`)
        .then((res) => {
          alert(`Item ${this.idTodo} atualizado com sucesso.`);
        })
        .catch((error) => {
          alert(`Erro ao atualizar tarefa. \n${error}`);
        });
    }
  }
};
</script>
