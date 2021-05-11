<template>
  <q-layout view="hHh lpr fff">

    <q-header bordered class="bg-primary text-white">
      <q-bar dark class="bg-primary text-white">
        <q-btn dense flat round icon="lens" size="8.5px" color="red" />
        <q-btn dense flat round icon="lens" size="8.5px" color="yellow" />
        <q-btn dense flat round icon="lens" size="8.5px" color="green" />
        <div class="col text-center text-weight-bold">
          Pedidos a Cocina
        </div>
      </q-bar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      right: false
    }
  }
}
</script>
