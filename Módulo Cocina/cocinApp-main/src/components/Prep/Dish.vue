<template>

<q-card @click="prepared" class="prepcard" >

  <q-card-section>
    {{ this.dish.MenuItem.name}}
  </q-card-section>
  <q-separator></q-separator>
  <q-card-section>
    Cantidad: {{ this.dish.quantity}}
  </q-card-section>
</q-card>

</template>

<script>
export default {
  name: "Dish",
  created() {
    this.isClicked=false
  },
  props: { dishNumber:{},dish:{} },
  methods:{
    data(){
      return{
        isClicked:false,

      }
    },
    prepared(){
      this.isClicked = true
      this.$emit('isPrepared',this.dish.MenuItem)
    }
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
