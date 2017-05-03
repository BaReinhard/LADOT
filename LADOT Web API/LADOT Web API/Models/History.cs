using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace LADOT_Web_API.Models
{
    public class History
    {
        [Key]
        public int Id { get; set; }
        public string carId { get; set; }
        public string name { get; set; }
        public string date { get; set; }
        public string duedate { get; set; }
        public string email { get; set; }
        public int mileage { get; set; }
        public int fuel { get; set; }
        public string status { get; set; }
        public string destination { get; set; }
    }
}