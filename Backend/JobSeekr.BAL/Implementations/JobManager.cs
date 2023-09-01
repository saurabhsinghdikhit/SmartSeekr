using AutoMapper;

//using Azure;
using JobSeekr.BAL.Interfaces;
using JobSeekr.Common.Models;
using JobSeekr.DAL.Aggregate;
using JobSeekr.DAL.Aggregate.Jobs;
using JobSeekr.DAL.Implementations;
using JobSeekr.DAL.Interfaces;
using JobSeekr.Entities.Models;
using System;
using static JobSeekr.Common.Enums.ApplicationEnum;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace JobSeekr.BAL.Implementations
{
    public class JobManager : IJobManager
    {
        private readonly IMapper _mapper;
        private readonly IJobRepository _jobRepository;

        public JobManager(IJobRepository jobRepository, IMapper mapper)
        {
            _jobRepository = jobRepository;
            _mapper = mapper;
        }

        public async Task<Response<JobModel>> AddJob(JobModel job)
        {
            var responseModel = new Response<JobModel>
            {
                Result = _mapper.Map<JobModel>(await _jobRepository.AddJob(_mapper.Map<Job>(job)))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<JobModel>> UpdateJob(JobModel job)
        {
            var responseModel = new Response<JobModel>
            {
                Result = _mapper.Map<JobModel>(await _jobRepository.UpdateJob(_mapper.Map<Job>(job)))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<bool>> DeleteJob(Guid ID)
        {
            var responseModel = new Response<bool>
            {
                Result = _mapper.Map<bool>(await _jobRepository.DeleteJob(ID))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<JobModel?>> GetJobByID(Guid ID)
        {
            var responseModel = new Response<JobModel?>
            {
                Result = _mapper.Map<JobModel?>(await _jobRepository.GetJobByID(ID))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<List<JobModel>>> GetAllJobs(Guid id)
        {
            var responseModel = new Response<List<JobModel>>
            {
                Result = _mapper.Map<List<JobModel>>(await _jobRepository.GetAllJobs(id))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<List<JobTypeModel>>> GetAllJobTypes()
        {
            var responseModel = new Response<List<JobTypeModel>>
            {
                Result = _mapper.Map<List<JobTypeModel>>(await _jobRepository.GetAllJobTypes())
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<List<JobScheduleModel>>> GetAllJobSchedules()
        {
            var responseModel = new Response<List<JobScheduleModel>>
            {
                Result = _mapper.Map<List<JobScheduleModel>>(await _jobRepository.GetAllJobSchedules())
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<List<JobBasicEducationModel>>> GetAllJobBasicEducations()
        {
            var responseModel = new Response<List<JobBasicEducationModel>>
            {
                Result = _mapper.Map<List<JobBasicEducationModel>>(await _jobRepository.GetAllJobBasicEducations())
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<EmployerModel>> GetEmployerByID(Guid ID)
        {
            var responseModel = new Response<EmployerModel>();
            responseModel.Result = _mapper.Map<EmployerModel>(await _jobRepository.GetEmployeeByID(ID)); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<EmployerModel>> UpdateEmployer(EmployerModel employer)
        {
            var responseModel = new Response<EmployerModel>();

            responseModel.Result = _mapper.Map<EmployerModel>(await _jobRepository.UpdateEmployer(_mapper.Map<Employer>(employer))); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<List<UserModel>>> GetAllEmployers(int? number)
        {
            var responseModel = new Response<List<UserModel>>
            {
                Result = _mapper.Map<List<UserModel>>(await _jobRepository.GetAllEmployers(number))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<List<JobModel>>> GetAllJobsByAllCompanies(int number)
        {
            var responseModel = new Response<List<JobModel>>
            {
                Result = _mapper.Map<List<JobModel>>(await _jobRepository.GetAllJobsByAllCompanies(number))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<bool>> CheckForAppliedJob(Guid jobId, Guid userId)
        {
            var responseModel = new Response<bool>
            {
                Result = _mapper.Map<bool>(await _jobRepository.CheckForAppliedJob(jobId, userId))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<bool>> ApplyForJob(Guid jobId, Guid userId)
        {
            var responseModel = new Response<bool>
            {
                Result = _mapper.Map<bool>(await _jobRepository.ApplyForJob(jobId, userId))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<List<UserModel>>> GetAppliedUsers(Guid jobId)
        {
            var responseModel = new Response<List<UserModel>>
            {
                Result = _mapper.Map<List<UserModel>>(await _jobRepository.GetAllAppliedUser(jobId))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<List<JobModel>>> GetAllAppliedJobs(Guid userId)
        {
            var responseModel = new Response<List<JobModel>>
            {
                Result = _mapper.Map<List<JobModel>>(await _jobRepository.GetAllAppliedJobs(userId))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }
          public async Task<Response<List<AppliedJobModel>>> GetAppliedJobs(Guid userId)
        {
            var responseModel = new Response<List<AppliedJobModel>>
            {
                Result = _mapper.Map<List<AppliedJobModel>>(await _jobRepository.GetAppliedJobs(userId))
            };
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

    }
}