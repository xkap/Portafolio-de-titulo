<template>

  <q-card class="my-card">
    <img :src="this.image">

    <q-card-section>
      <div class="text-h6">{{ this.dish.MenuItem.name }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ this.dish.MenuItem.description }}
    </q-card-section>
  </q-card>

</template>

<script>
import axios from "axios";

export default {
  name: "Dish",
  props: { dishNumber:{},dish:{} },
  data() {
    return { image:{}}
  },
  created() {
    this.image='http://localhost:8082/menu/images/'+this.dish.menuItemId

  }
}
</script>

<style scoped>
.prepcard
{
  min-height: 100px;
  min-width: 100px;
  max-height: 200px;
  max-width: 200px;
}
</style>
