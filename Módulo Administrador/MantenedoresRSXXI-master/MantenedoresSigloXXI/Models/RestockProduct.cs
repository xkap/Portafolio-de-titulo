using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MantenedoresSigloXXI.Models
{
    public class RestockProduct
    {
        [JsonProperty("productId")]
        public int ProductId { get; set; }

        [JsonProperty("product")]
        public string Product { get; set; }

        [JsonProperty("quantity")]
        public int Quantity { get; set; }
            
        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }


    }

}
