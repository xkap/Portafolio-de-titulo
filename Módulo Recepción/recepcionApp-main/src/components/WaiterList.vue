<template>
    <q-table
        class="my-sticky-header-table"
        :data="waiters"
        :columns="columns"
        row-key="id"
        flat
        :selected.sync="selection"
        bordered
        hide-bottom
        @row-click="onRowClick"
      />
</template>
<script>
export default {
  props: ['addTableTo','removeTableFrom'],
  props:{
    waiters:{}
  },
  watch:{
    'addTableTo' : function() {
      this.addTable()
    }
  },
  name: 'WaiterList',
  methods: {
    onRowClick (evt, row) {
      this.clickedOn=true
      this.selection = [row]
      this.$emit('readyToServe',this.selection[0])
      
    },
    addTable(){
      console.log("aumentando")
      //TODO: ESTO ESTÁ HORRIBLE, HAY QUE MANEJARLO POR OBJETO Y NO STRING
      for (var i = 0; i < this.data.length; i++) {
        console.log("comparando: "+this.data[i].name+" con "+ this.addTableTo)
        if(this.data[i].name==this.addTableTo){
          console.log("agregando mesa a " + this.data[i].name)
          this.data[i].mesas++
          break;
         }

      }
    },
    removeTable(){
      console.log("reduciendo")
      //TODO: ESTO ESTÁ HORRIBLE, HAY QUE MANEJARLO POR OBJETO Y NO STRING
      for (var i = 0; i < this.data.length; i++) {

        if(this.data[i].name==this.removeTableFrom){
          console.log("quitando mesa a " + this.data[i].name)
          this.data[i].mesas--
          break;
         }

      }
      this.removeTableFrom=''
    }
  },
  data () {
    return {
      selection: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name +' '+row.lastName,
          format: val => `${val}`,
        }
      ],
      clickedOn:false,

    }
  }
}
</script>

<style lang="scss" scoped>
  tr { cursor:pointer;
    &.selected {
      color:#fff;
    }
  }
  </style>

  <style lang="sass" scoped>
    .my-sticky-header-table
        /* height or max-height is important */
        height: 310px

        .q-table__top,
        .q-table__bottom,
        thead tr:first-child th
          /* bg color is important for th; just specify one */
          background-color: #c1f4cd

        thead tr th
          position: sticky
          z-index: 1
        thead tr:first-child th
          top: 0


        /* this is when the loading indicator appears */
        &.q-table--loading thead tr:last-child th
          /* height of all previous header rows */
          top: 48px
  </style>
