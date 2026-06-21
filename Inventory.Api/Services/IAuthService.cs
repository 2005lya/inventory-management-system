using Inventory.Api.DTOs;

namespace Inventory.Api.Services;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterDto dto);

    Task<AuthResponseDto?> LoginAsync(LoginDto dto);

    Task<AuthResponseDto?> MicrosoftLoginAsync(MicrosoftLoginDto dto);

    Task<AuthResponseDto?> RefreshTokenAsync(RefreshTokenDto dto);

}