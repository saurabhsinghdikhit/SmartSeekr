// import http from "./http-common";
import queryBuilder from './http-common';

class UserAuthentication {
    async getAllUserType() {
        return await queryBuilder("User/GetUserType", "GET")
    }
    // getAllUserType() {
    //     return http.get("User/GetUserType");
    // }

    // get(id) {
    //     return http.get(`/tutorials/${id}`);
    // }

    async registerUser(data) {
        return await queryBuilder("User/AddUser", "POST", data)
    }
    async loginUser(data) {
        return await queryBuilder("User/LoginUser", "POST", data)
    }
    async checkForValidEmail(email) {
        return await queryBuilder("User/CheckForExistingEmail?email=" + email, "GET")
    }

    // update(id, data) {
    //     return http.put(`/tutorials/${id}`, data);
    // }

    // delete(id) {
    //     return http.delete(`/tutorials/${id}`);
    // }

    // deleteAll() {
    //     return http.delete(`/tutorials`);
    // }

    // findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    // }
}

export default new UserAuthentication();