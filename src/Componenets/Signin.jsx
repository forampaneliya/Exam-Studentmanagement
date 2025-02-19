import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Form.css"
import { SetuserActions } from "../Redux/Actions/StudentActions";


function Signin() {
    let [login, setLogin] = useState({})
    let [error, seterror] = useState({})
    let dispatch = useDispatch()

    let changeInput = (e) => {

        let { name, value } = e.target;
        setLogin({ ...login, [name]: value })
    }

    function validation() {
        let errs = {}
        let emailvalid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


        if (!login.email) {
            errs.email = "please enter email"
        }
        else if (!emailvalid.test(login.email)) {
            errs.email = "@ and gmail.com is required"
        }
        if (!login.password) {
            errs.password = "Password is required"
        }

        return errs

    }

    let submitData = async (e) => {
        e.preventDefault()
        // console.log(login);
        let signinerr = validation()
        if (Object.keys(signinerr).length > 0) {
            seterror(signinerr)
        }
        else {
            let userdata = await axios.get("http://localhost:7000/user?email=" + login.email);
            // console.log(userdata.data);
            if (userdata.data.length == 1) {
                if (userdata.data[0].password == login.password) {
                    dispatch(SetuserActions(userdata.data[0]))

                    toast.success("you are login sucessfully")
                    // window.location="/"
                    setLogin({})
                    seterror({})
                }
                else {
                    toast.error("Invalid password")
                }
            }
            else {
                toast.error("Invalid Email")
            }

        }

    }
    return (
        <>
            <form action="" method="post" style={{ padding: "80px", marginLeft: "650px" }} onSubmit={(e) => submitData(e)} >
                <table align="center" className="table-sign-up" border={1} style={{ borderRadius: "8px" }}>
                    <h3 style={{ textAlign: "center", marginBottom: "-20px", marginTop: "20px" }}>SignIn</h3>
                    <div style={{ paddingTop: "20px", textAlign: "center", padding: "50px 70px" }}>

                        <tr className="label-sign-up">Email</tr>
                        <tr><input type="email" className="sign-up-input" name="email" onChange={(e) => changeInput(e)} value={login.email ? login.email : ""} style={{ width: "300px", padding: "5px", borderRadius: "5px" }} /></tr>
                        {error.email && <span style={{ color: "red" }}>{error.email}</span>}


                        <tr className="label-sign-up">Password</tr>
                        <tr><input type="password" className="sign-up-input" name="password" onChange={(e) => changeInput(e)} value={login.password ? login.password : ""} style={{ width: "300px", padding: "5px", borderRadius: "5px" }} /></tr>
                        {error.password && <span style={{ color: "red" }}>{error.password}</span>}

                        <tr><Link to="/forgot" style={{ color: "black", fontWeight: "600" }}>  <tr>Forgot Password?</tr></Link> </tr>
                        <tr></tr>
                        {/* <div style={{width:"100%"}}> */}
                        <tr><input type="submit" value={"SignIn"} className="sign-Up-main" style={{ backgroundColor: "black", color: "white", padding: "8px 20px", borderRadius: "5px", border: "none", fontSize: "16px", }} /></tr>
                        {/* </div> */}



                    </div>
                </table>
            </form>
            <ToastContainer />


        </>
    )
}
export default Signin