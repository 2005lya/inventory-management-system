using Inventory.Api.Models;

namespace Inventory.Api.Data.Seed;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (!context.Users.Any(u => u.Email == "admin@test.com"))
        {
            context.Users.Add(new AppUser
            {
                Email = "admin@test.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                Role = "Admin"
            });
        }

        if (!context.Categories.Any())
        {
            context.Categories.AddRange(
                new Category { Name = "Furniture" },
                new Category { Name = "Lighting" },
                new Category { Name = "Storage" }
            );
        }

        if (!context.Suppliers.Any())
        {
            context.Suppliers.AddRange(
                new Supplier
                {
                    Name = "ABC Supplies",
                    ContactPerson = "John Smith",
                    Email = "john@abcsupplies.com"
                },
                new Supplier
                {
                    Name = "Home Goods Ltd",
                    ContactPerson = "Sarah Lee",
                    Email = "sarah@homegoods.com"
                }
            );
        }

        await context.SaveChangesAsync();
    }
}