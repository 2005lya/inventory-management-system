using System.ComponentModel.DataAnnotations;
namespace Inventory.Api.DTOs;

public class CreateSupplierDto
{
    [Required]
    [MinLength(2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MinLength(2)]
    public string ContactPerson { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}