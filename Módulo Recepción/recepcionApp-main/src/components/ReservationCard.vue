<template>
  <div class="row" style="max-width:5000px">
    <q-card style="width: 100px "
      v-for="reservation in reservations.reservations"
      :key="reservation.customerId"
    >       
       <q-card-section class="items-center no-wrap">
          <div>
             <div class="text-center">{{reservation.reservationTime}}</div>
             <div class="text-center">ID: {{reservation.userId}}</div>
            <div class="text-center">Nombre: </div>
            <div class="text-center">{{reservation.name}}</div>
            
           
          </div>
       </q-card-section>




    </q-card>
</div>

</template>


<script>



export default {
  name: 'ReservationCard',
  props: {
    reservations: {}
  },
  data () {
    return {
       seamless: false
    }
  },
  computed: {
    contentSize () {
      return this.moreContent ? 150 : 5
    }
  },
  methods: {
    asign(table){
      this.$emit('asignThisTable',table)

    }
  },
  created(){
  }
  
  }
</script>
