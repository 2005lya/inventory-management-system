using Inventory.Api.Data;
using Inventory.Api.DTOs;
using Inventory.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography;

namespace Inventory.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
    AppDbContext context,
    IConfiguration configuration,
    ILogger<AuthService> logger)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<bool> RegisterAsync(RegisterDto dto)
    {
        var exists = await _context.Users
            .AnyAsync(u => u.Email == dto.Email);

        if (exists)
        {
            _logger.LogWarning(
       "Registration failed. Email {Email} already exists.",
       dto.Email);

            return false;
        }

        var user = new AppUser
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "User"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        _logger.LogInformation(
    "User {Email} registered successfully.",
    dto.Email);

        return true;
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
{
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
        {
            _logger.LogWarning(
                "Login failed. User {Email} not found.",
                dto.Email);

            return null;
        }
        var validPassword = BCrypt.Net.BCrypt.Verify(
            dto.Password,
            user.PasswordHash
        );

        var accessToken = GenerateJwtToken(user);
    var refreshToken = GenerateRefreshToken();

    _context.RefreshTokens.Add(new RefreshToken
    {
        Token = refreshToken,
        AppUserId = user.Id,
        ExpiresAt = DateTime.UtcNow.AddDays(30)
    });

    await _context.SaveChangesAsync();

    return new AuthResponseDto
    {
        AccessToken = accessToken,
        RefreshToken = refreshToken
    };
    }

    public async Task<AuthResponseDto?> RefreshTokenAsync(RefreshTokenDto dto)
{
    var storedToken = await _context.RefreshTokens
        .Include(r => r.AppUser)
        .FirstOrDefaultAsync(r => r.Token == dto.RefreshToken);

    if (storedToken == null)
    {
        return null;
    }

    if (storedToken.IsRevoked)
    {
        return null;
    }

    if (storedToken.ExpiresAt < DateTime.UtcNow)
    {
        return null;
    }

    storedToken.IsRevoked = true;

    var newAccessToken = GenerateJwtToken(storedToken.AppUser);
    var newRefreshToken = GenerateRefreshToken();

    _context.RefreshTokens.Add(new RefreshToken
    {
        Token = newRefreshToken,
        AppUserId = storedToken.AppUser.Id,
        ExpiresAt = DateTime.UtcNow.AddDays(30)
    });

    await _context.SaveChangesAsync();

    return new AuthResponseDto
    {
        AccessToken = newAccessToken,
        RefreshToken = newRefreshToken
    };
}

    public async Task<AuthResponseDto?> MicrosoftLoginAsync(MicrosoftLoginDto dto)
{
    var handler = new JwtSecurityTokenHandler();

    if (!handler.CanReadToken(dto.AccessToken))
    {
        _logger.LogWarning("Microsoft login failed. Invalid token format.");
        return null;
    }

    var token = handler.ReadJwtToken(dto.AccessToken);

    var issuer = token.Issuer;

    if (!issuer.StartsWith("https://login.microsoftonline.com/"))
    {
        _logger.LogWarning("Microsoft login failed. Invalid issuer: {Issuer}", issuer);
        return null;
    }

    var email =
        token.Claims.FirstOrDefault(c => c.Type == "preferred_username")?.Value
        ?? token.Claims.FirstOrDefault(c => c.Type == "email")?.Value
        ?? token.Claims.FirstOrDefault(c => c.Type == "upn")?.Value;

    if (string.IsNullOrWhiteSpace(email))
    {
        _logger.LogWarning("Microsoft login failed. Email claim not found.");
        return null;
    }

    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == email);

    if (user == null)
    {
        user = new AppUser
        {
            Email = email,
            PasswordHash = string.Empty,
            Role = "Admin"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        _logger.LogInformation(
            "Microsoft user {Email} created successfully.",
            email);
    }

    _logger.LogInformation(
        "Microsoft user {Email} logged in successfully.",
        email);

    var accessToken = GenerateJwtToken(user);
var refreshToken = GenerateRefreshToken();

_context.RefreshTokens.Add(new RefreshToken
{
    Token = refreshToken,
    AppUserId = user.Id,
    ExpiresAt = DateTime.UtcNow.AddDays(30)
});

await _context.SaveChangesAsync();

return new AuthResponseDto
{
    AccessToken = accessToken,
    RefreshToken = refreshToken
};
}

    private string GenerateJwtToken(AppUser user)
    {
        var claims = new[]
        {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
        );

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }

    private string GenerateRefreshToken()
{
    var randomBytes = RandomNumberGenerator.GetBytes(64);

    return Convert.ToBase64String(randomBytes);
}



}

