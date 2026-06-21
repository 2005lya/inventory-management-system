using Inventory.Api.DTOs;
using Inventory.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var success = await _authService.RegisterAsync(dto);

        if (!success)
        {
            return BadRequest("Email already exists");
        }

        return Ok("Registered successfully");
    }

    [HttpPost("login")]
public async Task<IActionResult> Login(LoginDto dto)
{
    var result = await _authService.LoginAsync(dto);

    if (result == null)
    {
        return Unauthorized("Invalid email or password");
    }

    return Ok(result);
}

  [HttpPost("microsoft-login")]
public async Task<IActionResult> MicrosoftLogin(MicrosoftLoginDto dto)
{
    var result = await _authService.MicrosoftLoginAsync(dto);

    if (result == null)
    {
        return Unauthorized("Invalid Microsoft token");
    }

    return Ok(result);
}

[HttpPost("refresh-token")]
public async Task<IActionResult> RefreshToken(RefreshTokenDto dto)
{
    var result = await _authService.RefreshTokenAsync(dto);

    if (result == null)
    {
        return Unauthorized("Invalid refresh token");
    }

    return Ok(result);
}
}