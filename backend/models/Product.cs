using Microsoft.EntityFrameworkCore;

namespace FurnitureProduct.Models
{
    public class Product
    {
        public int id {get; set;}
        public string? name {get; set;}
        public float? price {get; set;}
        public string? category {get; set;}
        public DateTime created_at {get; set;}
        public bool is_active {get; set;}
    }

    class ProductDb: DbContext
    {
        public ProductDb(DbContextOptions<ProductDb> options) : base(options) {}
        public DbSet<Product> Product {get; set;}
    }
}