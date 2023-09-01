import LoginForm from "../components/Login/LoginForm";

function LoginPage({updateUserProfileData}) {
    return (
        <LoginForm updateUserProfileData = {updateUserProfileData}></LoginForm>
    )
}

export default LoginPage;