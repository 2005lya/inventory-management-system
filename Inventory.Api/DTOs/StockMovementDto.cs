namespace Inventory.Api.DTOs;

public class StockMovementDto
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public string Type { get; set; } = string.Empty;

    public string Note { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}