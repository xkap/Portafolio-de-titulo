<template>
  <div class="row justify-around">
    <q-card class="my-card q-py-xs"
    v-for="table in busy_tables"
    :key="table.table_num">

      <q-card-section style="padding:0 0 0 0">
          
            <div class="text-center text-weight-bold">Mesa  {{ table.id }}</div>
         
         </q-card-section>
         <q-separator />

         <q-card-section style="padding:0 0 0 0">

          <div class="text-center" style="padding:0">
            <div class="text-subtitle2">Atiende: </div>
            <div class="text-subtitle3">{{table.waiter}}</div>
         </div>
          </q-card-section>
        <q-separator class="max-width" />
        <q-card-section style="padding:0 0 0 0">
         <div class="text-center">
        <div class="text-subtitle2">Cliente:</div>
        <div class="text-subtitle3">{{table.customer.name}}</div>
         </div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-btn flat color="red" @click="freeTable(table)"> Liberar</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'BusyTableCard',
  props: {
    busy_tables: {}
  },
  methods: {
    freeTable(table){
      this.$emit('freeThisTable',table)
    }
  }
}


</script>
