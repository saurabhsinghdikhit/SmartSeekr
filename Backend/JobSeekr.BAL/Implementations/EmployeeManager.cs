
using AutoMapper;
//using Azure;
using HeyRed.Mime;
using JobSeekr.BAL.Interfaces;
using JobSeekr.Common.Models;
using JobSeekr.DAL.Aggregate.Employees;
using JobSeekr.DAL.Implementations;
using JobSeekr.DAL.Interfaces;
using JobSeekr.Entities.Models;
using static JobSeekr.Common.Enums.ApplicationEnum;

namespace JobSeekr.BAL.Implementations
{
    public class EmployeeManager : IEmployeeManager
    {
        private readonly IMapper _mapper;
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeManager(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }
        public async Task<Response<EmployeeModel>> GetEmployeeByID(Guid ID)
        {
            var responseModel = new Response<EmployeeModel>();
            responseModel.Result = _mapper.Map<EmployeeModel>(await _employeeRepository.GetEmployeeByID(ID)); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }
        public async Task<Response<EmployeeModel>> UpdateEmployee(EmployeeModel objEmployee)
        {
            var responseModel = new Response<EmployeeModel>();
            responseModel.Result = _mapper.Map<EmployeeModel>(await _employeeRepository.UpdateEmployee(_mapper.Map<Employee>(objEmployee))); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<IEnumerable<EducationDetailModel>>> GetEmployeeEducation(Guid ID)
        {
            var responseModel = new Response<IEnumerable<EducationDetailModel>>();
            responseModel.Result = _mapper.Map<List<EducationDetailModel>>(await _employeeRepository.GetEmployeeEducation(ID)); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<IEnumerable<EducationDetailModel>>> AddOrUpdateEducationDetails(EducationDetailModel educationDetail)
        {
            var responseModel = new Response<IEnumerable<EducationDetailModel>>();
            responseModel.Result = _mapper.Map<List<EducationDetailModel>>(await _employeeRepository.AddOrUpdateEducationDetails(_mapper.Map<EducationDetail>(educationDetail))); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<IEnumerable<ProfessionalDetailsModel>>> GetProfessionalDetails(Guid ID)
        {
            var responseModel = new Response<IEnumerable<ProfessionalDetailsModel>>();
            responseModel.Result = _mapper.Map<List<ProfessionalDetailsModel>>(await _employeeRepository.GetProfessionalDetails(ID)); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<IEnumerable<ProfessionalDetailsModel>>> AddOrUpdateProfessionalDetails(ProfessionalDetailsModel professionalDetails)
        {
            var responseModel = new Response<IEnumerable<ProfessionalDetailsModel>>();
            responseModel.Result = _mapper.Map<List<ProfessionalDetailsModel>>(await _employeeRepository.AddOrUpdateProfessionalDetails(_mapper.Map<ProfessionalDetail>(professionalDetails)));
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<EmployeeResumeModel>> UploadEmployeeResume(EmployeeResumeModel employeeResume)
        {
            var responseModel = new Response<EmployeeResumeModel>();
            responseModel.Result = _mapper.Map<EmployeeResumeModel>(await _employeeRepository.UploadEmployeeResume(_mapper.Map<EmployeeResume>(employeeResume)));
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<EmployeeResumeModel>> GetResumeOfEmployee(Guid ID)
        {
            var responseModel = new Response<EmployeeResumeModel>();
            responseModel.Result = _mapper.Map<EmployeeResumeModel>(await _employeeRepository.GetResumeOfEmployee(ID)); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }
    }
}
