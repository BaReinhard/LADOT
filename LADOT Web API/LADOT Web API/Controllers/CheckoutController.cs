﻿using System;
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
                return Ok(db.Vehicles);
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
        // Request a car for checkout
        // PUT: api/Checkout/
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(Vehicle vehicle)
        {

            var query = db.Vehicles.OrderBy(d => d.updated).FirstOrDefault(i => i.status == "available");

            if (query != null)
            {
                db.Entry(query).State = EntityState.Modified;
                db.Entry(query).Entity.email = vehicle.email;
                db.Entry(query).Entity.updated = DateTime.Today.ToShortDateString();
                
                db.Entry(query).Entity.status = "checkedout";
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
                return Ok("There are no vehicles available");
            }
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //if (id != vehicle.carId)
            //{
            //    return BadRequest();
            //}

            //db.Entry(vehicle).State = EntityState.Modified;
            //db.Entry(vehicle).Entity.status = "checkedout";
            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!VehicleExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return Ok(db.Entry(vehicle));
            //return StatusCode(HttpStatusCode.NoContent);
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