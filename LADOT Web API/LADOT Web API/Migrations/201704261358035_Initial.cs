namespace LADOT_Web_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Histories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        carId = c.String(),
                        name = c.String(),
                        date = c.String(),
                        email = c.String(),
                        mileage = c.Int(nullable: false),
                        fuel = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        carId = c.String(nullable: false, maxLength: 128),
                        status = c.String(),
                        lastFuel = c.Int(nullable: false),
                        currentFuel = c.Int(nullable: false),
                        comments = c.String(),
                        lastMileage = c.Int(nullable: false),
                        currentMileage = c.Int(nullable: false),
                        email = c.String(),
                        updated = c.String(),
                        duedate = c.String(),
                    })
                .PrimaryKey(t => t.carId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Vehicles");
            DropTable("dbo.Histories");
        }
    }
}
