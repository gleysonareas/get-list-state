<template>
  <v-form v-model="valid">
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
            <v-text-field
              v-model="state.species"
              label="Espécie"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="state.breed"
              label="Raça"
              hide-details
              required
            ></v-text-field>
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

        <v-row v-if="isVisibleField" class="p-4">
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
        <v-btn variant="tonal" color="indigo-darken-3" @click="submitForm">
          Salvar
        </v-btn>
      </NuxtLink>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import api from "../../services/api";
import { UserModel } from "../../shared/models/user.model";
import { computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  between,
} from "@vuelidate/validators";
import { cpf } from "cpf-cnpj-validator";

const valid: boolean = false;
let isVisibleField = false;

let userForm: UserModel = {
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
};

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
      number: { required },
    },
  };
});

const v$ = useVuelidate(rules, state);

function setVisibleField() {
  if (isVisibleField == false) return (isVisibleField = true);
  if (isVisibleField == true) return (isVisibleField = false);
}

function submitForm() {
  api.httpJson.post("/user-list", userForm);
}
</script>

<style></style>
