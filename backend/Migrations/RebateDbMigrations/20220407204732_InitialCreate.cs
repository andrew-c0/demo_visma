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
                name: "Product",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    price = table.Column<float>(type: "REAL", nullable: true),
                    category = table.Column<string>(type: "TEXT", nullable: true),
                    created_at = table.Column<DateTime>(type: "TEXT", nullable: false),
                    is_active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.id);
                });

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
                    productid = table.Column<int>(type: "INTEGER", nullable: true),
                    category_rebate = table.Column<string>(type: "TEXT", nullable: true),
                    created_at = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rebate", x => x.id);
                    table.ForeignKey(
                        name: "FK_Rebate_Product_productid",
                        column: x => x.productid,
                        principalTable: "Product",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rebate_productid",
                table: "Rebate",
                column: "productid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rebate");

            migrationBuilder.DropTable(
                name: "Product");
        }
    }
}
