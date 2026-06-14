using Inventory.Api.DTOs;
using Inventory.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet("low-stock")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<ProductDto>>> GetLowStock()
    {
        var products = await _reportService.GetLowStockAsync();

        return Ok(products);
    }

    [HttpGet("stock-movements")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<StockMovementDto>>> GetStockMovements()
    {
        var movements = await _reportService.GetStockMovementsAsync();

        return Ok(movements);
    }
}