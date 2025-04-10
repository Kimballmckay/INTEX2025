using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Intex2025.API.Services;

public class CustomUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<IdentityUser>
{
    private readonly UserManager<IdentityUser> _userManager;

    public CustomUserClaimsPrincipalFactory(
        UserManager<IdentityUser> userManager,
        IOptions<IdentityOptions> optionsAccessor)
        : base(userManager, optionsAccessor)
    {
        _userManager = userManager;
    }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(IdentityUser user)
    {
        var identity = await base.GenerateClaimsAsync(user);

        // Add email claim
        identity.AddClaim(new Claim(ClaimTypes.Email, user.Email ?? ""));

        // Add role claims
        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles)
        {
            identity.AddClaim(new Claim(ClaimTypes.Role, role));
        }

        return identity;
    }
}