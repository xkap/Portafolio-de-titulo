<template>
  <div
    class="row">
    <template>
      <q-drawer v-model="rightDrawer" side="right"
                no-swipe-open overlay
                elevated behavior="mobile"


      >
        <!-- drawer content -->
        <DishDetail :dish="dish" v-for="dish in this.currentOrder.dishes" :key="dish.id"/>
      </q-drawer>

    </template>


    <TableOrder @start-cooking="startCooking" @get-details="getDetails" :order="order" v-for="order in tableOrders" :key="order.id"/>
  </div>
</template>

<script>
import TableOrder from "components/Queue/TableOrder";
import DishDetail from "components/Detail/DishDetail";
export default {
name: "OrderQueue",
  components: {TableOrder,DishDetail},
  props: {
    tableOrders:{},
    dishes:{},
  },
  data() {
  return { rightDrawer:false,currentOrder:{} }
  },
  methods: {
    getDetails(order) {
      this.currentOrder = order
      this.rightDrawer = true

    },
    startCooking(order){
      console.log("starting cooking")
      this.$emit("load-dishes",order)

    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>
