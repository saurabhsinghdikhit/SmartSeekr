using JobSeekr.DAL.Aggregate.Employees;
using JobSeekr.DAL.Context;
using JobSeekr.DAL.Interfaces;
using JobSeekr.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace JobSeekr.DAL.Implementations
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly APIDbContext _appDBContext;
        public EmployeeRepository(APIDbContext context)
        {
            _appDBContext = context ??
                throw new ArgumentNullException(nameof(context));
        }
        public async Task<Employee> GetEmployeeByID(Guid ID)
        {
            return await _appDBContext.Employees.FirstOrDefaultAsync(x => x.UserId == ID);
        }
        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            _appDBContext.Entry(employee).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return employee;
        }

        public async Task<IEnumerable<EducationDetail>> GetEmployeeEducation(Guid ID)
        {
            return await _appDBContext.EducationDetails.Where(x => x.UserId == ID && !x.IsDeleted).OrderByDescending(x => x.StartingDate).ToListAsync();
        }

        public async Task<IEnumerable<EducationDetail>> AddOrUpdateEducationDetails(EducationDetail educationDetail)
        {
            if (educationDetail.Id == Guid.Empty)
            {
                // add flow
                educationDetail.Id = Guid.NewGuid();
                _appDBContext.EducationDetails.Add(educationDetail);
            }
            else
            {
                // update flow
                _appDBContext.Entry(educationDetail).State = EntityState.Modified;
            }
            await _appDBContext.SaveChangesAsync();
            return await GetEmployeeEducation(educationDetail.UserId);
        }

        public async Task<IEnumerable<ProfessionalDetail>> GetProfessionalDetails(Guid ID)
        {
            return await _appDBContext.ExperienceDetails.Where(x => x.UserId == ID && !x.IsDeleted).OrderByDescending(x => x.StartDate).ToListAsync();
        }

        public async Task<IEnumerable<ProfessionalDetail>> AddOrUpdateProfessionalDetails(ProfessionalDetail professionalDetail)
        {
            if (professionalDetail.Id == Guid.Empty)
            {
                // add flow
                professionalDetail.Id = Guid.NewGuid();
                _appDBContext.ExperienceDetails.Add(professionalDetail);
            }
            else
            {
                // update flow
                _appDBContext.Entry(professionalDetail).State = EntityState.Modified;
            }
            await _appDBContext.SaveChangesAsync();
            return await GetProfessionalDetails(professionalDetail.UserId);
        }

        public async Task<EmployeeResume> UploadEmployeeResume(EmployeeResume employeeResume)
        {
            EmployeeResume resume = _appDBContext.EmployeeResumes.FirstOrDefault(x => x.UserId == employeeResume.UserId);
            if(resume != null)
            {
                _appDBContext.EmployeeResumes.Remove(_appDBContext.EmployeeResumes.Find(resume.Id));
            }
                
            _appDBContext.EmployeeResumes.Add(employeeResume);
            await _appDBContext.SaveChangesAsync();
            return employeeResume;
        }

        public async Task<EmployeeResume> GetResumeOfEmployee(Guid userID)
        {
            return await _appDBContext.EmployeeResumes.FirstOrDefaultAsync(x => x.UserId == userID);
        }
    }
}
