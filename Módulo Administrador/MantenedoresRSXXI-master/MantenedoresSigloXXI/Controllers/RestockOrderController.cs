using MantenedoresSigloXXI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MantenedoresSigloXXI.Controllers
{
    public static class RestockOrderController
    {
        private static readonly string orders = "http://localhost:3001/api/v1/admin/inventory-orders/";
        private static readonly string products = "http://localhost:3001/api/v1/admin/inventory-orders/products/";


        public static string myjson = "";


        public class OrdersJson
        {
            [JsonProperty("InventoryOrders")]
            public List<RestockOrder> Orders  { get; set; }
        }

        public class OrdersProductsJson
        {
            [JsonProperty("OrderProducts")]
            public List<RestockProduct> Products { get; set; }
        }

        public static async Task<List<RestockOrder>> GetRestockOrdersJSON()
        {
            WebRequest request = WebRequest.Create(orders);
            
            request.Method = "GET";
            
            try
            {
                return (await Task.Factory.StartNew(() =>
                 {
                     HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                     var encod = ASCIIEncoding.ASCII;
                     using var readOrders = new System.IO.StreamReader(response.GetResponseStream(), encod);
                     myjson = readOrders.ReadToEnd();
                     OrdersJson cs = JsonConvert.DeserializeObject<OrdersJson>(myjson);
                     
                     foreach (var order in cs.Orders)
                     {
                         WebRequest productsRequest = WebRequest.Create(products+order.Id);
                         productsRequest.Method = "GET";
                         HttpWebResponse productResponse = productsRequest.GetResponse() as HttpWebResponse;
                         using var readProducts = new System.IO.StreamReader(productResponse.GetResponseStream(), encod);
                         myjson = readProducts.ReadToEnd();
                         OrdersProductsJson opj = JsonConvert.DeserializeObject<OrdersProductsJson>(myjson);
                         order.RequiredProducts = opj.Products;
                     }

                     return cs.Orders;
                 }));
            }
            catch (Exception)
            {

                return new List<RestockOrder>();
            }
         

        }

        internal static int RejectOrder(RestockOrder selected)
        {
            return 0;
        }

        internal static int ApproveOrder(RestockOrder selected)
        {
            WebRequest request = WebRequest.Create(orders + selected.Id);
            request.Method = "PUT";
            request.ContentType = "application/json";

            /*Dictionary<string, string> newData = new Dictionary<string, string>
               {
                   { "orderId", product.Name},
                   { "quantity", product.Quantity.ToString()}
               };*/

            //string jsonPayload = JsonConvert.SerializeObject(newData, Formatting.Indented);

            /*using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                streamWriter.Write(jsonPayload);
            }*/
            try
            {
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                Debug.WriteLine("RESPONSE STATUS CODE: " + response.StatusCode);
                Debug.WriteLine((int)response.StatusCode);
                return (int)response.StatusCode;

            }
            catch (Exception)
            {
                return 500;

            }
        }
        /*
       public static int EditProduct(Product product)
       {
           WebRequest request = WebRequest.Create(ProductsURL + product.Id);
           request.Method = "PUT";
           request.ContentType = "application/json";

           Dictionary<string, string> newData = new Dictionary<string, string>
               {
                   { "name", product.Name},
                   { "quantity", product.Quantity.ToString()}
               };

           string jsonPayload = JsonConvert.SerializeObject(newData, Formatting.Indented);

           using (var streamWriter = new StreamWriter(request.GetRequestStream()))
           {              
               streamWriter.Write(jsonPayload);
           }
           try
           {
               HttpWebResponse response = request.GetResponse() as HttpWebResponse;
               Debug.WriteLine("RESPONSE STATUS CODE: " + response.StatusCode);
               Debug.WriteLine((int)response.StatusCode);
               return (int)response.StatusCode;

           }
           catch (Exception)
           {
               return 500;

           }



       }*/


    }
}
