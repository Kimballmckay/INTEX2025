using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Intex2025.API.Data;
using Intex2025.API.Services;


var builder = WebApplication.CreateBuilder(args);

// Add user secrets in development environment
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>(); // This will load user secrets
}

// Add services to the container.
builder.Services.AddControllers();

// 💡 Required for session support
builder.Services.AddDistributedMemoryCache();

// Add session services
builder.Services.AddSession(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.HttpOnly = true;
    options.Cookie.Name = ".AspNetCore.Session";
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add services to the container
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MovieConnection")));

// Security - Identity
builder.Services.AddDbContext<RecommendationsDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("RecommendationConnection")));

builder.Services.AddDbContext<MovieSimilarityDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MovieSimilarityConnection")));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

// Keep this here
builder.Services.AddAuthorization();

// Security - Add Identity services
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 14;
    options.Password.RequiredUniqueChars = 0;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Security - Identity options configuration
builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email; // Ensure email is stored in claims
});

// Security - Custom UserClaimsPrincipalFactory
builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

// Security - Configure Application Cookie
//builder.Services.ConfigureApplicationCookie(options =>
//{
    //options.Cookie.HttpOnly = true;
    //options.Cookie.SameSite = SameSiteMode.None; // Use None to allow cross-site cookies
    //options.Cookie.Name = ".AspNetCore.Identity.Application";
    //options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    //options.LoginPath = "/login";
//});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";

    // ✅ This blocks 302 -> /Account/Login on unauthorized access
    options.Events.OnRedirectToLogin = context =>
    {
        Console.WriteLine("‼️ RedirectToLogin intercepted");
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };

    // ✅ This blocks 403s from redirecting to a login/denied page
    options.Events.OnRedirectToAccessDenied = context =>
    {
        Console.WriteLine("‼️ RedirectToAccessDenied intercepted");
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
});


// CORS policy configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://mango-cliff-079731d1e.6.azurestaticapps.net") // Replace with your frontend URL
                .AllowCredentials() // Required to allow cookies
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});


builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");  // Move this above authentication/authorization
app.UseHttpsRedirection();

app.UseSession();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Security - Identity API
app.MapIdentityApi<IdentityUser>();

// Security - Logout endpoint
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Ensure authentication cookie is removed
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None,
        Path = "/",
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

// Info on logged-in user, are they authenticated?
app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com"; // Ensure it's never null
    return Results.Json(new { email = email }); // Return as JSON
}).RequireAuthorization();

app.MapGet("/ping", () => Results.Ok("✅ Backend is up and public route is working!"));

app.Run();
