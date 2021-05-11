using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MantenedoresSigloXXI.Models
{
    public class Waiter
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("roleId")]
        public int UserType { get; set; }
    }

}
