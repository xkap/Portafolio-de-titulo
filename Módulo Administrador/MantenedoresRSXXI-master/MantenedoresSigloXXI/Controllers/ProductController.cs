using MantenedoresSigloXXI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;

namespace MantenedoresSigloXXI.Controllers
{
    public static class ProductController
    {
        private static readonly string ProductsURL = "http://localhost:3001/api/v1/admin/products/";
        public static string ProductsJSON = "";

        public class ProductJson
        {
            [JsonProperty("Products")]
            public List<Product> Products { get; set; }
        }

        public static string GetProductsJSON()
        {
            WebRequest request = WebRequest.Create(ProductsURL);
            request.Method = "GET";
            try
            {
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            var encod = ASCIIEncoding.ASCII;
            using var readProducts = new System.IO.StreamReader(response.GetResponseStream(), encod);
            ProductsJSON = readProducts.ReadToEnd();
        }
            catch (Exception)
            {

                return ("");
            }
            return (ProductsJSON);

        }
        public static List<Product> GetProductsList()
        {   
            ProductJson cs =JsonConvert.DeserializeObject<ProductJson>(ProductsJSON);
            return cs.Products;

        }

        public static int DeleteProduct(Product Product)
        {
            WebRequest request = WebRequest.Create(ProductsURL+Product.Id);
            request.Method = "DELETE";
            try
            {
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                Debug.WriteLine("RESPONSE STATUS CODE: " + response.StatusCode);
                return (int)response.StatusCode;
            }
            catch (Exception)
            {

                return 500;
            }
            

        }

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
           
            

        }

        public static int AddProduct(Product product)
        {
            WebRequest request = WebRequest.Create(ProductsURL);
            request.Method = "POST";
            request.ContentType = "application/json";

            Dictionary<string, string> newData = new Dictionary<string, string>
            {
                { "name", product.Name},
                { "quantity", product.Quantity.ToString()},
            };

            string jsonPayload = JsonConvert.SerializeObject(newData, Formatting.Indented);
            Debug.WriteLine(jsonPayload);

            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                streamWriter.Write(jsonPayload);
            }
            try
            {
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                Debug.WriteLine("RESPONSE STATUS CODE: " + response.StatusCode);
                return (int)response.StatusCode;
            }
            catch (Exception)
            {
                Debug.WriteLine("RESPONSE STATUS CODE: 500");

            }
            
            return 500;

        }
    }
}
