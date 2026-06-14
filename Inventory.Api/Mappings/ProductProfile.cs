using AutoMapper;
using Inventory.Api.DTOs;
using Inventory.Api.Models;

namespace Inventory.Api.Mappings;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>()
    .ForMember(
        dest => dest.CategoryName,
        opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty)
    )
    .ForMember(
        dest => dest.SupplierName,
        opt => opt.MapFrom(src => src.Supplier != null ? src.Supplier.Name : string.Empty)
    );
        CreateMap<CreateProductDto, Product>();

        CreateMap<UpdateProductDto, Product>();

        CreateMap<Category, CategoryDto>();
        CreateMap<CreateCategoryDto, Category>();
        CreateMap<UpdateCategoryDto, Category>();
        CreateMap<Supplier, SupplierDto>();
        CreateMap<CreateSupplierDto, Supplier>();
        CreateMap<UpdateSupplierDto, Supplier>();
        CreateMap<StockMovement, StockMovementDto>()
    .ForMember(
        dest => dest.ProductName,
        opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : string.Empty)
    );
    }
}