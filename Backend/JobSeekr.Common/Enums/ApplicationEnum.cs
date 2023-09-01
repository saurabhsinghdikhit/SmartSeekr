using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.Common.Enums
{
    public static class ApplicationEnum
    {
        public enum ResponseStatusCode
        {
            Success = 200,
            WrongOperation = 404,
            DataNotFound = 400,
            NoMoreData = 204,
            AlreadyExitData = 208,
            ValidationError = 409,
            Unauthorized = 401
        }
    }
}
