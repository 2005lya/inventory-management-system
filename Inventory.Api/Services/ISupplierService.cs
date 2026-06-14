using Inventory.Api.DTOs;

namespace Inventory.Api.Services;

public interface ISupplierService
{
    Task<List<SupplierDto>> GetAllAsync();

    Task<SupplierDto?> GetByIdAsync(int id);

    Task<SupplierDto> CreateAsync(CreateSupplierDto dto);

    Task<bool> UpdateAsync(int id, UpdateSupplierDto dto);

    Task<bool> DeleteAsync(int id);
}