using JobSeekr.DAL.Aggregate;
using JobSeekr.DAL.Aggregate.Jobs;
using JobSeekr.Entities.Models;

namespace JobSeekr.DAL.Interfaces
{
    public interface IJobRepository
    {
        Task<Job> AddJob(Job job);

        Task<Job> UpdateJob(Job job);
        
        Task<bool> DeleteJob(Guid ID);

        Task<Job?> GetJobByID(Guid ID);

        Task<List<Job>> GetAllJobs(Guid id);
        Task<List<JobType>> GetAllJobTypes();
        Task<List<JobSchedule>> GetAllJobSchedules();
        Task<List<JobBasicEducation>> GetAllJobBasicEducations();
        Task<Employer> GetEmployeeByID(Guid ID);
        Task<Employer> UpdateEmployer(Employer employer);
        Task<List<User>> GetAllEmployers(int? number);
        Task<List<Job>> GetAllJobsByAllCompanies(int number);
        Task<bool> CheckForAppliedJob(Guid jobId, Guid userId);
        Task<bool> ApplyForJob(Guid jobId, Guid userId);
        Task<List<User>> GetAllAppliedUser(Guid jobId);
        Task<List<Job>> GetAllAppliedJobs(Guid userId);
        Task<List<AppliedJob>> GetAppliedJobs(Guid userId);
    }
}