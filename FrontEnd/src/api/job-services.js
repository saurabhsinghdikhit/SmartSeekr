import queryBuilder from "./http-common";
class JobService{
    async getAllJobs(id) {
        return queryBuilder('Job/GetAllJobs/'+id, "GET")
    }
    async getJobById(id) {
        return queryBuilder('Job/' + id, "GET")
    }
    async AddJob(data) {
        return queryBuilder('Job/', "POST",data)
    }
    async UpdateJob(data) {
        return queryBuilder('Job/', "PUT",data)
    }
    async DeleteJob(id) {
        return queryBuilder('Job/', "DELETE",id)
    }
    async GetAllJobSchedules() {
        return queryBuilder('Job/GetAllJobSchedules/', "GET")
    }
    async GetAllJobTypes() {
        return queryBuilder('Job/GetAllJobTypes/', "GET")
    }
    async GetAllBasicEducations() {
        return queryBuilder('Job/GetAllBasicEducations/', "GET")
    }
    async GetEmployerDetails(employerId) {
        return queryBuilder('Job/GetEmployerDetails/'+employerId, "GET")
    }
    async UpdateEmployer(data) {
        return queryBuilder('Job/UpdateEmployerDetails/', "POST",data)
    }
    async getTopCompanies(number) {
        return queryBuilder('Job/GetCompanies/'+number, "GET")
    }
    async getAllJobsByAllCompanies(number) {
        return queryBuilder('Job/GetAllJobsByAllCompanies/'+number, "GET")
    }
    async checkForAppliedJob(jobId,userId){
        return queryBuilder('Job/CheckForAppliedJob/'+jobId+'/'+userId, "GET")
    }
    async applyForAJob(jobId,userId){
        return queryBuilder('Job/ApplyJob/'+jobId+'/'+userId, "GET")
    }
    async getAppliedUsers(jobId) {
        return queryBuilder('Job/GetAppliedUsers/'+jobId, "GET")
    }
    async getAppliedJobs(userId){
        return queryBuilder('Job/GetAllAppliedJobs/'+userId, "GET")
    }
}

const JobDataService = new JobService();

export default JobDataService