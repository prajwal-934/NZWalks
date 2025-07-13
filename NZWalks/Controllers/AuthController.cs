using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NZWalks.Models.DTO;
using NZWalks.Repository;

namespace NZWalks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager ,ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }


        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            var existingUser = await userManager.FindByEmailAsync(registerRequestDto.Username);
            if (existingUser != null)
            {
                return BadRequest(new { error = "User already exists." });
            }

            var identityUser = new IdentityUser
            {
                UserName = registerRequestDto.Username,
                Email = registerRequestDto.Username
            };

            var identityResult = await userManager.CreateAsync(identityUser, registerRequestDto.Password);

            if (identityResult.Succeeded)
            {
                if (registerRequestDto.Roles != null && registerRequestDto.Roles.Length != 0)
                {
                    identityResult = await userManager.AddToRolesAsync(identityUser, registerRequestDto.Roles);

                    if (identityResult.Succeeded)
                    {
                        return Ok(new { message = "User was registered! Please login." });
                    }
                    else
                    {
                        return BadRequest(new { error = "Failed to assign roles." });
                    }
                }

                return Ok(new { message = "User was registered! Please login." });
            }

            return BadRequest(new { error = "User registration failed.", details = identityResult.Errors });
        }



        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            var user = await userManager.FindByEmailAsync(loginRequestDto.Username);

            if (user != null)
            {
                var checkPasswordResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

                if (checkPasswordResult)
                {
                    var roles = await userManager.GetRolesAsync(user);

                    var jwtToken = tokenRepository.CreateJWTToken(user, roles.ToList());

                    var response = new LoginResponseDto
                    {
                        JwtToken = jwtToken,
                    };

                    return Ok(response);
                }
            }

            return BadRequest(new { error = "Username or password is incorrect." });
        }

    }
}
