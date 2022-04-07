using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

using FurnitureUser.Models;
using FurnitureProduct.Models;
using FurnitureRebate.Models;
using FurnitureOrder.Models;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;



var builder = WebApplication.CreateBuilder(args);
// Db connection
var connectionString = builder.Configuration.GetConnectionString("FurnitureDB") ?? "Data Source=FurnitureDB.db";


builder.Services.AddEndpointsApiExplorer();
// Linking to SQLite DB
builder.Services.AddSqlite<UserDb>(connectionString);
builder.Services.AddSqlite<ProductDb>(connectionString);
builder.Services.AddSqlite<RebateDb>(connectionString);
builder.Services.AddSqlite<OrderStatusDb>(connectionString);
builder.Services.AddSqlite<OrderDb>(connectionString);
builder.Services.AddSqlite<OrderLineDb>(connectionString);

builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("V1", new OpenApiInfo{
        Title="Furniture Inc. API",
        Description="The Furniture Inc. API ready for connectind and integrating with services.",
        Version="V1"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Scheme = "bearer",
        Description = "Please insert JWT token into field"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

// Add JWT Authentication
builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
       ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/V1/swagger.json", "Furniture Inc. API V1");
});

// Use authentication
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hello World!");

/* User authentication */
app.MapPost("/auth/getToken", [AllowAnonymous] async (UserDb db, UserDto loginUser) => {
    var user = await db.User.Where(usr => usr.username == loginUser.username && usr.password == loginUser.password).FirstOrDefaultAsync();
    if(user is null) return Results.Unauthorized();
    var issuer = builder.Configuration["Jwt:Issuer"];
    var audience = builder.Configuration["Jwt:Audience"];
    var jwtKey = builder.Configuration["Jwt:Key"];
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    // Define jwt token for token creation
    var jwtTokenHandler = new JwtSecurityTokenHandler();

    var key = Encoding.ASCII.GetBytes(jwtKey);

    var tokenDescriptor = new SecurityTokenDescriptor {
        Subject = new ClaimsIdentity(new [] {
            new Claim("id", user.id.ToString()),
            new Claim(JwtRegisteredClaimNames.Sub, user.id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        }),
        Expires = DateTime.UtcNow.AddHours(24), // Should be synced with frontend timeout
        Audience = audience,
        Issuer = issuer,
        // here we are adding the encryption alogorithim information which will be used to decrypt our token
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
    };

    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
    var jwtToken = jwtTokenHandler.WriteToken(token);
    return Results.Ok(jwtToken);
});

app.MapPost("/auth/checkContext", (HttpContext context) => {
    var userId = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
    return userId;
});

/* Users */
app.MapGet("/users", async (UserDb db) => {
    var users = await db.User.ToListAsync();
    return users.Where(obj => obj.is_active == true);
});

app.MapPost("/users/add", async (UserDb db, User user) => {
    await db.User.AddAsync(user);
    await db.SaveChangesAsync();
    return Results.Created($"/users/{user.id}", user);
});

app.MapPut("/users/edit/{id}", async (UserDb db, User updateUser, int id) => {
    var user = await db.User.FindAsync(id);
    if (user is null) return Results.NotFound();
    user.fullname = updateUser.fullname;
    user.username = updateUser.username;
    user.password = updateUser.password;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/users/delete/{id}", async (UserDb db, int id) => {
    var user = await db.User.FindAsync(id);
    if (user is null) return Results.NotFound();
    user.is_active = false;
    await db.SaveChangesAsync();
    return Results.Ok();
});

/* Products */
app.MapGet("/products", async (ProductDb db) => {
    var products = await db.Product.ToListAsync();
    return products.Where(obj => obj.is_active == true);
});

app.MapPost("/products/add", async (ProductDb db, Product product) => {
    await db.Product.AddAsync(product);
    await db.SaveChangesAsync();
    return Results.Created($"/products/{product.id}", product);
});

app.MapPut("/products/edit/{id}", async (ProductDb db, Product updateProduct, int id) => {
    var product = await db.Product.FindAsync(id);
    if(product is null) return Results.NotFound();
    product.name = updateProduct.name;
    product.price = updateProduct.price;
    product.category = updateProduct.category;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/products/delete/{id}", async (ProductDb db, int id) => {
    var product = await db.Product.FindAsync(id);
    if (product is null) return Results.NotFound();
    product.is_active = false;
    await db.SaveChangesAsync();
    return Results.Ok();
});

/* Rebates */
app.MapGet("/rebates", async (RebateDb db, int id) => await db.Rebate.ToListAsync());

app.MapPost("/rebates/add", async (RebateDb db, Rebate rebate) => {
    await db.Rebate.AddAsync(rebate);
    await db.SaveChangesAsync();
    return Results.Created($"/rebates/{rebate.id}", rebate);
});

app.MapPut("/rebates/edit/{id}", async (RebateDb db, Rebate updateRebate, int id) => {
    var rebate = await db.Rebate.FindAsync(id);
    if (rebate is null) return Results.NotFound();
    rebate.subject = updateRebate.subject;
    rebate.value = updateRebate.value;
    rebate.percentage = updateRebate.percentage;
    rebate.product_specific = updateRebate.product_specific;
    rebate.product = updateRebate.product;
    rebate.category_rebate = updateRebate.category_rebate;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/rebates/delete/{id}", async(RebateDb db, int id) => {
    var rebate = await db.Rebate.FindAsync(id);
    if (rebate is null) return Results.NotFound();
    db.Rebate.Remove(rebate);
    await db.SaveChangesAsync();
    return Results.Ok();
});

/* Order statuses */
app.MapGet("/orders/status_options", async (OrderStatusDb db) => await db.OrderStatus.ToListAsync());

app.MapPost("/orders/status_options/add", async (OrderStatusDb db, OrderStatus status) => {
    await db.OrderStatus.AddAsync(status);
    await db.SaveChangesAsync();
    return Results.Created($"/orders/status_options/{status.id}", status);
});

/* Orders */
app.MapGet("/orders", async (OrderDb db) => await db.Order.ToListAsync());

app.MapPost("/orders/add", async (OrderDb db, Order order) => {
    await db.Order.AddAsync(order);
    await db.SaveChangesAsync();
    return Results.Created($"/orders/{order.id}", order);
});

app.MapDelete("/orders/delete/{id}", async (OrderDb db, OrderLineDb dbLine, int id) => {
    var order = await db.Order.FindAsync(id);
    if (order is null) return Results.NotFound();
    // Delete order lines first
    var orderLines = await dbLine.OrderLine.ToListAsync();
    foreach(OrderLine el in orderLines) {
        dbLine.OrderLine.Remove(el);
    }
    await dbLine.SaveChangesAsync();
    // Delete the actual order
    db.Order.Remove(order);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.MapGet("/orders/lines/{id}", async (OrderDb db, OrderLineDb dbLine, int id) => {
    var order = await db.Order.FindAsync(id);
    if (order is null) return null;
    // Filter the order lines by
    var lines = await dbLine.OrderLine.Where(line => line.order == order).ToListAsync();
    return lines;
});

app.MapPost("/orders/lines/{id}", async (OrderDb db, OrderLineDb dbLine, OrderLine orderLine, int id) => {
    var order = await db.Order.FindAsync(id);
    if (order is null) return null;
    // Filter the order lines by
    await dbLine.OrderLine.AddAsync(orderLine);
    await dbLine.SaveChangesAsync();
    return Results.Created($"/orders/lines/line/{orderLine.id}", orderLine);
});

app.Run();

record UserDto (string username, string password);