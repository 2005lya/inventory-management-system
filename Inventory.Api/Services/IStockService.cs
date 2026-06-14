using Inventory.Api.DTOs;

namespace Inventory.Api.Services;

public interface IStockService
{
    Task<StockMovementDto?> StockInAsync(StockInDto dto);

    Task<StockMovementDto?> StockOutAsync(StockOutDto dto);

    Task<List<StockMovementDto>> GetMovementsAsync();
}