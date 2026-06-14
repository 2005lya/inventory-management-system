namespace Inventory.Api.Models;

public class Supplier
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public ICollection<Product> Products { get; set; }
        = new List<Product>();
}