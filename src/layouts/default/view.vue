<template>
  <v-main>
    <div class="container-app w-full h-full">
      <section class="header flex justify-center bg-[#020617] text-white">
        <header>
          <h1>Get List State</h1>
        </header>
      </section>

      <section class="content">
        <router-view />
      </section>

      <section
        class="footer flex justify-center bg-[#020617] text-white fixed w-full bottom-0"
      >
        <footer>
          <p>Desenvolvido por Gleyson Areas da Silva</p>
        </footer>
      </section>
    </div>
  </v-main>
</template>
