<template>
  <div class="row justify-around">
    <q-card class="my-card q-py-xs"
    v-for="table in tables"
    :key="table.id"
    >
      <q-card-section >
        <div class="text-center text-h6">Mesa {{ table.id }}</div>
        <div class="text-subtitle2 text-center">{{ table.capacity }} personas</div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-btn flat @click="asign(table)"> Asignar</q-btn>
      </q-card-actions>
      
    </q-card>
    
    
  </div>

</template>
<script>

export default {
  name: 'TableCard',
  props: {
    tables: {}
  },
  
  methods: {
    asign(table){
      this.$emit('asignThisTable',table)

    },
    data () {
    return {

    }
  },
  },
  created(){
    
  }
}
</script>