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
    public class ReturnKeyController : ApiController
    {
        private LADOT_Web_APIContext db = new LADOT_Web_APIContext();

        // GET: api/ReturnKey
        public IQueryable<Vehicle> GetVehicles()
        {
            var query = from veh in db.Vehicles
                        where veh.status == "checkedin"
                        select veh
                        ;
            return query;
        }

        //// GET: api/ReturnKey/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(string id)
        {
            //if (id == "history")
            //{
            //    var query = from h in db.Historys
            //                where h.status == "keyreturned"
            //                select h;
            //    return Ok(query);
            //}
            //else if (id == "vehicles")
            //{
            //    return Ok(db.Vehicles);
            //}
            //else
            //{
                Vehicle vehicle = db.Vehicles.Find(id);
                if (vehicle == null)
                {
                    return NotFound();
                }

                return Ok(vehicle);
            //}
        }

        // PUT: api/ReturnKey
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(VehicleRequest vehicle)
        {
            var query = db.Vehicles.FirstOrDefault(i => i.status == "checkedin" && i.carId == vehicle.carId && i.email == vehicle.email);

            if (query != null)
            {

                History hist = new History
                {
                    email = vehicle.email,
                    carId = db.Entry(query).Entity.carId,
                    date = DateTime.Today.ToShortDateString(),
                    fuel = db.Entry(query).Entity.lastFuel,
                    mileage = db.Entry(query).Entity.lastMileage,
                    duedate = db.Entry(query).Entity.duedate,
                    name = vehicle.name,
                    status = "keyreturned"
                };

                db.Entry(query).State = EntityState.Modified;
                db.Entry(query).Entity.status = "available";
                db.Entry(query).Entity.email = "";
                db.Entry(query).Entity.duedate = "";
                db.Entry(query).Entity.lastFuel = vehicle.currentFuel;
                db.Entry(query).Entity.lastMileage = vehicle.currentMileage;

                db.Entry(query).Entity.updated = DateTime.Today.ToShortDateString();

                // Create History Object to Store in Historys Database
                

                // Add Object to History Database
                db.Historys.Add(hist);
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
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        //// POST: api/ReturnKey
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

        //// DELETE: api/ReturnKey/5
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