using Inventory.Api.DTOs;
using Inventory.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StockController : ControllerBase
{
    private readonly IStockService _stockService;

    public StockController(IStockService stockService)
    {
        _stockService = stockService;
    }

    [HttpPost("in")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<StockMovementDto>> StockIn(StockInDto dto)
    {
        var movement = await _stockService.StockInAsync(dto);

        if (movement == null)
        {
            return BadRequest("Invalid product or quantity.");
        }

        return Ok(movement);
    }

    [HttpPost("out")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<StockMovementDto>> StockOut(StockOutDto dto)
    {
        var movement = await _stockService.StockOutAsync(dto);

        if (movement == null)
        {
            return BadRequest("Invalid product, quantity, or insufficient stock.");
        }

        return Ok(movement);
    }

    [HttpGet("movements")]
    public async Task<ActionResult<List<StockMovementDto>>> GetMovements()
    {
        var movements = await _stockService.GetMovementsAsync();

        return Ok(movements);
    }
}