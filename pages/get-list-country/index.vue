<template>
  <section class="get-list-container w-full grid justify-items-center">
    <h3 class="text-h3 m-4 text-blue-600">Selecione um país na lista abaixo</h3>
    <h4 class="text-h4 m-4 text-blue-600">Ou faça uma busca por países ou um país em questão</h4>
    <div class="fields-content grid w-2/6">
      <v-card-text class="">
        <v-card-title>Busca por Idioma:</v-card-title>
        <v-select label="Selecione um idioma" v-model="language" :ref="language" item-title="title" item-value="lang"
          :items="[{ title: '', lang: '' }, { title: 'Português', lang: 'portuguese' }, { title: 'Inglês', lang: 'english' }, { title: 'Espanhol', lang: 'spanish' }, { title: 'Francês', lang: 'french' },]"></v-select>
        <v-btn variant="tonal" color="blue-darken-2" @click="searchByLanguage"> Pesquisar </v-btn>
      </v-card-text>
      <v-divider class="border-opacity-100"></v-divider>
      <v-card-text>
        <v-card-title>Busca por Nome:</v-card-title>
        <v-text-field density="compact" variant="solo" label="Digite o nome de um País" append-inner-icon="mdi-magnify"
          single-line hide-details @click:append-inner="searchByName" v-model="countryName"
          :ref="countryName"></v-text-field>
      </v-card-text>
    </div>
    <v-container class="flex flex-wrap justify-center">
      <v-card class="m-4 w-2/6" variant="outlined" v-for="(item, i) in country" :key="i">
        <v-card-title>País: {{ item.name.common }}</v-card-title>
        <v-card-title>Capítal: {{ item.capital[0] }}</v-card-title>
        <v-btn variant="tonal" color="blue-darken-2" @click="setLatLong(item.capitalInfo)">
          Ver no mapa
        </v-btn>
      </v-card>
    </v-container>
    <div v-if="isVisible == true" :ref="isVisible" class="w-9/12">
      <div :ref="locationCountry" class="w-full">
        <iframe width="100%" height="250" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="'https://maps.google.com/maps?q=' +
          locationCountry.latlng[0] +
          ',' +
          locationCountry.latlng[1] +
          '&hl=en&z=3&amp;output=embed'
          ">
        </iframe>
      </div>
    </div>
    <NuxtLink to="/">
      <v-btn class="m-8" variant="tonal" color="red-darken-2"> Voltar </v-btn>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../services/api";

const country = ref<any>([]);
const locationCountry = ref({ latlng: [] });
const isVisible = ref<boolean>();
const language = ref<string>("");
const countryName = ref<string>("")

const getAll = async () =>
  api.http.get("/subregion/america").then((resp) => {
    country.value = resp.data;
    return country;
  });

const setLatLong = (data: any) => {
  locationCountry.value.latlng = data.latlng;
  isVisible.value = true;
  setTimeout(() => {
    window.scroll({
      top: 5000,
      behavior: "smooth",
    });
  }, 500)
  return locationCountry && isVisible;
};

const searchByLanguage = () => {
  if (language.value) {
    api.http.get(`/lang/${language.value}`).then((resp) => {
      country.value = resp.data;
      return country
    })
  } else {
    getAll();
  }
}
const searchByName = () => {
  if (countryName.value) {
    api.http.get(`/name/${countryName.value}`).then((resp) => {
      country.value = resp.data;
      return country
    })
  } else {
    getAll();
  }
}

onMounted(() => {
  getAll();
});
</script>

<style></style>
