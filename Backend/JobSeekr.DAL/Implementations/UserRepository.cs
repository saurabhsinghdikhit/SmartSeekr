using JobSeekr.DAL.Aggregate;
using JobSeekr.DAL.Context;
using JobSeekr.DAL.Interfaces;
using JobSeekr.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace JobSeekr.DAL.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly APIDbContext _DBContext;
        public UserRepository(APIDbContext context)
        {
            _DBContext = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<User> LoginUser(User user)
        {
            User userDetails = await _DBContext.Users.Where(x => x.Email == user.Email && x.Password == user.Password).Include(x => x.Employee).Include(x => x.Employer).Include(x=>x.UserType).FirstOrDefaultAsync();
            if (userDetails != null)
            {
                user = userDetails;
            }
            return user;
        }

        public async Task<User> RegisterUser(User user)
        {
           User userDetails = _DBContext.Users.FirstOrDefault(x => x.Email == user.Email)!;
            
            if (userDetails == null)
            {
                user.ID = Guid.NewGuid();
                _DBContext.Users.Add(user);
                await _DBContext.SaveChangesAsync();
            }
            return user;
        }

        public async Task<IEnumerable<UserType>> FetchUserType()
        {
            return await _DBContext.UserTypes.Where(x=>x.Name!= "Admin").OrderBy(x=>x.Name).ToListAsync();
        }

        public async Task<bool> CheckForExistingEmail(string Email)
        {
            User userDetails = await _DBContext.Users.FirstOrDefaultAsync(x => x.Email == Email);
            return userDetails==null?false: true;
        }

        public async Task<List<User>> GetUsers()
        {
            return await _DBContext.Users
                .Include(x => x.Employee)
                .Include(x => x.Employer)
                .Include(x => x.UserType)
                .ToListAsync();
        }
    }
}
