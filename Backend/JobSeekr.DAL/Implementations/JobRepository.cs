using JobSeekr.DAL.Aggregate;
using JobSeekr.DAL.Aggregate.Jobs;
using JobSeekr.DAL.Context;
using JobSeekr.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobSeekr.DAL.Implementations
{
    public class JobRepository : IJobRepository
    {
        private readonly APIDbContext _appDBContext;

        public JobRepository(APIDbContext context)
        {
            _appDBContext = context ??
                throw new ArgumentNullException(nameof(context));
        }

        public async Task<Job> AddJob(Job job)
        {
            job.Id = Guid.NewGuid();
            job.Created_At = DateTime.Now;
            await _appDBContext.Jobs.AddAsync(job);
            await _appDBContext.SaveChangesAsync();
            job.Employer = _appDBContext.Employers.FirstOrDefault(e => e.Id == job.EmployerId)!;
            return job;
        }

        public async Task<Job> UpdateJob(Job job)
        {
            job.Employer = _appDBContext.Employers.FirstOrDefault(e => e.Id == job.EmployerId);
            _appDBContext.Entry(job).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return job;
        }

        public async Task<bool> DeleteJob(Guid ID)
        {
            var job = new Job { Id = ID };
            _appDBContext.Entry(job).State = EntityState.Deleted;
            await _appDBContext.SaveChangesAsync();
            return true;
        }

        public async Task<Job?> GetJobByID(Guid ID)
        {
            return await _appDBContext.Jobs.Include(j => j.Employer).SingleOrDefaultAsync(j => j.Id == ID);
        }

        public async Task<List<Job>> GetAllJobs(Guid id)
        {
            return await _appDBContext.Jobs.Include(j => j.Employer).Where(x=>x.EmployerId==id).OrderByDescending(x => x.Created_At).ToListAsync();
        }

        public async Task<List<JobType>> GetAllJobTypes()
        {
            return await _appDBContext.JobTypes.ToListAsync();
        }

        public async Task<List<JobSchedule>> GetAllJobSchedules()
        {
            return await _appDBContext.JobSchedules.ToListAsync();
        }

        public async Task<List<JobBasicEducation>> GetAllJobBasicEducations()
        {
            return await _appDBContext.JobBasicRequiredEducation.ToListAsync();
        }

        public async Task<Employer> GetEmployeeByID(Guid ID)
        {
            return await _appDBContext.Employers.FirstOrDefaultAsync(x => x.Id == ID)!;
        }

        public async Task<Employer> UpdateEmployer(Employer employer)
        {
            _appDBContext.Entry(employer).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return employer;
        }

        public async Task<List<User>> GetAllEmployers(int? number)
        {
            if(number == 0)
                return await _appDBContext.Users.Where(x=>x.UserType.Name== "Employer").Include(x=>x.Employer).ToListAsync();
            else
                return await _appDBContext.Users.Where(x => x.UserType.Name == "Employer").Take(number??4).Include(x => x.Employer).ToListAsync();
        }

        public async Task<List<Job>> GetAllJobsByAllCompanies(int number)
        {
            if (number == 0)
                return await _appDBContext.Jobs.Include(j => j.Employer).OrderByDescending(x=>x.Created_At).ToListAsync();
            else
                return await _appDBContext.Jobs.Take(number).Include(j => j.Employer).OrderByDescending(x => x.Created_At).ToListAsync();
        }

        public async Task<bool> CheckForAppliedJob(Guid jobId, Guid userId)
        {
            return await _appDBContext.AppliedJobs.AnyAsync(x => x.JobId == jobId && x.UserId == userId);
        }

        public async Task<bool> ApplyForJob(Guid jobId, Guid userId)
        {
            AppliedJob job = new AppliedJob();
            job.Id = Guid.NewGuid();
            job.AppliedOn = DateTime.Now;
            job.UserId = userId;
            job.JobId = jobId;
            await _appDBContext.AppliedJobs.AddAsync(job);
            await _appDBContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<User>> GetAllAppliedUser(Guid jobId)
        {
            return await _appDBContext.Users.Include(x => x.Employee).Include(x => x.EmployeeResume).Where(x => x.AppliedJob.JobId == jobId).ToListAsync();
            
        }

        public async Task<List<Job>> GetAllAppliedJobs(Guid userId)
        {
            var appliedJobs = await _appDBContext.AppliedJobs.Where(x => x.UserId == userId).ToListAsync();
            List<Job> jobs = new List<Job>();
            if (appliedJobs.Any())
            {
                foreach (var job in appliedJobs)
                {
                    jobs.Add(await _appDBContext.Jobs.Include(j => j.Employer).FirstOrDefaultAsync(x=>x.Id==job.JobId)!);
                }
            }
            return jobs;
        }

        public async Task<List<AppliedJob>> GetAppliedJobs(Guid userId)
        {
            return await _appDBContext.AppliedJobs
                //.Include(j => j.Job)
                //.Include(j => j.User)
                //.Include(j => j.Job.Employer)
                .Where(a => a.UserId == userId).ToListAsync();
        }
    }
}