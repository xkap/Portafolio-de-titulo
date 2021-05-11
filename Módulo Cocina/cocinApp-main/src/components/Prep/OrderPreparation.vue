<template>
  <div class="atencion row text-center bg-grey-3" >

    <div class="col-2 text-center">
      <div class="row text-h5 mesa justify-center ">
      Mesa {{ this.order.tableId }}
      </div>

      <div class=" text-h5 row mesa justify-center">

        <div class="" v-text="hours"/>
          h
        <div class="" v-text="minutes"/>
          m
       <div class="" v-text="seconds"/>
        s
      </div>
    </div>
    <div class="col">
      <div class="row justify-xl-start">
      <dish @isPrepared="prepared" :dish="dish" v-for="dish in this.order.dishes" :key="dish.id"/>
      </div>
    </div>
  </div>


</template>

<script>
import Dish from "components/Prep/Dish";
import { date } from 'quasar'
export default {
  data() {
    return {
      bgColor:"red",
      hours: 0,
      minutes: 0,
      seconds: 0,
      waitingTime:0,
    };
  },
name: "OrderPreparation",
  components: {Dish},
  props:{order:{}},
  methods:{
    prepared(myDish){
      this.order.dishes.forEach(dish => {
        if( dish.MenuItem.id==myDish.id){
          console.log("encontrado")
          this.order.dishes.splice(this.order.dishes.indexOf(dish),1)
          if(this.order.dishes.length==0){
            console.log("seacabo")
            this.$emit('mesa-servida',this.order)
          }
        }
      })

    },
    updateDateTime() {
      let auxTime;
      this.waitingTime+=1
      auxTime = this.waitingTime
      this.hours = Math.floor( auxTime / 3600);
      auxTime  -= this.hours * 3600;

// calculate (and subtract) whole minutes
      this.minutes = Math.floor( auxTime / 60) % 60;
      auxTime -= this.minutes * 60;

// what's left is seconds
      this.seconds =  Math.floor(auxTime) ;  // in theory the modulus is not required

      this.$options.timer = window.setTimeout(this.updateDateTime,1000);
    },
  },
  mounted() {
    const now = new Date();
    const createdTime = new Date(this.order.createdAt);
    this.waitingTime = Math.abs(now - createdTime) / 1000;
    this.$options.timer = window.setTimeout(this.updateDateTime,1000);
  }
}
</script>

<style scoped>
.mesa
{
  max-width: 30vh;
}
.atencion{
  margin-bottom: 15px;

}

</style>
