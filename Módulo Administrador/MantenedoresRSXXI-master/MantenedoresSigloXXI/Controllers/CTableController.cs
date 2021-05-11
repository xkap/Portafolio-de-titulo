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
    public static class CTableController
    {
        private static readonly string CTablesURL = "http://localhost:8081/admin/tables/";
        public static string CTablesJSON = "";

        public class CTableJson
        {
            [JsonProperty("Tables")]
            public List<CTable> CTables { get; set; }
        }

        public static string GetCTablesJSON()
        {
            WebRequest request = WebRequest.Create(CTablesURL);
            request.Method = "GET";
            try
            {
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            var encod = ASCIIEncoding.ASCII;
            using var readCTables = new System.IO.StreamReader(response.GetResponseStream(), encod);
                CTablesJSON = readCTables.ReadToEnd();
        }
            catch (Exception)
            {

                return ("");
            }
            return (CTablesJSON);

        }
        public static List<CTable> GetCTablesList()
        {
            CTableJson cs =JsonConvert.DeserializeObject<CTableJson>(CTablesJSON);
            return cs.CTables;

        }

        public static int DeleteCTable(CTable ctable)
        {
            WebRequest request = WebRequest.Create(CTablesURL + ctable.Id);
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

        public static int EditCTable(CTable ctable)
        {
            WebRequest request = WebRequest.Create(CTablesURL + ctable.Id);
            request.Method = "PUT";
            request.ContentType = "application/json";

            Dictionary<string, string> newData = new Dictionary<string, string>
            {
                    { "capacity", ctable.Capacity},
                    { "customerId", ctable.CustomerId},
                    { "waiterId", ctable.WaiterId},
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

        public static int addTable(CTable ctable)
        {
            WebRequest request = WebRequest.Create(CTablesURL);
            request.Method = "POST";
            request.ContentType = "application/json";

            Dictionary<string, string> newData = new Dictionary<string, string>
            {
                
                { "capacity", ctable.Capacity},
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
