<template>
  <section class="get-list-container w-full grid justify-items-center">
    <h3 class="text-h3 m-4 text-blue-600">
      Selecione uma região na lista abaixo
    </h3>

    <div class="fields-content grid w-2/6">
      <v-card-text class="">
        <v-card-title>Busca por Região:</v-card-title>
        <v-select label="Selecione uma região" v-model="region" item-title="title" item-value="region" :items="[
          { title: '', region: '' },
          { title: 'África', region: 'africa' },
          { title: 'América', region: 'america' },
          { title: 'Ásia', region: 'asia' },
          { title: 'Europa', region: 'europe' },
          { title: 'Oceania', region: 'oceania' },
        ]"></v-select>
        <v-btn variant="tonal" color="blue-darken-2" @click="searchByRegion">
          Pesquisar
        </v-btn>
      </v-card-text>

      <v-divider class="border-opacity-100"></v-divider>
    </div>

    <v-container class="flex flex-wrap justify-center">
      <template v-for="(item, i) in country" :key="i">
        <v-card class="m-4 w-2/6 shadow-xl shadow-blue-500/50" variant="outlined">
          <Chart type="bar" :data="chartData" :options="chartOptions" />
        </v-card>
      </template>
    </v-container>

    <NuxtLink to="/">
      <v-btn class="m-8" variant="tonal" color="red-darken-2"> Voltar </v-btn>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import api from "../../services/api";
import { ref, watch } from "vue";

const region = ref<string>("");
const country = ref<any>([]);
const setItem = ref<any>({ id: 0, label: '', area: 0, population: 0 });

const chartData = ref({
  labels: ["Area", "População"],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: ["rgba(255, 159, 64, 0.2)", "rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgb(255, 159, 64)", "rgb(75, 192, 192)"],
      borderWidth: 1,
    },
  ],
});

const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const searchByRegion = () => {
  api.http.get(`/region/${region.value}`).then((resp: any) => {
    country.value = resp.data;
  });
};

watch(setItem, (newValue) => {
  chartData.value.datasets[0].label = newValue.translations.por.official;
  chartData.value.datasets[0].data.push(newValue.area as never);
  chartData.value.datasets[0].data.push(newValue.population as never);
})
</script>

<style></style>
