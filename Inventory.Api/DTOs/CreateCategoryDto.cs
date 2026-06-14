using System.ComponentModel.DataAnnotations;
namespace Inventory.Api.DTOs;

public class CreateCategoryDto
{
    [Required]
    [MinLength(2)]
    public string Name { get; set; } = string.Empty;
}