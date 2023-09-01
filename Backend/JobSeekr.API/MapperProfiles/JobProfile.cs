using AutoMapper;
using JobSeekr.DAL.Aggregate.Jobs;
using JobSeekr.Entities.Models;

namespace JobSeekr.API.MapperProfiles
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            CreateMap<Job, JobModel>();
            CreateMap<JobModel, Job>();
            CreateMap<JobBasicEducation, JobBasicEducationModel>();
            CreateMap<JobBasicEducationModel, JobBasicEducation>();
            CreateMap<JobType, JobTypeModel>();
            CreateMap<JobTypeModel, JobType>();
            CreateMap<JobSchedule, JobScheduleModel>();
            CreateMap<JobScheduleModel, JobSchedule>();
            CreateMap<AppliedJob, AppliedJobModel>();
            CreateMap<AppliedJobModel, AppliedJob>();
        }
            
    }
}
