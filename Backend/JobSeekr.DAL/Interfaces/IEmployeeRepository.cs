using JobSeekr.DAL.Aggregate.Employees;
using JobSeekr.Entities.Models;

namespace JobSeekr.DAL.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<Employee> GetEmployeeByID(Guid ID);
        Task<Employee> UpdateEmployee(Employee objEmployee);
        Task<IEnumerable<EducationDetail>> GetEmployeeEducation(Guid ID);
        Task<IEnumerable<EducationDetail>> AddOrUpdateEducationDetails(EducationDetail educationDetail);
        Task<IEnumerable<ProfessionalDetail>> GetProfessionalDetails(Guid ID);
        Task<IEnumerable<ProfessionalDetail>> AddOrUpdateProfessionalDetails(ProfessionalDetail professionalDetail);
        Task<EmployeeResume> GetResumeOfEmployee(Guid userID);
        Task<EmployeeResume> UploadEmployeeResume(EmployeeResume employeeResume);
    }
}
