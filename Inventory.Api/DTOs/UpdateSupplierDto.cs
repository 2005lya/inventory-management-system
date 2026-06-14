namespace Inventory.Api.DTOs;

public class UpdateSupplierDto
{
    public string Name { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
}