namespace LADOT_Web_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateDBCategory : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Histories", "duedate", c => c.String());
            DropColumn("dbo.Vehicles", "name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Vehicles", "name", c => c.String());
            DropColumn("dbo.Histories", "duedate");
        }
    }
}
