using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using LADOT_Web_API.Models;

namespace LADOT_Web_API.Controllers
{
    public class CheckoutController : ApiController
    {
        private LADOT_Web_APIContext db = new LADOT_Web_APIContext();


        // GET: api/Checkout
        public IHttpActionResult GetVehicles()
        {
            //if (1 == 1)
            //{
            //var query = from v in db.Vehicles
            //            where v.status == "available"
            //            select v;

            //Check for History
            var query = from d in db.Historys
                        select d;
            if(query != null)
            {
                return Ok(query);
            }
           else
            {
                return NotFound();
            }
            //}
            //var query = db.Vehicles.OrderBy(d => d.updated).FirstOrDefault(i => i.status == "available");

            //if (query != null)
            //{
            //    db.Entry(query).State = EntityState.Modified;
            //    db.Entry(query).Entity.status = "available";
            //    db.Entry(query).Entity.updated = DateTime.Today.ToShortDateString();
            //    try
            //    {
            //        db.SaveChanges();
            //    }
            //    catch (DbUpdateConcurrencyException)
            //    {
            //        if (!VehicleExists(db.Entry(query).Entity.carId))
            //        {
            //            return NotFound();
            //        }
            //        else
            //        {
            //            throw;
            //        }
            //    }
            //    return Ok(db.Entry(query).Entity);
            //}
            //else
            //{
            //    return Ok("There are no vehicles available");
            //}

        }

        //// GET: api/Checkout/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(string id)
        {
            if (id == "history")
            {
                var query = from h in db.Historys
                            where h.status == "checkedout"
                            select h;
                return Ok(query);
            }
            else if (id == "vehicles")
            {
                return Ok(db.Vehicles);
            }else
            {
                Vehicle vehicle = db.Vehicles.Find(id);
                if (vehicle == null)
                {
                    return NotFound();
                }

                return Ok(vehicle);
            }
            
        }
        // Request a car for checkout
        // PUT: api/Checkout/
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(VehicleRequest vehicle)
        {

            var query = db.Vehicles.OrderBy(d => d.updated).FirstOrDefault(i => i.status == "available");
            // Ensure query returned a non null value
            if (query != null)
            {
                // Modify queried Vehicle Object within Database
                db.Entry(query).State = EntityState.Modified;
                db.Entry(query).Entity.email = vehicle.email;
                db.Entry(query).Entity.updated = DateTime.Today.ToShortDateString();
                db.Entry(query).Entity.duedate = vehicle.duedate;
                db.Entry(query).Entity.status = "checkedout";

                // Create History Object to Store in Historys Database
                History hist = new History {
                                                email = vehicle.email,
                                                carId = db.Entry(query).Entity.carId,
                                                date = db.Entry(query).Entity.updated,
                                                fuel = db.Entry(query).Entity.lastFuel,
                                                mileage = db.Entry(query).Entity.lastMileage,
                                                duedate = db.Entry(query).Entity.duedate,
                                                name = vehicle.name,
                                                status = "checkedout",
                                                destination = vehicle.destination
                                            };

                // Add Object to History Database
                db.Historys.Add(hist);

                // Save the Changes
                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!VehicleExists(db.Entry(query).Entity.carId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok(db.Entry(query).Entity);
            }
            else
            {
                return NotFound();
            }
        }
            

        //// POST: api/Checkout
        //[ResponseType(typeof(Vehicle))]
        //public IHttpActionResult PostVehicle(Vehicle vehicle)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Vehicles.Add(vehicle);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (VehicleExists(vehicle.carId))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtRoute("DefaultApi", new { id = vehicle.carId }, vehicle);
        //}

        //// DELETE: api/Checkout/5
        //[ResponseType(typeof(Vehicle))]
        //public IHttpActionResult DeleteVehicle(string id)
        //{
        //    Vehicle vehicle = db.Vehicles.Find(id);
        //    if (vehicle == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Vehicles.Remove(vehicle);
        //    db.SaveChanges();

        //    return Ok(vehicle);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleExists(string id)
        {
            return db.Vehicles.Count(e => e.carId == id) > 0;
        }
    }
}