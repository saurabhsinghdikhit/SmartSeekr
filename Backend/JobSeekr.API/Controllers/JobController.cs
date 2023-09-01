using HeyRed.Mime;
using JobSeekr.BAL.Interfaces;
using JobSeekr.Common.Models;
using JobSeekr.DAL.Aggregate;
using JobSeekr.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace JobSeekr.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobManager _jobManager;
        public JobController(IJobManager jobManager)
        {
            _jobManager = jobManager ??
                throw new ArgumentNullException(nameof(jobManager));
        }
        

        [HttpPost]
        public async Task<IActionResult> AddJob(JobModel jobModel)
        {
            var result = await _jobManager.AddJob(jobModel);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateJob(JobModel jobModel)
        {
            var result = await _jobManager.UpdateJob(jobModel);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteJob(Guid ID)
        {
            var result = await _jobManager.DeleteJob(ID);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }

        [HttpGet("GetAllJobs/{Id}")]
        public async Task<IActionResult> GetAllJobs(string Id)
        {
            if (Id == "all")
            {
                var result = await _jobManager.GetAllJobsByAllCompanies(0);
                result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
                return new OkObjectResult(result);
            }
            else
            {
                var result = await _jobManager.GetAllJobs(Guid.Parse(Id));
                result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
                return new OkObjectResult(result);
            }
        }

        [HttpGet]
        [Route("{Id}")]
        public async Task<IActionResult> GetJobByID(Guid Id)
        {
            var result = await _jobManager.GetJobByID(Id);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet("GetAllJobSchedules")]
        public async Task<IActionResult> GetAllJobSchedules()
        {
            var result = await _jobManager.GetAllJobSchedules();
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet("GetAllJobTypes")]
        public async Task<IActionResult> GetAllJobTypes()
        {
            var result = await _jobManager.GetAllJobTypes();
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet("GetAllBasicEducations")]
        public async Task<IActionResult> GetAllBasicEducations()
        {
            var result = await _jobManager.GetAllJobBasicEducations();
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("GetEmployerDetails/{Id}")]
        public async Task<IActionResult> GetEmployerDetails(Guid Id)
        {
            var result = await _jobManager.GetEmployerByID(Id);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpPost("UpdateEmployerDetails")]
        public async Task<IActionResult> UpdateEmployerDetails(EmployerModel employer)
        {
            var result = await _jobManager.UpdateEmployer(employer);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("GetCompanies/{number?}")]
        public async Task<IActionResult> GetEmployers(int? number)
        {
            var result = await _jobManager.GetAllEmployers(number);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("GetAllJobsByAllCompanies/{number?}")]
        public async Task<IActionResult> GetAllJobsByAllCompanies(int number)
        {
            var result = await _jobManager.GetAllJobsByAllCompanies(number);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("CheckForAppliedJob/{jobId}/{userId}")]
        public async Task<IActionResult> CheckForAppliedJob(Guid jobId,Guid userId)
        {
            var result = await _jobManager.CheckForAppliedJob(jobId,userId);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("ApplyJob/{jobId}/{userId}")]
        public async Task<IActionResult> ApplyJob(Guid jobId, Guid userId)
        {
            var result = await _jobManager.ApplyForJob(jobId, userId);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("GetAppliedUsers/{jobId}")]
        public async Task<IActionResult> GetAppliedUsers(Guid jobId)
        {
            var result = await _jobManager.GetAppliedUsers(jobId);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("GetAllAppliedJobs/{userId}")]
        public async Task<IActionResult> GetAllAppliedJobs(Guid userId)
        {
            var result = await _jobManager.GetAllAppliedJobs(userId);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }

        [HttpGet]
        [Route("AppliedJobs/{userId}")]
        public async Task<IActionResult> AppliedJobs(Guid userId)
        {
            var result = await _jobManager.GetAppliedJobs(userId);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
    }

}