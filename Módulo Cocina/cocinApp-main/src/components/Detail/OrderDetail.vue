<template>
  <q-drawer v-model="rightDraw" side="right"
            no-swipe-open overlay
            elevated behavior="mobile"

  >
    <!-- drawer content -->
    <DishDetail :key="dish.id" v-for="dish in dishes"/>
  </q-drawer>

</template>

<script>
import DishDetail from "components/Detail/DishDetail";
export default {
name: "OrderDetail",
  data() {
    return{
      right: false
    }
  },
  components:{DishDetail},
  props: { dishes:{} }
}
</script>

<style scoped>

</style>
