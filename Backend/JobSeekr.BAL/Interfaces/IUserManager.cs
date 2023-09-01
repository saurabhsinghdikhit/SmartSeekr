using JobSeekr.Common.Models;
using JobSeekr.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.BAL.Interfaces
{
    public interface IUserManager
    {
        Task<Response<UserModel>> RegisterUser(UserModel user);
        Task<Response<UserModel>> CheckForExistingEmail(string Email);
        Task<Response<UserModel>> LoginUser(UserModel user);
        Task<Response<IEnumerable<UserTypeModel>>> FetchUserType();
        Task<Response<List<UserModel>>> GetUsers();
    }
}
