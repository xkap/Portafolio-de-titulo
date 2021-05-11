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
    public static class MonthlyController
    {
        private static readonly string datesURL = "http://localhost:8081/admin/dates/";
        private static readonly string customersURL = "http://18.229.150.241:3001/api/v1/admin/mostdishes/";
        private static readonly string dishesURL = "http://18.229.150.241:3001/api/v1/admin/bestcustomers/";

        public static string datesJSON = "";
        public static string customersJSON = "";
        public static string dishesJSON = "";



        public static List<MyDate> getDates()
        {
            WebRequest request = WebRequest.Create(datesURL);
            request.Method = "GET";
            try
            {
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                var encod = ASCIIEncoding.ASCII;
                var readDates = new System.IO.StreamReader(response.GetResponseStream(), encod);
                datesJSON = readDates.ReadToEnd();
            }
            catch (Exception)
            {

                return (null);
            }

            List<MyDate> cs = JsonConvert.DeserializeObject<List<MyDate>>(datesJSON);
            Console.Out.Write(datesJSON);
            return cs;

        }

    }
}
