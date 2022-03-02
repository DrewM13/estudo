<template>
<q-page class="flex flex-center">
<div class="q-card q-card--bordered">
 <div class="q-px-lg q-py-lg">
    <q-table

      title="Star Wars"
      :data="dataInfo"
      :columns="columns"
       row-key="name"
      selection="multiple"
      :selected.sync="selected"
    />
    </div>
</div>

<div class="q-mx-md">
  <q-btn color="indigo" text-color="white" @click="changeItem()" icon="swap_horiz" />
</div>
<div class=" q-card q-card--bordered">
<div class="q-px-lg q-py-lg">
<div>
 <q-table title="Informações selecionadas:"
        :data="dataSelect"
        :columns="columns"
        row-key="name"
        selection="multiple"
        :selected.sync="deselected"
        />
</div>
</div>
</div>
 </q-page>
</template>

<script>
import axios from "axios"
const Api=axios.create({
  baseURL: "https://swapi.dev/api/"
});
export default {
  data () {
    return {dataInfo:[],
      dataSelect:[],
       selected: [],
       deselected:[],
      columns: [
        {
          name: 'name',
          label: 'Nome',
          field: row => row.name,
        },
        { name: 'height',label: 'Altura', field: 'height'},
        {
          name:'birth_year',label:'Ano de nascimento', field:'birth_year'
        },
        {
          name:'eye_color',label:'Cor dos Olhos', field:'eye_color'
        },
        {name:'gender', label:'Gênero', field:'gender'}

      ]
    }
     },
     created(){
       this.addElement()
     },
  methods:{

    addElement(){
      Api
      .get("people/")
      .then((res) => {

          this.dataInfo = res.data.results

        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeItem(){


     this.selected.map((x) => {
        if (!this.dataSelect.includes(x)) {
          this.dataSelect.push(x);
        }

this.dataInfo = this.dataInfo.filter(x=>{
        return !this.selected.includes(x)
        })
          });

this.selected = []
           this.deselected.map((x) => {
              if (!this.dataInfo.includes(x)) {
                this.dataInfo.unshift(x);

              }
            });
  this.dataSelect = this.dataSelect.filter(x=>{
        return !this.deselected.includes(x)
        })

this.deselected=[]

    }
  }

}
</script>
