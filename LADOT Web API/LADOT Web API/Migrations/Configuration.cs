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
        }

        protected override void Seed(LADOT_Web_API.Models.LADOT_Web_APIContext context)
        {
            context.Vehicles.AddOrUpdate(
            new Vehicle { carId = "012", currentFuel = 1, lastFuel = 2, currentMileage = 1231230, lastMileage = 123111, comments = "clean car1", email = "brett@reinhards.us", status = "available", updated = "04/20/2017", duedate ="04/21/2017" },
            new Vehicle { carId = "013", currentFuel = 1, lastFuel = 2, currentMileage = 1231231, lastMileage = 123111, comments = "clean car2", email = "brett@reinhards.us", status = "checkedout", updated = "04/20/2017", duedate = "04/21/2017"},
            new Vehicle { carId = "014", currentFuel = 1, lastFuel = 2, currentMileage = 1231232, lastMileage = 123111, comments = "clean car3", email = "brett@reinhards.us", status = "checkedin", updated = "04/20/2017", duedate = "04/21/2017"},
            new Vehicle { carId = "015", currentFuel = 1, lastFuel = 2, currentMileage = 1231233, lastMileage = 123111, comments = "clean car4", email = "brett@reinhards.us", status = "available", updated = "04/20/2017", duedate = "04/21/2017" },
            new Vehicle { carId = "016", currentFuel = 1, lastFuel = 2, currentMileage = 1231234, lastMileage = 123111, comments = "clean car5", email = "brett@reinhards.us", status = "available", updated = "04/20/2017", duedate = "04/21/2017" }
                );
            context.Historys.AddOrUpdate(
                new History { Id=1,carId="012",name="Brett Reinhard",email="Brett.reinhard@nbcuni.com",date="04/22/2017",status="checkedout", duedate = "04/23/2017" },
                 new History { Id = 2, carId = "013", name = "Brett Reinhard", email = "Brett.reinhard@nbcuni.com", date = "04/23/2017",mileage=123,fuel=2 , status = "checkedout", duedate = "04/23/2017" },
                  new History { Id = 3, carId = "014", name = "Brett Reinhard", email = "Brett.reinhard@nbcuni.com", date = "04/24/2017" ,mileage=124,fuel=2, status="available", duedate = "04/23/2017" },
                   new History { Id = 4, carId = "015", name = "Brett Reinhard", email = "Brett.reinhard@nbcuni.com", date = "04/25/2017" ,mileage=125,fuel=3, status = "checkedin", duedate = "04/23/2017" },
                    new History { Id = 5, carId = "016", name = "Brett Reinhard", email = "Brett.reinhard@nbcuni.com", date = "04/26/2017" ,mileage=126,fuel=3, status = "available", duedate = "04/23/2017" }
                );
        }
    }
}
