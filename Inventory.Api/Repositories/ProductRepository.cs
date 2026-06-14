using Inventory.Api.Data;
using Inventory.Api.Models;
using Microsoft.EntityFrameworkCore;
using Inventory.Api.DTOs;

namespace Inventory.Api.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .ToListAsync();
    }

    public async Task<(List<Product> Products, int TotalCount)> GetPagedAsync(
    ProductQueryDto query)
{
    var productsQuery = _context.Products
        .Include(p => p.Category)
        .Include(p => p.Supplier)
        .AsQueryable();

    if (!string.IsNullOrWhiteSpace(query.Search))
    {
        productsQuery = productsQuery.Where(p =>
            p.Name.Contains(query.Search) ||
            p.Sku.Contains(query.Search)
        );
    }

    if (query.CategoryId.HasValue)
    {
        productsQuery = productsQuery.Where(p =>
            p.CategoryId == query.CategoryId.Value
        );
    }

    if (query.SupplierId.HasValue)
    {
        productsQuery = productsQuery.Where(p =>
            p.SupplierId == query.SupplierId.Value
        );
    }

    var page = query.Page < 1 ? 1 : query.Page;
    var pageSize = query.PageSize < 1 ? 20 : query.PageSize;

    var totalCount = await productsQuery.CountAsync();

    var products = await productsQuery
        .OrderBy(p => p.Id)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return (products, totalCount);
}

public async Task AddAsync(Product product)
{
    await _context.Products.AddAsync(product);
}

public void Delete(Product product)
{
    _context.Products.Remove(product);
}

public async Task SaveChangesAsync()
{
    await _context.SaveChangesAsync();
}

public async Task<bool> CategoryExistsAsync(int categoryId)
{
    return await _context.Categories.AnyAsync(c => c.Id == categoryId);
}

public async Task<bool> SupplierExistsAsync(int supplierId)
{
    return await _context.Suppliers.AnyAsync(s => s.Id == supplierId);
}
}