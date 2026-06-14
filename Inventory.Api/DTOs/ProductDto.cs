namespace Inventory.Api.DTOs;

public class ProductDto
{
    public int Id { get; set; }

    public string Sku { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public int LowStockThreshold { get; set; }

    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = string.Empty;

    public int SupplierId { get; set; }

    public string SupplierName { get; set; } = string.Empty;
}