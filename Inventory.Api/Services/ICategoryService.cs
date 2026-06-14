using Inventory.Api.DTOs;

namespace Inventory.Api.Services;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetAllAsync();

    Task<CategoryDto?> GetByIdAsync(int id);

    Task<CategoryDto> CreateAsync(CreateCategoryDto dto);

    Task<bool> UpdateAsync(int id, UpdateCategoryDto dto);

    Task<bool> DeleteAsync(int id);
}