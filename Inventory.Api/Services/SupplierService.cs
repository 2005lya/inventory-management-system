using AutoMapper;
using Inventory.Api.Data;
using Inventory.Api.DTOs;
using Inventory.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Services;

public class SupplierService : ISupplierService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public SupplierService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<SupplierDto>> GetAllAsync()
    {
        var suppliers = await _context.Suppliers.ToListAsync();

        return _mapper.Map<List<SupplierDto>>(suppliers);
    }

    public async Task<SupplierDto?> GetByIdAsync(int id)
    {
        var supplier = await _context.Suppliers.FindAsync(id);

        if (supplier == null)
        {
            return null;
        }

        return _mapper.Map<SupplierDto>(supplier);
    }

    public async Task<SupplierDto> CreateAsync(CreateSupplierDto dto)
    {
        var supplier = _mapper.Map<Supplier>(dto);

        _context.Suppliers.Add(supplier);
        await _context.SaveChangesAsync();

        return _mapper.Map<SupplierDto>(supplier);
    }

    public async Task<bool> UpdateAsync(int id, UpdateSupplierDto dto)
    {
        var supplier = await _context.Suppliers.FindAsync(id);

        if (supplier == null)
        {
            return false;
        }

        _mapper.Map(dto, supplier);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var supplier = await _context.Suppliers.FindAsync(id);

        if (supplier == null)
        {
            return false;
        }

        _context.Suppliers.Remove(supplier);
        await _context.SaveChangesAsync();

        return true;
    }
}