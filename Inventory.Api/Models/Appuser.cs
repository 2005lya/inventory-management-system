namespace Inventory.Api.Models;

public class AppUser
{
    public int Id { get; set; }

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;
    
    public string Role { get; set; } = "User";
    public List<RefreshToken> RefreshTokens { get; set; } = new();

}