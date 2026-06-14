using Inventory.Api.DTOs;

namespace Inventory.Api.Services;

public interface IProductService
{
    // Task<List<ProductDto>> GetAllAsync();
    Task<PagedResult<ProductDto>> GetAllAsync(ProductQueryDto query);
    Task<ProductDto?> GetByIdAsync(int id);

    Task<ProductDto?> CreateAsync(CreateProductDto dto);

    Task<bool> UpdateAsync(int id, UpdateProductDto dto);

    Task<bool> DeleteAsync(int id);
}