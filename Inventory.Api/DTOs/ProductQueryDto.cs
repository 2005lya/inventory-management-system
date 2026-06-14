namespace Inventory.Api.DTOs;

public class ProductQueryDto
{
    public string? Search { get; set; }

    public int? CategoryId { get; set; }

    public int? SupplierId { get; set; }

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 20;
}