namespace Inventory.Api.DTOs;
using System.ComponentModel.DataAnnotations;

public class UpdateProductDto
{
    [Required]
    public string Sku { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }

    [Range(0, int.MaxValue)]
    public int LowStockThreshold { get; set; }

    [Range(1, int.MaxValue)]
    public int CategoryId { get; set; }

    [Range(1, int.MaxValue)]
    public int SupplierId { get; set; }
}