using AutoMapper;
using JobSeekr.BAL.Interfaces;
using JobSeekr.Common.Models;
using JobSeekr.DAL.Aggregate;
using JobSeekr.DAL.Aggregate.Employees;
using JobSeekr.DAL.Implementations;
using JobSeekr.DAL.Interfaces;
using JobSeekr.Entities.Models;
using System.Net;
using static JobSeekr.Common.Enums.ApplicationEnum;

namespace JobSeekr.BAL.Implementations
{
    public class UserManager : IUserManager
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public UserManager(IUserRepository userRepository,IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<Response<UserModel>> LoginUser(UserModel userModel)
        {
            var responseModel = new Response<UserModel>();
            User user = new User()
            {
                Email = userModel.Email,
                Password = userModel.Password
            };
            var result = await _userRepository.LoginUser(user);
            
            if (result.ID== Guid.Empty)
            {
                responseModel.StateModel.SetErrorMessage(AppMessageConstant.InvalidUser, (int)ResponseStatusCode.Unauthorized);
            }
            else
            {
                UserModel model = new UserModel()
                {
                    ID = result.ID,
                    Email = result.Email,
                    UserType = result.UserTypeId,
                    UserTypeValue = result.UserType?.Name,

                };
                if (model.UserTypeValue == "Admin")
                {
                    model.Employee = new EmployeeModel();
                    model.Employee.FirstName = "Admin";
                }
                else if (model.UserTypeValue == "Applicant")
                {
                    model.Employee = new EmployeeModel();
                    model.Employee.FirstName = result.Employee?.FirstName;
                }
                else
                {
                    model.Employer = new EmployerModel();
                    model.Employer.Id = result.Employer!.Id;
                    model.Employer.CompanyName = result.Employer?.CompanyName;
                }
                responseModel.Result = model;
                responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);

            }
            return responseModel;
        }

        public async Task<Response<UserModel>> RegisterUser(UserModel userModel)
        {
            var responseModel = new Response<UserModel>();
            User user = new User()
            {
                Email = userModel.Email,
                Password = userModel.Password,
                UserTypeId = (Guid)userModel.UserType!
            };
            if (userModel.UserTypeValue == "Applicant")
            {
                user.Employee = _mapper.Map<Employee>(userModel.Employee);
                user.Employee.Id = Guid.NewGuid();
            }
            else
            {
                user.Employer = _mapper.Map<Employer>(userModel.Employer);
                user.Employer.Id = Guid.NewGuid();
            }
            var resultList = await _userRepository.RegisterUser(user);
            if (resultList != null)
            {   
                if(resultList.ID == Guid.Empty)
                    responseModel.StateModel.SetErrorMessage(AppMessageConstant.EmailExist, (int)ResponseStatusCode.AlreadyExitData);
                else
                {
                    UserModel model = new UserModel()
                    {
                        ID = resultList.ID,
                        Email = resultList.Email,
                        UserType = resultList.UserTypeId,
                        UserTypeValue = userModel.UserTypeValue
                    };
                    if (userModel.UserTypeValue != "Applicant")
                    {
                        model.Employer = _mapper.Map<EmployerModel>(user.Employer);
                    }
                    else
                    {
                        model.Employee = _mapper.Map<EmployeeModel>(user.Employee);
                    }
                    responseModel.Result = model;
                    responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);

                }
            }
            else
            {
                responseModel.StateModel.SetErrorMessage(AppMessageConstant.NoData, (int)ResponseStatusCode.NoMoreData);
            }
            return responseModel;
        }
        public async Task<Response<IEnumerable<UserTypeModel>>> FetchUserType()
        {
            var responseModel = new Response<IEnumerable<UserTypeModel>>();
            responseModel.Result = _mapper.Map<List<UserTypeModel>>(await _userRepository.FetchUserType()); ;
            responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            return responseModel;
        }

        public async Task<Response<UserModel>> CheckForExistingEmail(string Email)
        {
            var responseModel = new Response<UserModel>();
            bool isEmailExist = await _userRepository.CheckForExistingEmail(Email);
            if (isEmailExist)
            {
                responseModel.StateModel.SetErrorMessage(AppMessageConstant.EmailExist, (int)ResponseStatusCode.AlreadyExitData);
            }
            else
            {
                responseModel.Result = new UserModel();
                responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            }

            return responseModel;
        }

        public async Task<Response<List<UserModel>>> GetUsers()
        {
            var responseModel = new Response<List<UserModel>>();

            var userList = await _userRepository.GetUsers();

            if (userList != null && userList.Count > 0)
            {
                var userModelList = new List<UserModel>();

                foreach (var user in userList)
                {
                    var userModel = new UserModel
                    {
                        ID = user.ID,
                        Email = user.Email,
                        UserType = user.UserTypeId,
                        UserTypeValue = user.UserType?.Name,
                    };

                    if (userModel.UserTypeValue == "Applicant")
                    {
                        userModel.Employee = new EmployeeModel();
                        userModel.Employee.Id = user.Employee?
                            .Id;
                        userModel.Employee.FirstName = user.Employee?.FirstName;
                        userModel.Employee.LastName = user.Employee?.LastName;
                        userModel.Employee.ContactNumber = user.Employee?.ContactNumber;
                        userModel.Employee.DateOfBirth = user.Employee?.DateOfBirth;
                        userModel.Employee.Address = user.Employee?.Address;
                        userModel.Employee.City = user.Employee?.City;
                        userModel.Employee.Province = user.Employee?.Province;
                        userModel.Employee.Country = user.Employee?.Country;
                        userModel.Employee.Pincode = user.Employee?.Pincode;
                        userModel.Employee.UserImage = user.Employee?.UserImage;
                    }
                    else if(userModel.UserTypeValue == "Employer")
                    {
                        userModel.Employer = new EmployerModel();
                        userModel.Employer.Id = user.Employer!.Id;
                        userModel.Employer.CompanyName = user.Employer?.CompanyName;
                        userModel.Employer.CompanyEmail = user.Employer?.CompanyEmail;
                        userModel.Employer.CompanyNumber = user.Employer?.CompanyNumber;
                        userModel.Employer.CompanyLogo = user.Employer?.CompanyLogo;
                        userModel.Employer.CompanyIndustry = user.Employer?.CompanyIndustry;
                        userModel.Employer.CompanyDescription = user.Employer?.CompanyDescription;
                        userModel.Employer.Address = user.Employer?.Address;
                        userModel.Employer.City = user.Employer?.City;
                        userModel.Employer.Province = user.Employer?.Province;
                        userModel.Employer.Country = user.Employer?.Country;
                        userModel.Employer.Pincode = user.Employer?.Pincode;

                    }

                    if(userModel.UserTypeValue != "Admin")
                    userModelList.Add(userModel);
                }

                responseModel.Result = userModelList;
                responseModel.StateModel.SetSuccessMessage(AppMessageConstant.ResultSuccess, (int)ResponseStatusCode.Success);
            }
            else
            {
                responseModel.StateModel.SetErrorMessage(AppMessageConstant.NoData, (int)ResponseStatusCode.NoMoreData);
            }

            return responseModel;
        }
    }
}
