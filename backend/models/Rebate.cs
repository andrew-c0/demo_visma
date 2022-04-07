using Microsoft.EntityFrameworkCore;
using FurnitureProduct.Models;

namespace FurnitureRebate.Models
{
    public class Rebate
    {
        public int id {get; set;}
        public string? subject {get; set;}
        public float value {get; set;}
        public float percentage {get; set;}
        public bool product_specific {get; set;}
        public Product? product {get; set;}
        public string? category_rebate {get; set;}
        public DateTime created_at {get; set;}
    }

    class RebateDb : DbContext
    {
        public RebateDb(DbContextOptions<RebateDb> options) : base(options) {}
        public DbSet<Rebate> Rebate {get; set;}
    }
}