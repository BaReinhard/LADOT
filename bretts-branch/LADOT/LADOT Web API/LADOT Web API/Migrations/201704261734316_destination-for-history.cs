namespace LADOT_Web_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class destinationforhistory : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Histories", "destination", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Histories", "destination");
        }
    }
}
