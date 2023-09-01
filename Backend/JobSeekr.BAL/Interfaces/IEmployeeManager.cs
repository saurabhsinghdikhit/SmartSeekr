using JobSeekr.Common.Models;
using JobSeekr.DAL.Aggregate;
using JobSeekr.Entities.Models;

namespace JobSeekr.BAL.Interfaces
{
    public interface IEmployeeManager
    {
        Task<Response<EmployeeModel>> GetEmployeeByID(Guid ID);
        Task<Response<EmployeeModel>> UpdateEmployee(EmployeeModel objEmployee);
        Task<Response<IEnumerable<EducationDetailModel>>> GetEmployeeEducation(Guid ID);
        Task<Response<IEnumerable<EducationDetailModel>>> AddOrUpdateEducationDetails(EducationDetailModel educationDetail);
        Task<Response<IEnumerable<ProfessionalDetailsModel>>> GetProfessionalDetails(Guid ID);
        Task<Response<IEnumerable<ProfessionalDetailsModel>>> AddOrUpdateProfessionalDetails(ProfessionalDetailsModel educationDetail);
        Task<Response<EmployeeResumeModel>> GetResumeOfEmployee(Guid ID);
        Task<Response<EmployeeResumeModel>> UploadEmployeeResume(EmployeeResumeModel employeeResume);
    }
}
