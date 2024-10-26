import { useState } from "react";
import "./Form.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";



function Studentform() {
    let [student, setStudent] = useState({})
    let [error, seterror] = useState({})

    let changeInput = (e) => {
        let { name, value } = e.target;
        setStudent({ ...student, [name]: value })
    }
    console.log(student);

    function validation() {
        let errs = {}



        if (!student.studentname) {
            errs.name = "Please Enter Student Name"
        }

        if (!student.Rollnumber) {
            errs.roll = "Please Enter Student Rollnumber"
        }

        if (!student.class) {
            errs.class = "Please Enter Student Class"
        }

        return errs

    }


    let submitData = async (e) => {
        e.preventDefault()

        let studentserr = validation()
        if (Object.keys(studentserr).length > 0) {
            seterror(studentserr)
        }
        else {
            let addStudent = await axios.post("http://localhost:7000/student", student)
            if (addStudent.data) {
                toast.success("Student Add Sucessfully")
                setStudent({})
                window.location = "/studentlist"
            }
            else {
                toast.error("Something Wrong")
            }
        }
    }

    return (
        <>
            <div style={{ textAlign: "center", marginTop: "30px",marginBottom:"20px" }}>
               <button style={{backgroundColor:"transparent",padding:"8px",border:"2px solid white",borderRadius:"5px"}}> <Link to="/studentlist" style={{ color: "white", fontSize: "20px" }} >Show Student</Link></button>
            </div>
            <img src="https://i.postimg.cc/MTRK7Thf/bg-form.jpg" alt="" />
            <div class="container" style={{ marginLeft: "750px" }}>
                <form action="#" method="post" onSubmit={(e) => submitData(e)}>
                    <div class="register" style={{ fontSize: "25px" }}>
                        Add New Student
                    </div>
                    <div class="input-box">
                        <input type="text" placeholder="Enter Student Name" name="studentname" onChange={(e) => changeInput(e)} value={student.studentname ? student.studentname : ""} />
                        <i class='bx bx-envelope'></i>
                    </div>
                    {error.name && <span style={{ color: "red" }}>{error.name}</span>}

                    <div class="input-box">
                        <input type="number" placeholder="Enter Rollnumber" name="Rollnumber" onChange={(e) => changeInput(e)} value={student.Rollnumber ? student.Rollnumber : ""} />
                        <i class='bx bx-lock-alt' ></i>
                    </div>
                    {error.roll && <span style={{ color: "red" }}>{error.roll}</span>}

                    <div class="input-box">
                        <input type="text" placeholder="Enter class" name="class" onChange={(e) => changeInput(e)} value={student.class ? student.class : ""} />
                        <i class='bx bx-lock-alt' ></i>
                    </div>
                    {error.class && <span style={{ color: "red" }}>{error.class}</span>}


                    <button type="submit" class="btn">Add Student</button>

                </form>
            </div>
            <ToastContainer />





        </>
    )
}
export default Studentform;