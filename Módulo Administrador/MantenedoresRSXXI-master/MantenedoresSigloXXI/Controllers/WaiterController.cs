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
    public static class WaiterController
    {
        private static readonly string WaitersURL = "http://18.229.150.241:3001/api/v1/admin/waiters/";
        public static string WaitersJSON = "";



        public static List<Waiter> GetWaiters()
        {
            WebRequest request = WebRequest.Create(WaitersURL);
            request.Method = "GET";
            try
            {
            HttpWebResponse response = request.GetResponse() as HttpWebResponse;       
            var encod = ASCIIEncoding.ASCII;
            using var readCustomers = new System.IO.StreamReader(response.GetResponseStream(), encod);
            WaitersJSON = readCustomers.ReadToEnd();
            }
            catch (Exception)
            {

                return (new List<Waiter>()) ;
            }
  
            List<Waiter> cs = JsonConvert.DeserializeObject<List<Waiter>>(WaitersJSON);
            return cs;

        }

    }
}
