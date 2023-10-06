<template>
  <v-form v-model="valid" @submit.prevent="submitForm" :ref="valid">
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
              required
              hide-details
              v-mask="'##/##/####'"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="state.name"
              label="Nome Completo"
              hide-details
              required
              @change="v$.name.$invalid"
            ></v-text-field>
            <span v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</span>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.cpf"
              label="CPF"
              hide-details
              required
              v-mask="'###.###.###-##'"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="state.monthlyIncome"
              label="Renda Mensal"
              required
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="m-4" title="Dados do Pet:" variant="outlined">
        <v-row class="p-4">
          <v-col cols="12" md="4">
            <v-select
              required
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
              required
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
              required
              hide-details
              v-mask="'#####-###'"
              @blur="searchCep"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.address.road"
              label="Rua"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="state.address.number"
              label="Número"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.address.subdivision"
              label="Loteamento"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.address.neighborhood"
              label="Bairro"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.address.city"
              label="Cidade"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="state.address.estate"
              label="Estado"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="m-4" title="Outras informações:" variant="outlined">
        <v-switch
          label="Selecione para adicionar mais dados"
          @click="setVisibleField()"
        ></v-switch>

        <v-row v-if="isVisibleField" class="p-4" :ref="isVisibleField">
          <v-col>
            <v-textarea
              v-model="state.other"
              label="Outros"
              hide-details
              required
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-container class="flex justify-center gap-4 mb-8">
      <NuxtLink to="/">
        <v-btn variant="tonal" color="red-darken-2"> Cancelar </v-btn>
      </NuxtLink>
      <NuxtLink to="/">
        <v-btn type="submit" variant="tonal" color="indigo-darken-3">
          Salvar
        </v-btn>
      </NuxtLink>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import api from "../../services/api";
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  between,
  numeric,
} from "@vuelidate/validators";
import { cpf } from "cpf-cnpj-validator";

const valid = ref<boolean>(false);
const isVisibleField = ref<boolean>(false);
const isVisibleCalendar = ref<boolean>(false);

const state = reactive({
  date: "",
  name: "",
  cpf: "",
  species: "",
  breed: "",
  other: "",
  monthlyIncome: "",
  address: {
    cep: "",
    road: "",
    subdivision: "",
    neighborhood: "",
    city: "",
    estate: "",
    number: "",
  },
});

const rules = computed(() => {
  return {
    date: { required },
    name: { required, minLength: minLength(4) },
    cpf: { required },
    species: { required },
    breed: { required },
    other: { required },
    monthlyIncome: { required },
    address: {
      cep: { required },
      road: { required },
      subdivision: { required },
      neighborhood: { required },
      city: { required },
      estate: { required },
      number: { required, numeric },
    },
  };
});

const v$ = useVuelidate(rules, state);

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
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function submitForm() {
  api.httpJson.post("/user-list", state);
}
</script>

<style></style>
