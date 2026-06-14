using Inventory.Api.DTOs;

namespace Inventory.Api.Services;

public interface IReportService
{
    Task<List<ProductDto>> GetLowStockAsync();

    Task<List<StockMovementDto>> GetStockMovementsAsync();
}