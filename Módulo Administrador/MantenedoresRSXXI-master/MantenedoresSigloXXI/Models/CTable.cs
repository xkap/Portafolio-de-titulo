using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MantenedoresSigloXXI.Models
{
    public class CTable
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("capacity")]
        public string Capacity { get; set; }

        [JsonProperty("customerId")]
        public string CustomerId { get; set; }
        
        [JsonProperty("waiterId")]
        public string WaiterId { get; set; }


        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updatedAt")]
        public DateTime UpdatedAt { get; set; }

    }

}
