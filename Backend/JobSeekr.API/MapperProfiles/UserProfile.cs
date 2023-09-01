using AutoMapper;
using JobSeekr.DAL.Aggregate;
using JobSeekr.DAL.Aggregate.Employees;
using JobSeekr.Entities.Models;

namespace JobSeekr.API.MapperProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<UserModel, User>();
            CreateMap<UserType, UserTypeModel>();
            CreateMap<UserTypeModel, UserType>();
            CreateMap<Employee, EmployeeModel>();
            CreateMap<EmployeeModel, Employee>();
            CreateMap<EmployerModel, Employer>();
            CreateMap<Employer, EmployerModel>();
            CreateMap<EducationDetail, EducationDetailModel>();
            CreateMap<EducationDetailModel, EducationDetail>();
            CreateMap<ProfessionalDetail, ProfessionalDetailsModel>();
            CreateMap<ProfessionalDetailsModel, ProfessionalDetail>();
            CreateMap<EmployeeResume, EmployeeResumeModel>();
            CreateMap<EmployeeResumeModel, EmployeeResume>();
        }
            
    }
}
