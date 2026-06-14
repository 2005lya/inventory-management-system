using Inventory.Api.DTOs;

namespace Inventory.Api.Services;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterDto dto);

    Task<string?> LoginAsync(LoginDto dto);
}