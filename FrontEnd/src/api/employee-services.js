import queryBuilder from "./http-common";

class EmployeeService {
    async getEmployeeDetails(id) {
        return await queryBuilder('Employee/GetEmployee/' + id, "GET")
    }
    async updateEmployeeDetails(data) {
        return queryBuilder('Employee/UpdateEmployee/', "POST", data)
    }
    async getAllEducations(id) {
        return await queryBuilder('Employee/GetEmployeeEducation/' + id, "GET")
    }
    async saveEducation(data) {
        return queryBuilder('Employee/SaveEducation/', "POST", data)
    }
    async getAllWorkExperiences(id) {
        return await queryBuilder('Employee/GetProfessionalDetails/' + id, "GET")
    }
    async saveWorkExperience(data) {
        return queryBuilder('Employee/SaveProfessionalDetails/', "POST", data)
    }
    async GetEmployeeResume(userId) {
        return await queryBuilder('Employee/GetResume/' + userId, "GET")
    }
    async SaveEmployeeResumeData(data) {
        return await queryBuilder('Employee/UploadResume/', "POST",data)
    }
    
    
}

const EmployeeeDataService = new EmployeeService();

export default EmployeeeDataService