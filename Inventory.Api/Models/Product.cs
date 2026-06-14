namespace Inventory.Api.Models;

public class Product
{
    public int Id { get; set; }

    public string Sku { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public int LowStockThreshold { get; set; }

    public int CategoryId { get; set; }

    public Category? Category { get; set; }

    public int SupplierId { get; set; }

    public Supplier? Supplier { get; set; }

    public ICollection<StockMovement> StockMovements { get; set; }
    = new List<StockMovement>();
}