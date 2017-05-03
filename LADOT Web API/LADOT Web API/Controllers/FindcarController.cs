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
    public class FindCarController : ApiController
    {
        private LADOT_Web_APIContext db = new LADOT_Web_APIContext();

        //// GET: api/FindCar
        //public IQueryable<Vehicle> GetVehicles()
        //{
        //   var query =  from v in db.Vehicles
        //                where v.status == "checkedout"
        //                select v
        //                ;
        //    return query;
        //}
        //// GET: api/FindCar
        public IQueryable<Vehicle> GetVehicles([FromUri] Vehicle vehicle)
        {
            //if (vehicle.carId != null && vehicle.email != null)
            //{
            var query = from v in db.Vehicles
                        where v.status == "checkedout" && v.email == vehicle.email && v.carId == vehicle.carId
                        select v
                         ;
            return query;
            //}
            //else if (vehicle.status != null)
            //{
            //    var query = from v in db.Vehicles
            //                where v.status == vehicle.status
            //                select v;
            //    return query;
            //}else
            //{
            //    var query = from v in db.Vehicles
            //                where v.status == "checkedout"
            //                select v;
            //    return query;
            //}
        }

        // GET: api/FindCar/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(string id)
        {
            if (id == "available")
            {
                var query = from v in db.Vehicles
                            where v.status == "available"
                            select v;
                return Ok(query);
            }
            else if (id == "checkedout")
            {
                var query = from v in db.Vehicles
                            where v.status == "checkedout"
                            select v;
                return Ok(query);
            }
            else if (id == "checkedin")
            {
                var query = from v in db.Vehicles
                            where v.status == "checkedin"
                            select v;
                return Ok(query);
            }else if(id == "history")
            {
                var query = from h in db.Historys
                            select h;
                return Ok(query);
            }
            else
            {
                Vehicle vehicle = db.Vehicles.Find(id);
                if (vehicle == null)
                {
                    return NotFound();
                }

                return Ok(vehicle);
            }

        }

        // PUT: api/FindCar
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var query = db.Vehicles.FirstOrDefault(i => i.status == "checkedout" && i.carId == vehicle.carId && i.email == vehicle.email);

            db.Entry(query).State = EntityState.Modified;
            db.Entry(query).Entity.updated = DateTime.Today.ToShortDateString();

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

            return Ok(db.Entry(query).Entity);
        }

        //// POST: api/FindCar
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

        //// DELETE: api/FindCar/5
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