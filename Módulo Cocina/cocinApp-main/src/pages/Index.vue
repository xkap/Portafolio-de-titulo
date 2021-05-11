<template class="">
  <q-page class="flex">.

    <div
    class="col bg-dark">

      <div
      class="orderprep" v-if="dataFetched">
        <!-- Right drawer that display all the orders from the selected table order-->
        <OrderPreparation @mesa-servida="served" :key="order.id" v-for="order in prepOrders" :order="order"/>
      </div>
      <div  class="text-center ver" v-if="!dataFetched">
        <h4  style="color: aliceblue">Esperando ordenes</h4>
      </div>
      <div class="orderqueue" v-if="dataFetched">
      <!-- Right drawer that display all the orders from the selected table order-->
        <OrderQueue @load-dishes="loadDishes" :tableOrders="this.tableOrders"></OrderQueue>

      </div>
    </div>
  </q-page>
</template>

<script>
import OrderDetail from "components/Detail/OrderDetail";
import OrderPreparation from "components/Prep/OrderPreparation";
import OrderQueue from "components/Queue/OrderQueue";
import io from 'socket.io-client';
import axios from "axios";
export default {
  name: 'PageIndex',
  components: {OrderQueue, OrderPreparation},
  methods: {
    async fetchData(){
      let response = await axios.get('http://localhost:8082/kitchenOrders/')
      .catch(error => {
        if(error.response.status == 404){
          console.log("Esperando ordenes")
        }
      });
      if(response){
        console.log("hay respuesta")
      if(this.tableOrders.length === undefined){
        this.tableOrders=response.data.orders;
        console.log("no definido, se agrega todo")
      } else {
        response.data.orders.forEach( newOrder => {
          this.tableOrders.forEach(order => {
            if(newOrder != order){
              console.log("agregando uno")
              this.tableOrders.push(newOrder)
            }
          })
        })
      }

      for (let i = 0; i < this.tableOrders.length; i++) {
        let res = await axios.get('http://localhost:8082/requestedDishes/'+this.tableOrders[i].id,
          {crossDomain: true})
        this.tableOrders[i].dishes = res.data
      }
      this.dataFetched=true
      }

    },
    loadDishes(order){
      this.prepOrders.push(order)
      this.tableOrders.forEach(
        tOrder =>
      {
        if(tOrder.id == order.id)
        {
          this.tableOrders.splice(this.tableOrders.indexOf(tOrder),1)
        }
      })
    },
    served(orden){
      this.prepOrders.forEach(
        prep => {
          if (prep.id == orden.id) {
            this.prepOrders.splice(this.prepOrders.indexOf(prep),1)
          }
        })
    },
  },
  data() {
    return {
      socket: io("http://localhost:3001"),
      tableOrders:{},
      prepOrders:[],
      dataFetched:false
    }
  },
  created( ) {
    this.fetchData();
    if(this.dataFetched) {
      if(this.tableOrder.length <1) {
        console.log("no hay pedidos")
      }
    }
  },
  mounted() {
    this.socket.on('newOrder', async (data) => {
      console.log("adding order");
      await this.fetchData();
    });
    this.socket.on('extraOrder', async (userId) => {
      console.log("adding EXTRA");
      let extraOrder;
      axios.get('http://localhost:3001/api/v1/orders/'+userId,
        {crossDomain: true}).then(response => {
          let newOrder = response.data;
          this.tableOrders.forEach(order => {
                if(order.id == newOrder.id){

                  for (let item of newOrder.MenuItems){
                    console.log("item existente: " +item.id)
                    console.log("cantidad item existente: " +item.OrderDetails.quantity)
                    for(let dish of order.dishes){
                      console.log("dish nuevo: " +item.id)
                      console.log("cantidad dish nuevo: " +dish.quantity)
                      if(item.id === dish.MenuItem.id && item.OrderDetails.quantity === dish.quantity){
                          console.log("no cambia nada")
                          break;
                      }
                      if(item.id === dish.MenuItem.id && item.OrderDetails.quantity !== dish.quantity){
                        console.log("cambia cantidad")
                        break;
                      }
                      console.log("nuevo item")
                    }

                  }
                }
          })

      }).catch(error => {
        console.log(error)
      })

    });
  },

}
</script>

<style>
.orderprep
  {
    height:70vh ;
    background-color: dark;
  }
.orderqueue
  {
    height: 26.5vh;
    background-color: #1976D2;
  }

</style>
