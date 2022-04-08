using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.RebateDbMigrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rebate",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    subject = table.Column<string>(type: "TEXT", nullable: true),
                    value = table.Column<float>(type: "REAL", nullable: false),
                    percentage = table.Column<float>(type: "REAL", nullable: false),
                    product_specific = table.Column<bool>(type: "INTEGER", nullable: false),
                    product = table.Column<int>(type: "INTEGER", nullable: false),
                    category_rebate = table.Column<string>(type: "TEXT", nullable: true),
                    created_at = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rebate", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rebate");
        }
    }
}
