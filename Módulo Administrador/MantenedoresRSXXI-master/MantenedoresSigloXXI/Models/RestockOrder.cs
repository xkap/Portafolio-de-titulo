using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MantenedoresSigloXXI.Models
{
    public class RestockOrder
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("orderDescription")]
        public string OrderDescription { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("warehouseId")]
        public int WarehouseId { get; set; }

        [JsonProperty("statusId")]
        public int StatusId { get; set; }

        [JsonProperty("statusDescription")]
        public string StatusDescription { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updatedAt")]
        public DateTime UpdatedAt { get; set; }

        public List<RestockProduct> RequiredProducts { get; set; }

    }

}
