namespace LADOT_Web_API.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using LADOT_Web_API.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<LADOT_Web_API.Models.LADOT_Web_APIContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "LADOT_Web_API.Models.LADOT_Web_APIContext";
        }

        protected override void Seed(LADOT_Web_API.Models.LADOT_Web_APIContext context)
        {
            context.Vehicles.AddOrUpdate(
                new Vehicle { carId = "012", currentFuel = 1, lastFuel = 2, currentMileage = 1231230, lastMileage = 123111, comments = "clean car1", email = "brett@reinhards.us", status = "available", updated = "04/20/2017" },
            new Vehicle { carId = "013", currentFuel = 1, lastFuel = 2, currentMileage = 1231231, lastMileage = 123111, comments = "clean car2", email = "brett@reinhards.us", status = "available", updated = "04/20/2017" },
            new Vehicle { carId = "014", currentFuel = 1, lastFuel = 2, currentMileage = 1231232, lastMileage = 123111, comments = "clean car3", email = "brett@reinhards.us", status = "available", updated = "04/20/2017" },
            new Vehicle { carId = "015", currentFuel = 1, lastFuel = 2, currentMileage = 1231233, lastMileage = 123111, comments = "clean car4", email = "brett@reinhards.us", status = "available", updated = "04/20/2017" },
            new Vehicle { carId = "016", currentFuel = 1, lastFuel = 2, currentMileage = 1231234, lastMileage = 123111, comments = "clean car5", email = "brett@reinhards.us", status = "available", updated = "04/20/2017" }
                );
        }
    }
}
