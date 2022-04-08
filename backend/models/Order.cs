using Microsoft.EntityFrameworkCore;
using FurnitureUser.Models;
using FurnitureProduct.Models;

namespace FurnitureOrder.Models
{   
    public class OrderStatus
    {   
        public int id {get; set;}
        public string? name {get; set;}

    }
    public class Order
    {
        public int id {get; set;}
        public int user {get; set;}
        public int current_status {get; set;}
        public DateTime created_at {get; set;}
        public DateTime updated_at {get; set;}
    }

    public class OrderLine
    {
        public int id {get; set;}
        public int order {get; set;}
        public int product {get; set;}
        public int quantity {get; set;}
        public float finalPrice {get; set;}
    }

    class OrderStatusDb: DbContext
    {
        public OrderStatusDb(DbContextOptions<OrderStatusDb> options) : base(options) {}
        public DbSet<OrderStatus> OrderStatus {get; set;}
    }

    class OrderDb: DbContext
    {
        public OrderDb(DbContextOptions<OrderDb> options) : base(options) {}
        public DbSet<Order> Order {get; set;}
    }

    class OrderLineDb: DbContext
    {
        public OrderLineDb(DbContextOptions<OrderLineDb> options) : base(options) {}
        public DbSet<OrderLine> OrderLine { get; set; }
    }
}