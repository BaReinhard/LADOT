namespace LADOT_Web_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDBCategory : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Histories", "status", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Histories", "status");
        }
    }
}
