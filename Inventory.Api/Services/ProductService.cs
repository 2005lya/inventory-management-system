using Inventory.Api.Data;
using Inventory.Api.DTOs;
using Inventory.Api.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Inventory.Api.Repositories;

namespace Inventory.Api.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;

    public ProductService(
    IProductRepository productRepository,
    IMapper mapper)
{
    _productRepository = productRepository;
    _mapper = mapper;
}

    public async Task<PagedResult<ProductDto>> GetAllAsync(ProductQueryDto query)
{
    var page = query.Page < 1 ? 1 : query.Page;
    var pageSize = query.PageSize < 1 ? 20 : query.PageSize;

    var result = await _productRepository.GetPagedAsync(query);

    return new PagedResult<ProductDto>
    {
        Items = _mapper.Map<List<ProductDto>>(result.Products),
        TotalCount = result.TotalCount,
        Page = page,
        PageSize = pageSize,
        TotalPages = (int)Math.Ceiling(result.TotalCount / (double)pageSize)
    };
}

    public async Task<ProductDto?> GetByIdAsync(int id)
{
    // var product = await _context.Products
    //     .Include(p => p.Category)
    //     .Include(p => p.Supplier)
    //     .FirstOrDefaultAsync(p => p.Id == id);

    var product =
    await _productRepository.GetByIdAsync(id);

    if (product == null)
    {
        return null;
    }

    return _mapper.Map<ProductDto>(product);
}

   public async Task<ProductDto?> CreateAsync(CreateProductDto dto)
{
    var categoryExists =
        await _productRepository.CategoryExistsAsync(dto.CategoryId);

    if (!categoryExists)
    {
        return null;
    }

    var supplierExists =
        await _productRepository.SupplierExistsAsync(dto.SupplierId);

    if (!supplierExists)
    {
        return null;
    }

    var product = _mapper.Map<Product>(dto);

    await _productRepository.AddAsync(product);
    await _productRepository.SaveChangesAsync();

    product = await _productRepository.GetByIdAsync(product.Id)
        ?? product;

    return _mapper.Map<ProductDto>(product);
}
  public async Task<bool> UpdateAsync(int id, UpdateProductDto dto)
{
    var product = await _productRepository.GetByIdAsync(id);

    if (product == null)
    {
        return false;
    }

    _mapper.Map(dto, product);

    await _productRepository.SaveChangesAsync();

    return true;
}

   public async Task<bool> DeleteAsync(int id)
{
    var product = await _productRepository.GetByIdAsync(id);

    if (product == null)
    {
        return false;
    }

    _productRepository.Delete(product);
    await _productRepository.SaveChangesAsync();

    return true;
}
// }
//                 Id = p.Id,
//                 Sku = p.Sku,
//                 Name = p.Name,
//                 Quantity = p.Quantity,
//                 LowStockThreshold = p.LowStockThreshold
//             })
//             .ToListAsync();
//     }

//     public async Task<ProductDto?> GetByIdAsync(int id)
//     {
//         return await _context.Products
//             .Where(p => p.Id == id)
//             .Select(p => new ProductDto
//             {
//                 Id = p.Id,
//                 Sku = p.Sku,
//                 Name = p.Name,
//                 Quantity = p.Quantity,
//                 LowStockThreshold = p.LowStockThreshold
//             })
//             .FirstOrDefaultAsync();
//     }

//     public async Task<ProductDto> CreateAsync(CreateProductDto dto)
//     {
//         var product = new Product
//         {
//             Sku = dto.Sku,
//             Name = dto.Name,
//             Quantity = dto.Quantity,
//             LowStockThreshold = dto.LowStockThreshold
//         };

//         _context.Products.Add(product);
//         await _context.SaveChangesAsync();

//         return new ProductDto
//         {
//             Id = product.Id,
//             Sku = product.Sku,
//             Name = product.Name,
//             Quantity = product.Quantity,
//             LowStockThreshold = product.LowStockThreshold
//         };
//     }

//     public async Task<bool> UpdateAsync(int id, UpdateProductDto dto)
//     {
//         var product = await _context.Products.FindAsync(id);

//         if (product == null)
//         {
//             return false;
//         }

//         product.Sku = dto.Sku;
//         product.Name = dto.Name;
//         product.Quantity = dto.Quantity;
//         product.LowStockThreshold = dto.LowStockThreshold;

//         await _context.SaveChangesAsync();

//         return true;
//     }

//     public async Task<bool> DeleteAsync(int id)
//     {
//         var product = await _context.Products.FindAsync(id);

//         if (product == null)
//         {
//             return false;
//         }

//         _context.Products.Remove(product);
//         await _context.SaveChangesAsync();

//         return true;
//     }

}