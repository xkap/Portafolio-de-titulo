<template>
<q-card class="tableorder ">
  <q-card-section>
    <div class="headline text-h4 text-center">
      Mesa:{{this.order.tableId}}
    </div>
  </q-card-section>

  <div class="headline text-h6 text-center">
    Platos:{{this.order.dishes.length}}
  </div>
  <q-separator/>
  <q-card-section>
  <div class="row" >


      <q-btn class="" @click="startCooking" > Cocinar</q-btn>


  <q-btn @click="getDetails">Detalle</q-btn>

  </div>
  </q-card-section>
</q-card>
</template>

<script>
import OrderDetail from "components/Detail/OrderDetail";
export default {
  name: "TableOrder",
  methods: {
    getDetails() {

      this.$emit('get-details',this.order)
    },
    startCooking() {

      this.$emit('start-cooking',this.order)
    }
  },
  props:{
    order:{}
  }
}
</script>

<style scoped>
.tableorder

{
  margin-top: 20px;
  margin-left: 10px;
  min-height: 100px;
  min-width: 150px;
  max-width: 300px;
  max-height: 200px;
}
</style>
