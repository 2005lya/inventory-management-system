using AutoMapper;
using Inventory.Api.Data;
using Inventory.Api.DTOs;
using Inventory.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Services;

public class StockService : IStockService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public StockService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<StockMovementDto?> StockInAsync(StockInDto dto)
    {
        var product = await _context.Products.FindAsync(dto.ProductId);

        if (product == null)
        {
            return null;
        }

        if (dto.Quantity <= 0)
        {
            return null;
        }

        product.Quantity += dto.Quantity;

        var movement = new StockMovement
        {
            ProductId = product.Id,
            Quantity = dto.Quantity,
            Type = "IN",
            Note = dto.Note,
            CreatedAt = DateTime.UtcNow
        };

        _context.StockMovements.Add(movement);

        await _context.SaveChangesAsync();

        movement.Product = product;

        return _mapper.Map<StockMovementDto>(movement);
    }

    public async Task<StockMovementDto?> StockOutAsync(StockOutDto dto)
    {
        var product = await _context.Products.FindAsync(dto.ProductId);

        if (product == null)
        {
            return null;
        }

        if (dto.Quantity <= 0)
        {
            return null;
        }

        if (product.Quantity < dto.Quantity)
        {
            return null;
        }

        product.Quantity -= dto.Quantity;

        var movement = new StockMovement
        {
            ProductId = product.Id,
            Quantity = dto.Quantity,
            Type = "OUT",
            Note = dto.Note,
            CreatedAt = DateTime.UtcNow
        };

        _context.StockMovements.Add(movement);

        await _context.SaveChangesAsync();

        movement.Product = product;

        return _mapper.Map<StockMovementDto>(movement);
    }

    public async Task<List<StockMovementDto>> GetMovementsAsync()
    {
        var movements = await _context.StockMovements
            .Include(m => m.Product)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        return _mapper.Map<List<StockMovementDto>>(movements);
    }
}