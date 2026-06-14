using Inventory.Api.Models;
using Inventory.Api.DTOs;

namespace Inventory.Api.Repositories;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(int id);

    Task<List<Product>> GetAllAsync();

    Task<(List<Product> Products, int TotalCount)> GetPagedAsync(
        ProductQueryDto query);

    Task AddAsync(Product product);

    void Delete(Product product);

    Task SaveChangesAsync();
    Task<bool> CategoryExistsAsync(int categoryId);

    Task<bool> SupplierExistsAsync(int supplierId);
}