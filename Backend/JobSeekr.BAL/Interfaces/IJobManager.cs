using JobSeekr.Common.Models;
using JobSeekr.DAL.Aggregate.Jobs;
using JobSeekr.Entities.Models;

namespace JobSeekr.BAL.Interfaces
{
    public interface IJobManager
    {
        Task<Response<JobModel>> AddJob(JobModel job);

        Task<Response<JobModel>> UpdateJob(JobModel job);

        Task<Response<bool>> DeleteJob(Guid ID);

        Task<Response<JobModel?>> GetJobByID(Guid ID);

        Task<Response<List<JobModel>>> GetAllJobs(Guid id);
        Task<Response<List<JobTypeModel>>> GetAllJobTypes();
        Task<Response<List<JobScheduleModel>>> GetAllJobSchedules();
        Task<Response<List<JobBasicEducationModel>>> GetAllJobBasicEducations();
        Task<Response<EmployerModel>> GetEmployerByID(Guid ID);
        Task<Response<EmployerModel>> UpdateEmployer(EmployerModel employer);
        Task<Response<List<UserModel>>> GetAllEmployers(int? number);
        Task<Response<List<JobModel>>> GetAllJobsByAllCompanies(int number);
        Task<Response<bool>> CheckForAppliedJob(Guid jobId,Guid userId);
        Task<Response<bool>> ApplyForJob(Guid jobId, Guid userId);
        Task<Response<List<UserModel>>> GetAppliedUsers(Guid jobId);
        Task<Response<List<JobModel>>> GetAllAppliedJobs(Guid userId);
        Task<Response<List<AppliedJobModel>>> GetAppliedJobs(Guid userId);
    }
}