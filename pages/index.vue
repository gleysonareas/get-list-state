<template>
  <div class="container-home">
    <section class="home-content-header flex justify-between">
      <div class="title-content">
        <h4 class="text-h4 m-4 text-blue-600">Bem Vindo ao Get List State</h4>
      </div>
      <div class="menu-content">
        <NuxtLink to="/get-list-country">
          <v-btn variant="tonal" color="indigo-darken-3" class="m-4">
            Buscar País
          </v-btn>
        </NuxtLink>
        <NuxtLink to="/new-user">
          <v-btn variant="tonal" color="indigo-darken-3" class="m-4">
            Adicionar Novo
          </v-btn>
        </NuxtLink>
      </div>
    </section>
    <section class="home-content-list">
      <HomeList />
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
