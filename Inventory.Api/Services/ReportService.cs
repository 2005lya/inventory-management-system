using AutoMapper;
using Inventory.Api.Data;
using Inventory.Api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Services;

public class ReportService : IReportService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ReportService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ProductDto>> GetLowStockAsync()
    {
        var products = await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .Where(p => p.Quantity <= p.LowStockThreshold)
            .ToListAsync();

        return _mapper.Map<List<ProductDto>>(products);
    }

    public async Task<List<StockMovementDto>> GetStockMovementsAsync()
    {
        var movements = await _context.StockMovements
            .Include(m => m.Product)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        return _mapper.Map<List<StockMovementDto>>(movements);
    }
}