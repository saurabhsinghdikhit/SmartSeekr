using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.Common.Models
{
    public static class AppMessageConstant
    {
        public const string SystemError = "Something is wrong, system can’t perform operation.";
        public const string ResultError = "error";
        public const string ResultSuccess = "success";
        public const string APINotFound = "APINotFound";
        public const string NoData = "No data available.";
        public const string InvalidUser = "Entered username/password is incorrect";
        public const string UserDoesExist = "User does not exist";
        public const string EmailExist = "Email already exists";
        public const string UserExist = "User already exists";
        public const string CompanyExist = "Company already exists";
        public const string MobileNoExist = "Mobile no already exists";
    }
}
