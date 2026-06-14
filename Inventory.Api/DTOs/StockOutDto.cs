namespace Inventory.Api.DTOs;

public class StockOutDto
{
    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public string Note { get; set; } = string.Empty;
}