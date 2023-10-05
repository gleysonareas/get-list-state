<template>
  <section class="get-list-container w-full grid justify-items-center">
    <h3 class="text-h3 m-4 text-blue-600">
      Selecione um país na lista abaixo
    </h3>
    <h5 class="text-h5 m-4 text-blue-600">
      Basta digitar e realizaremos uma busca para você!
    </h5>
    <div class="get-list-content w-96">
      <v-autocomplete item-children="" label="Faça sua Consulta clicando aqui" item-title="name.common" :items="country">
      </v-autocomplete>
    </div>
    <NuxtLink to="/">
      <v-btn variant="tonal" color="red-darken-2"> Voltar </v-btn>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../services/api"

const country = ref([])

const getAll = async () => api.http
  .get("/subregion/america")
  .then((resp) => {
    country.value = resp.data
    return country;
  })

onMounted(getAll)
</script>

<style></style>
