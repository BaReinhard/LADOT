namespace LADOT_Web_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Vehicles", "name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Vehicles", "name");
        }
    }
}
