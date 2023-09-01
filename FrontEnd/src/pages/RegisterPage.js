import RegisterForm from "../components/Register/RegisterForm";

function RegisterPage({updateUserProfileData}) {
    return (
        <RegisterForm updateUserProfileData={updateUserProfileData}></RegisterForm>
    )
}

export default RegisterPage;