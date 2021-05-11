<template>

  <div class="q-pa-md doc-container">
    <div class="text-center row justify-around banner-row">
      <q-banner rounded class="banner-tables bg-blue-5 text-white">
      Mesas Libres
      </q-banner>

      <q-banner rounded class="banner-waiters bg-cyan-5 text-white">
      Meseros
      </q-banner>

      <q-banner rounded class="banner-busy bg-red-5 text-white">
      Mesas Ocupadas
      </q-banner>
    </div>

    <div class="row justify-around">

      <div class="mydiv col-3 bg-grey-4">
        <TableCard :tables="free_tables" @asignThisTable="asignTable($event)"
        />
      </div>

      <div class="mydiv col-3 bg-grey-4">
        <WaiterList :waiters="waiters" :addTableTo="addTableTo" :removeTableFrom="removeTableFrom" @readyToServe="serveTable($event)"/>
      </div>

      <div class="mydiv col-3 bg-grey-4">
        <BusyTableCard :busy_tables="busy_tables" @freeThisTable="unasign($event)"
        />
     </div>

    </div>

     <div class="row reservation-div justify-around">
      <ReservationCard :reservations="reservations"/>
      </div>

        <q-dialog ref="dialog" v-model="dialog" persistent
        @keyup.enter="onOkButtonClick"
        @keyup.esc="onCancelButtonClick">
      <q-card>
        <q-card-section>
          <div class="text-center inputNumber">
          <q-btn  @keyup.esc="onCancelButtonClick" @keyup.enter="onOkButtonClick" class="number" v-for="n in numbers" :key=n color="primary" @click="inputNumber(n)" >
            {{n}}

          </q-btn>
          <q-btn  @keyup.esc="onCancelButtonClick" class="number" color="primary" @click="inputClientId=0" label="BORRAR"/>
          <q-btn  @keyup.esc="onCancelButtonClick" @keyup.enter="onOkButtonClick" class="number"  color="primary" @click="inputNumber(0)" :label="0"/>
          <q-btn  @keyup.esc="onCancelButtonClick" @keyup.enter="onOkButtonClick" class="number" color="primary" @click="onOkButtonClick" label="ACEPTAR"/>
          </div>
        </q-card-section>


        <q-card-section class="q-pt-none">
          <q-input dense placeholder="0"
          v-model="inputClientId"
          autofocus
          @keyup.enter="onOkButtonClick"
          @keyup.esc="onCancelButtonClick"
          mask="#####"
          input-class="text-center" />
        </q-card-section>
      </q-card>
    </q-dialog>

    </div>

</template>
<script>
import TableCard from 'components/TableCard.vue'
import WaiterList from 'components/WaiterList.vue'
import BusyTableCard from 'components/BusyTableCard.vue'
import ReservationTableCard from 'components/ReservationCard.vue'
import axios from 'axios'
import ReservationCard from '../components/ReservationCard.vue'
import io from 'socket.io-client';

//TODO: comunicarse con el hermano
export default {
  name: 'MainPage',
  components: {
    TableCard,
    WaiterList,
    BusyTableCard,
    ReservationCard

  },
  data(){
    return {
      numbers: [1,2,3,4,5,6,7,8,9],
      socket: io("http://localhost:3001"),
      resolve: null,
      customer: {},
      customers: [],
      inputClientId: 0,
      dialog: false,
      position: 'center',
      tables:[],
      waiters:[],
      free_tables:[],
      busy_tables:[],
      reservations:[],
      waiter:"",
      waiterSelected:false,
      tableSelected:{},
      removeTableFrom:"",
      addTableTo:"",
    }
  },
  created( ){
    //TODO: refractor this to handle each responses
    //and/or handling promises manually
    axios.all([
      axios.get('http://localhost:8081/admin/tables/',{ crossDomain: true }),
      axios.get('http://localhost:8081/admin/waiters/',{ crossDomain: true }),
      axios.get('http://localhost:8082/reservations/today/',{ crossDomain: true }),
      axios.get('http://localhost:8081/admin/customers/',{ crossDomain: true })

    ]).catch(error => {
        console.log(error)
      })
    .then(axios.spread((tableRes, waiterRes,resRes, customersRes) => {
        this.tables = tableRes.data.tables,
        this.waiters = waiterRes.data,
        this.reservations = resRes.data,
        this.customers = customersRes.data.customers
        var curCustomer = { name: "No ID", id:0}
                console.log(resRes.data)

        console.log(this.reservations)

        this.tables.forEach(table => {

          if(table.waiterId === null){
            this.free_tables.push(table)
          } else{
           this.waiters.forEach(waiter => {
             if(waiter.id === table.waiterId){
              table.waiter = waiter.name
             }
           })
           this.customers.forEach(customer => {
             if(customer.id === table.customerId){
              curCustomer = customer
             }
           })
            table.customer = curCustomer
            this.busy_tables.push(table)
          }
        })
    }))
  },
   mounted() {
      this.socket.on('newReservation', async (data) => {
       console.log("changing reservations")
       let res = await axios.get('http://localhost:8082/reservations/today/',{ crossDomain: true })
       this.reservations = res.data
      });
    },
  methods: {
        inputNumber(n) {
          if(this.inputClientId!=0)
          {this.inputClientId = this.inputClientId + n}
          else{this.inputClientId = n }
        },
        async showing() {
          this.dialog = true
          return new Promise(resolve => {
            this.resolve = resolve
            this.dialog = true
         })
        },

        async onOkButtonClick() {
          if(this.inputClientId==0)
          {
            this.customer =
              {
                name: "No ID",
                id:null
              }
              this.resolve && this.resolve('ok')
          this.dialog = false
          } else {


          let res = await axios.get('http://localhost:8081/admin/customers/'+this.inputClientId,{ crossDomain: true })
          this.customer = res.data.customer[0]
          this.inputClientId = 0
          this.resolve && this.resolve('ok')
          this.dialog = false
          }

        },

        onCancelButtonClick() {
          this.dialog = false
          this.resolve && this.resolve('cancel')
          this.inputClientId = 0
        },

        async asignTable(table, reservation) {
          if(this.waiterSelected) {
            const confirmation = await this.showing()
            if(confirmation == 'cancel')
            {
              this.waiter=""
              this.waiterSelected=false
              this.tableSelected={}
              return false
            }
            if(confirmation =='ok')
            {
              var busyTable=
              {
                id:table.id,
                isReserved:reservation,
                waiter:this.waiter.name +" "+this.waiter.lastName,
                customer: this.customer
              }
              var updateTable=
              {
                customerId:this.customer.id,
                waiterId:this.waiter.id,

              }
              this.busy_tables.push(busyTable)

              for (var i = 0; i < this.tables.length; i++) {
                  if(this.free_tables[i]==table)
                  this.free_tables.splice(i,1)
              }

              axios
                .put('http://localhost:8081/admin/tables/'+busyTable.id,updateTable)
              this.addTableTo = this.waiter
              this.waiter=""
              this.waiterSelected=false
              this.tableSelected={}
           }

          }else{
              this.tableSelected = table;
          }

             },
           unasign(table) {
             this.removeTableFrom = this.waiter
             table.waiterId=null
             table.customerId=null
             this.free_tables.push(table)
             axios
              .put('http://localhost:8081/admin/tables/'+table.id,table)
             for (var i = 0; i < this.busy_tables.length; i++) {
               if(this.busy_tables[i]==table)
                this.busy_tables.splice(i,1)
             }

           },
           serveTable(waiter){
             this.waiter = waiter
             this.waiterSelected=true
             if(typeof this.tableSelected.id !== 'undefined' ){
               //console.log("asignando mesa "+this.tableSelected.id)
               this.asignTable(this.tableSelected)

             }else{
               //console.log("no hay tabla "+this.tableSelected.id)
             this.waiterSelected=true
             }
           },
         }
}


</script>
