
using JobSeekr.DAL.Aggregate;

namespace JobSeekr.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task<User> RegisterUser(User user);
        Task<User> LoginUser(User user);
        Task<IEnumerable<UserType>> FetchUserType();
        Task<bool> CheckForExistingEmail(string Email);
        Task<List<User>> GetUsers();
    }
}
