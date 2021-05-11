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
    public static class CustomerController
    {
        private static readonly string CustomersURL = "http://localhost:3001/api/v1/admin/customers/";
        public static string CustomersJSON = "";

        public class CustomerJson
        {
            [JsonProperty("customers")]
            public List<Customer> Customers { get; set; }
        }

        public static string GetCustomersJSON()
        {
            WebRequest request = WebRequest.Create(CustomersURL);
            request.Method = "GET";
            try
            {
            HttpWebResponse response = request.GetResponse() as HttpWebResponse;       
            var encod = ASCIIEncoding.ASCII;
            using var readCustomers = new System.IO.StreamReader(response.GetResponseStream(), encod);
            CustomersJSON = readCustomers.ReadToEnd();
            }
            catch (Exception)
            {

                return ("");
            }
            return (CustomersJSON);

        }
        public static List<Customer> GetCustomersList()
        {   
            CustomerJson cs =JsonConvert.DeserializeObject<CustomerJson>(CustomersJSON);
            return cs.Customers;

        }

        public static int DeleteCustomer(Customer customer)
        {
            WebRequest request = WebRequest.Create(CustomersURL+customer.Id);
            request.Method = "DELETE";
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

        public static int EditCustomer(Customer customer)
        {
            WebRequest request = WebRequest.Create(CustomersURL + customer.Id);
            request.Method = "PUT";
            request.ContentType = "application/json";

            Dictionary<string, string> newData = new Dictionary<string, string>
                {
                    { "newName", customer.Name},
                    { "newEmail", customer.Email},
                    { "newLastName", customer.LastName}
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
    }
}
