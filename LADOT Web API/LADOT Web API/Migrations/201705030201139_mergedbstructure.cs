namespace LADOT_Web_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mergedbstructure : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Histories", "lastFuel", c => c.Int(nullable: false));
            AddColumn("dbo.Histories", "currentFuel", c => c.Int(nullable: false));
            AddColumn("dbo.Histories", "comments", c => c.String());
            AddColumn("dbo.Histories", "lastMileage", c => c.Int(nullable: false));
            AddColumn("dbo.Histories", "currentMileage", c => c.Int(nullable: false));
            AddColumn("dbo.Histories", "updated", c => c.String());
            AddColumn("dbo.Vehicles", "name", c => c.String());
            AddColumn("dbo.Vehicles", "destination", c => c.String());
            DropColumn("dbo.Histories", "date");
            DropColumn("dbo.Histories", "mileage");
            DropColumn("dbo.Histories", "fuel");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Histories", "fuel", c => c.Int(nullable: false));
            AddColumn("dbo.Histories", "mileage", c => c.Int(nullable: false));
            AddColumn("dbo.Histories", "date", c => c.String());
            DropColumn("dbo.Vehicles", "destination");
            DropColumn("dbo.Vehicles", "name");
            DropColumn("dbo.Histories", "updated");
            DropColumn("dbo.Histories", "currentMileage");
            DropColumn("dbo.Histories", "lastMileage");
            DropColumn("dbo.Histories", "comments");
            DropColumn("dbo.Histories", "currentFuel");
            DropColumn("dbo.Histories", "lastFuel");
        }
    }
}
