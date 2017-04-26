using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LADOT_Web_API.Models
{
    public class LADOT_Web_APIContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public LADOT_Web_APIContext() : base("name=LADOT_Web_APIContext")
        {
        }

        public System.Data.Entity.DbSet<LADOT_Web_API.Models.Vehicle> Vehicles { get; set; }
        public System.Data.Entity.DbSet<LADOT_Web_API.Models.History> Historys { get; set; }
    }
}
