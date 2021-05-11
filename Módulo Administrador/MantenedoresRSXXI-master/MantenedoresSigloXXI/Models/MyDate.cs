using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MantenedoresSigloXXI.Models
{
    public class MyDate { 
     
        [JsonProperty("date")]
        public string Date { get; set; }

    }

}
