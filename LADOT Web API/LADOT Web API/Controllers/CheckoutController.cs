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
        public IQueryable<Vehicle> GetVehicles()
        {
            
            return db.Vehicles;
        }

        // GET: api/Checkout/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(string id)
        {
            Vehicle vehicle = db.Vehicles.Find(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Checkout/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(string id, Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.carId)
            {
                return BadRequest();
            }

            db.Entry(vehicle).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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

        // POST: api/Checkout
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult PostVehicle(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Vehicles.Add(vehicle);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (VehicleExists(vehicle.carId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = vehicle.carId }, vehicle);
        }

        // DELETE: api/Checkout/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(string id)
        {
            Vehicle vehicle = db.Vehicles.Find(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            db.Vehicles.Remove(vehicle);
            db.SaveChanges();

            return Ok(vehicle);
        }

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