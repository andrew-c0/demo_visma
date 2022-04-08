using Microsoft.EntityFrameworkCore;
using FurnitureOrder.Models;

namespace FurnitureUser.Models
{
    public class User
    {
        public int id {get; set;}
        public string? fullname {get; set;}
        public string? username {get; set;}
        public string? password {get; set;}
        public bool is_client {get; set;}
        public DateTime created_at {get; set;}
        public bool is_active {get; set;}
    }

    class UserDb : DbContext
    {
        public UserDb(DbContextOptions<UserDb> options) : base(options) {}
        public DbSet<User> User {get; set;}
    }
}