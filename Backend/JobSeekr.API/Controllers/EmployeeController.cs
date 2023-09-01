using HeyRed.Mime;
using JobSeekr.BAL.Interfaces;
using JobSeekr.Common.Models;
using JobSeekr.DAL.Aggregate;
using JobSeekr.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace JobSeekr.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeManager _employeeManager;
        public EmployeeController(IEmployeeManager employee)
        {
            _employeeManager = employee ??
                throw new ArgumentNullException(nameof(employee));
        }
        [HttpGet]
        [Route("GetEmployee/{Id}")]
        public async Task<IActionResult> GetEmployeeDetails(Guid Id)
        {
            var result = await _employeeManager.GetEmployeeByID(Id);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpPost]
        [Route("UpdateEmployee")]
        public async Task<IActionResult> updateEmployee(EmployeeModel employee)
        {
            var result = await _employeeManager.UpdateEmployee(employee);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("GetEmployeeEducation/{Id}")]
        public async Task<IActionResult> GetEmployeeEducation(Guid Id)
        {
            var result = await _employeeManager.GetEmployeeEducation(Id);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpPost]
        [Route("SaveEducation")]
        public async Task<IActionResult> AddOrUpdateEducationDetails(EducationDetailModel educationDetail)
        {
            var result = await _employeeManager.AddOrUpdateEducationDetails(educationDetail);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpGet]
        [Route("GetProfessionalDetails/{Id}")]
        public async Task<IActionResult> GetProfessionalDetails(Guid Id)
        {
            var result = await _employeeManager.GetProfessionalDetails(Id);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpPost]
        [Route("SaveProfessionalDetails")]
        public async Task<IActionResult> AddOrUpdateProfessionalDetails(ProfessionalDetailsModel professionalDetails)
        {
            var result = await _employeeManager.AddOrUpdateProfessionalDetails(professionalDetails);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                /*var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    stream.CopyTo(stream);
                }*/

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [HttpGet]
        [Route("GetResume/{Id}")]
        public async Task<IActionResult> GetResumeOfEmployee(Guid Id)
        {
            var result = await _employeeManager.GetResumeOfEmployee(Id);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }
        [HttpPost]
        [Route("UploadResume")]
        public async Task<IActionResult> UploadResume(EmployeeResumeModel employeeResumeModel)
        {
            var result = await _employeeManager.UploadEmployeeResume(employeeResumeModel);
            result.ResponseMessage(HttpContext.Response.StatusCode, result.StateModel);
            return new OkObjectResult(result);
        }

    }
}
