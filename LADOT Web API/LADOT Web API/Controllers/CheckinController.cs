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
    public class CheckInController : ApiController
    {
        private LADOT_Web_APIContext db = new LADOT_Web_APIContext();

        //// GET: api/CheckIn
        //public IQueryable<Vehicle> GetVehicles()
        //{
        //    return db.Vehicles;
        //}

        //// GET: api/CheckIn/5
        //[ResponseType(typeof(Vehicle))]
        //public IHttpActionResult GetVehicle(string id)
        //{
        //    Vehicle vehicle = db.Vehicles.Find(id);
        //    if (vehicle == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(vehicle);
        //}

        // PUT: api/CheckIn
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(Vehicle vehicle)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var query = db.Vehicles.FirstOrDefault(i => i.status == "checkedout" && i.email == vehicle.email && i.carId == vehicle.carId);

            // Should think about how we want to handle some of these backend statements.
            // For example, do we want to rely on the front end passing lastfuel, mileage, and name?
            // The Alertnatives are commented under the respective lines

            db.Entry(query).State = EntityState.Modified;
            db.Entry(query).Entity.name = db.Entry(query).Entity.name;
//            db.Entry(query).Entity.name = vehicle.name;
            db.Entry(query).Entity.status = "checkedin";
            db.Entry(query).Entity.updated = DateTime.Today.ToShortDateString();
            db.Entry(query).Entity.comments = vehicle.comments;
            db.Entry(query).Entity.lastFuel = vehicle.lastFuel;
//            db.Entry(query).Entity.lastFuel = db.Entry(query).Entity.lastFuel;
            db.Entry(query).Entity.lastMileage = vehicle.lastMileage;
//            db.Entry(query).Entity.lastMileage = db.Entry(query).Entity.lastMileage;
            db.Entry(query).Entity.currentFuel = vehicle.currentFuel;
            db.Entry(query).Entity.currentMileage = vehicle.currentMileage;

            

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(vehicle.carId))
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

        //// POST: api/CheckIn
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

        //// DELETE: api/CheckIn/5
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