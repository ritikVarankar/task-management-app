import { useContext, useEffect, useState } from "react";
import './Login.css';
import TextInput from "../Reusable/TextInput/Textinput";
import CustomButton from "../Reusable/Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { generateID } from "../Reusable/Data";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../redux/registerUserReducer";
import AuthContext from "../context/AuthContext";

interface User{
    username:string,
    password:string,
    confirmPassword:string
}
function Login() {
    const myContext = useContext(AuthContext);
    const navigate=useNavigate();
    const dispatch =  useDispatch();
    const userDetails = useSelector((state:any) => state.registerUsers);
    const [register, setRegister] = useState<User>({
        username:'',
        password:'',
        confirmPassword:''
    });
    const [errors, setErrors] = useState<any>({}); 
    const handleError = (error: any, input: string) => {
        setErrors((prevState: any) => ({ ...prevState, [input]: error }));
    };
    const handleRegisterOnchange = (text: string, input: string) => {
        setRegister((prevState: any) => ({ ...prevState, [input]: text }));
    };
    const validateRegister = async(e:any) => {
        e.preventDefault();
        let isValid = true;
        if (register.username.length < 8) {
          handleError("Username must be eight characters ", "username");
          isValid = false;
        }else if (register.password.length < 8) {
            handleError("Password must be eight characters ", "password");
            isValid = false;
        }else if (register.password !== register.confirmPassword) {
            handleError("Please enter correct password", "confirmPassword");
            isValid = false;
        }

        if(isValid){ 
            myContext.handleLoader(true);
            let arr:any=[];
            await Promise.all(
                userDetails.registerUsers.map((dt:any)=>{
                    if(register.username===dt.userName && register.password===dt.password){
                        arr.push(dt)
                    }
                })
            )
            myContext.handleLoader(false);
            if (arr.length === 0) {
                let obj:any={
                    id:generateID(4),
                    userName: register.username,
                    password: register.password
                }
                dispatch(addUsers(obj));        
                myContext.showToast("User registered successfully", "success");
                myContext.showToast("Please login using these username and password", "warning");
                loginHeaderFn();
                handleClear();
            } else{
                handleError("username already exists", "username");
                handleError("password already exists", "password");
                myContext.showToast("Please enter new username and password","failure");
            }   
        }
    };
    const validateLogin = async(e:any) => {
        e.preventDefault();

        let isValid = true;
        if (register.username.length < 8) {
          handleError("Username must be eight characters ", "username");
          isValid = false;
        }else if (register.password.length < 8) {
            handleError("Password must be eight characters ", "password");
            isValid = false;
        }

        if(isValid){        
            myContext.handleLoader(true);
            let arr:any=[];
            await Promise.all(
                userDetails.registerUsers.map((dt:any)=>{
                    if(register.username === dt.userName && register.password === dt.password){
                        arr.push(dt)
                    }
                })
            )
            myContext.handleLoader(false);
            if (arr.length === 0) {
                handleError("Please enter correct username", "username");
                handleError("Please enter correct password", "password");
                myContext.showToast("Please enter correct username and password","failure");
            } else{
                myContext.showToast("User login successfully", "success");
                handleClear();
                navigate('/tasks');
                myContext.loginUserName(register.username);
            }

        }
    };
    const handleClear=()=>{
        handleRegisterOnchange("", "username");
        handleRegisterOnchange("", "password");
        handleRegisterOnchange("", "confirmPassword");
        handleError(null, "username")
        handleError(null, "password");
        handleError(null, "confirmPassword");
    }
    const loginHeaderFn=()=>{
        const wrapper:any = document.querySelector(".wrapper");
        if(wrapper){
            wrapper.classList.add("active");
        }
        handleClear();
    }
    const signupHeaderFn=()=>{
        const wrapper:any = document.querySelector(".wrapper");
        if(wrapper){
            wrapper.classList.remove("active");
        }
        handleClear();
    }


    return (
        <div className="wrapper-body">
            <section className="wrapper">
                <div className="login-form signup">
                    <header onClick={signupHeaderFn}>Signup</header>
                    <form className="form-wrapper" onSubmit={validateRegister} action="#">
                        <TextInput 
                            classDivName="login-input"
                            classErrorName="error-text"
                            classIconName="fa-solid fa-user"
                            classInputName="login-input-field"
                            iconshow={true}
                            inputtype="text"
                            placeholder="Username"
                            required
                            value={register.username}
                            onChange={(e: any) => { handleRegisterOnchange(e.target.value, "username"); } }
                            error={errors.username}
                            onFocus={() => handleError(null, "username")} 
                            labelName={""} 
                            labelClassName={""}                        
                        />
                        <TextInput 
                            classDivName="login-input"
                            classErrorName="error-text"
                            classIconName="fa-solid fa-lock"
                            classInputName="login-input-field"
                            iconshow={true}
                            inputtype="password"
                            placeholder="Password"
                            required
                            value={register.password}
                            onChange={(e: any) => { handleRegisterOnchange(e.target.value, "password"); } }
                            error={errors.password}
                            onFocus={() => handleError(null, "password")} 
                            labelName={""} 
                            labelClassName={""}                        
                        />
                        <TextInput 
                            classDivName="login-input"
                            classErrorName="error-text"
                            classIconName="fa-solid fa-lock"
                            classInputName="login-input-field"
                            iconshow={true}
                            inputtype="password"
                            placeholder="Confirm Password"
                            required
                            value={register.confirmPassword}
                            onChange={(e: any) => { handleRegisterOnchange(e.target.value, "confirmPassword"); } }
                            error={errors.confirmPassword}
                            onFocus={() => handleError(null, "confirmPassword")} 
                            labelName={""} 
                            labelClassName={""}                        
                        />
                        <CustomButton classInputName="login-button" inputtype="submit" buttonText="Sign Up" value="Signup" />
                    </form>
                </div>

                <div className="login-form login">
                    <header onClick={loginHeaderFn}>Login</header>
                    <form className="form-wrapper" onSubmit={validateLogin}>
                        <TextInput 
                            classDivName="login-input"
                            classErrorName="error-text"
                            classIconName="fa-solid fa-user"
                            classInputName="login-input-field"
                            iconshow={true}
                            inputtype="text"
                            placeholder="Username"
                            required
                            value={register.username}
                            onChange={(e: any) => { handleRegisterOnchange(e.target.value, "username"); } }
                            error={errors.username}
                            onFocus={() => handleError(null, "username")} 
                            labelName={""} 
                            labelClassName={""}                       
                        />
                        <TextInput 
                            classDivName="login-input"
                            classErrorName="error-text"
                            classIconName="fa-solid fa-lock"
                            classInputName="login-input-field"
                            iconshow={true}
                            inputtype="password"
                            placeholder="Password"
                            required
                            value={register.password}
                            onChange={(e: any) => { handleRegisterOnchange(e.target.value, "password"); } }
                            error={errors.password}
                            onFocus={() => handleError(null, "password")} 
                            labelName={""} 
                            labelClassName={""}                        
                        />
                        <CustomButton classInputName="login-button" inputtype="submit" buttonText="Login" value="Login" />
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;
