using JobSeekr.BAL.Interfaces;
using JobSeekr.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace JobSeekr.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManager _userManager;
        public UserController(IUserManager userManager)
        {
            _userManager = userManager ??
                throw new ArgumentNullException(nameof(userManager));
        }
        [HttpPost]
        [Route("AddUser")]
        public async Task<IActionResult> InsertUser(UserModel user)
        {
            var result = await _userManager.RegisterUser(user);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("CheckForExistingEmail")]
        public async Task<IActionResult> CheckForExistingEmail(string email)
        {
            var result = await _userManager.CheckForExistingEmail(email);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpPost]
        [Route("LoginUser")]
        public async Task<IActionResult> LoginUser(UserModel user)
        {
            var result = await _userManager.LoginUser(user);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("GetUserType")]
        public async Task<IActionResult> FetchUserType()
        {
            var result = await _userManager.FetchUserType();
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.GetUsers();
            users.ResponseMessage(HttpContext.Response.StatusCode, users.StateModel);
            return new OkObjectResult(users);
        }

    }
}
