<template>
  <v-table height="300px">
    <thead>
      <tr>
        <!-- <th class="text-left">Data de nascimento</th> -->
        <th class="text-left">Nome</th>
        <th class="text-left">CPF</th>
        <th class="text-left">Espécie do pet</th>
        <th class="text-left">Raça do pet</th>
        <th class="text-left">Outro</th>
        <th class="text-left">Renda Mensal</th>
        <th class="text-left">CEP</th>
        <th class="text-left">Endereço</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in listUser" :key="item.name">
        <!-- <td class="text-left">{{ item.date | date}}</td> -->
        <td class="text-left">{{ item.name }}</td>
        <td class="text-left">{{ item.cpf }}</td>
        <td class="text-left">{{ item.species }}</td>
        <td class="text-left">{{ item.breed }}</td>
        <td class="text-left">{{ item.other }}</td>
        <td class="text-left">{{ item.monthlyIncome }}</td>
        <td class="text-left">{{ item.cep }}</td>
        <td class="text-left">{{ item.address }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { UserModel } from "../../shared/models/user.model";
import api from "../../services/api"
import { onMounted, ref } from "vue";

const listUser: UserModel[] | any = ref([]);

const getAll = async () => api.httpJson
  .get("/user-list")
  .then((resp: any) => {
    listUser.value = resp
    return listUser;
  })

onMounted(getAll)
</script>

<style></style>
