<template>
  <v-form
    v-model="valid"
    @submit.prevent="submitForm"
    :ref="valid"
    v-slot="{ errors }"
  >
    <v-container>
      <div class="title-content">
        <h4 class="text-h4 m-4">Novo Dado:</h4>
      </div>
      <v-card class="m-4" title="Dados pessoais:" variant="outlined">
        <v-row class="p-4">
          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.date"
              label="Data de Nascimento"
              hide-details
              v-mask="'##/##/####'"
              :rules="['required']"
            ></v-text-field>
            <!-- <v-locale-provider locale="pt">
              <v-date-picker
                header="Selecione"
                title="Data de Nascimento"
                :rules="['required']"
                v-model="state.date"
              ></v-date-picker>
            </v-locale-provider> -->
            <span>{{ errors[0] }}</span>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="state.name"
              label="Nome Completo"
              hide-details
              :rules="['required|minLength:10']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.cpf"
              label="CPF"
              hide-details
              v-mask="'###.###.###-##'"
              :rules="['required']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="state.monthlyIncome"
              label="Renda Mensal"
              hide-details
              :rules="['required']"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="m-4" title="Dados do Pet:" variant="outlined">
        <v-row class="p-4">
          <v-col cols="12" md="4">
            <v-select
              :rules="['required']"
              label="Espécie"
              v-model="state.species"
              :ref="state.species"
              item-title="title"
              item-value="value"
              :items="[
                { title: '', lang: '' },
                { title: 'Cachorro', value: 'dog' },
                { title: 'Gato', lang: 'cat' },
                { title: 'Outros', lang: 'others' },
              ]"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              :rules="['required']"
              label="Raça"
              v-model="state.breed"
              :ref="state.breed"
              item-title="title"
              item-value="title"
              :items="[
                { title: '' },
                { title: 'Poodle' },
                { title: 'Pinscher' },
                { title: 'Labrador' },
                { title: 'Vira-latas' },
                { title: 'Persa' },
                { title: 'Siamês' },
                { title: 'Outro' },
              ]"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="m-4" title="Endereço:" variant="outlined">
        <v-row class="p-4">
          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.address.cep"
              label="CEP"
              hide-details
              v-mask="'#####-###'"
              @blur="searchCep"
              :rules="['required']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.address.road"
              label="Rua"
              hide-details
              :rules="['required']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="state.address.number"
              label="Número"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.address.subdivision"
              label="Loteamento"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.address.neighborhood"
              label="Bairro"
              hide-details
              :rules="['required']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.address.city"
              label="Cidade"
              hide-details
              :rules="['required']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="state.address.estate"
              label="Estado"
              hide-details
              :rules="['required']"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="m-4" title="Outras informações:" variant="outlined">
        <v-switch
          class="pl-3"
          label="Selecione para adicionar mais dados"
          @click="setVisibleField()"
        ></v-switch>

        <v-row v-if="isVisibleField" class="p-4">
          <v-col>
            <v-textarea
              v-model="state.other"
              label="Outros"
              hide-details
              :rules="['required']"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-container class="flex justify-center gap-4 mb-8">
      <v-btn variant="tonal" color="red-darken-2">
        <NuxtLink to="/"> Cancelar </NuxtLink>
      </v-btn>
      <v-btn type="submit" variant="tonal" color="indigo-darken-3">
        <NuxtLink to="/"> Salvar </NuxtLink>
      </v-btn>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import api from "../../services/api";
import { reactive, ref } from "vue";
import { UserModel } from "../../shared/models/user.model";
import { AddressModel } from "../../shared/models/address.model";
import { v4 } from "uuid";

const valid = ref<boolean>(false);
const isVisibleField = ref<boolean>(false);

const state = reactive(<UserModel>{ address: <AddressModel>{} });

function setVisibleField() {
  if (isVisibleField.value == false) return (isVisibleField.value = true);
  if (isVisibleField.value == true) return (isVisibleField.value = false);
}

function searchCep() {
  api.request
    .get("https://viacep.com.br/ws/" + state.address.cep + "/json/")
    .then((response) => {
      if (response.data.erro == true) {
        alert("Cidade não encontrada");
      } else {
        state.address.road = response.data.logradouro;
        state.address.neighborhood = response.data.bairro;
        state.address.city = response.data.localidade;
        state.address.estate = response.data.uf;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function submitForm() {
  debugger;
  state.id = v4();
  api.httpJson.post("/user-list", state).then((resp) => {
    console.log(resp);
  });
  console.log(state);
}
</script>

<style></style>
