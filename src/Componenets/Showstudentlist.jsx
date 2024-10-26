import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Main.css"
import Table from 'react-bootstrap/Table';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";



function Showstudentlist() {
    let [data, setData] = useState([])
    let [ser, setSer] = useState("")

    let navigate = useNavigate()


    useEffect(() => {
        setTimeout(() => {
            getStudentData()
        }, 1000);
    }, [])

    let getStudentData = async () => {
        let getstudent = await axios.get("http://localhost:7000/student")
        if (getstudent.data) {
            console.log(getstudent.data);

            setData(getstudent.data)
        }
        else {
            toast.error("error")
        }

    }

    let SearchingData = (e) => {
        let newdata = e.target.value;
        setSer(newdata)

    }

    let DeleteData = (id) => {
        let dataa = axios.delete("http://localhost:7000/student/" + id)
        window.location='/studentlist'
    }

    function sortByRollnumber(e) {
        let sortroll = e.target.value;
        let newdata = [...data]
        if (sortroll == "asc") {
            newdata.sort((a, b) => a.Rollnumber - b.Rollnumber)
        }
        else if (sortroll == "dsc") {
            newdata.sort((a, b) => b.Rollnumber - a.Rollnumber)
        }
        setData(newdata)

    }
    return (
        <>
            <h1 style={{ textAlign: "center" }}>show student</h1>
            <br></br>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ textAlign: "center", }}>
                    <input type="text" name="searching" onChange={(e) => SearchingData(e)} placeholder="Seaching Data" style={{ border: "2px solid gray", width: "350px", fontSize: "16px", borderRadius: "5px", marginBottom: "20px", padding: "6px" }} />
                </div>
                <div className="sort-wrap">
                    <select name="sorting" id="" onChange={(e) => sortByRollnumber(e)} style={{ border: "2px solid gray", width: "350px", fontSize: "16px", borderRadius: "5px", marginBottom: "20px", padding: "6px" }}>
                        <option value="">--Select Price--</option>
                        <option value="asc">Low to high</option>
                        <option value="dsc">High to Low</option>
                    </select>
                </div>
            </div>

            <table className="main-tablee" align="center" style={{ textAlign: "center", margin: "0px auto" }} >
                <thead>
                    <tr className="table-head">
                        <th style={{ width: "70px" }}>#</th>
                        <th className="table-head">Name</th>
                        <th>Roll number</th>
                        <th>Class</th>
                        <th>Delete</th>
                        <th>Update</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.filter((v, i) => {
                            if (ser == "") {
                                return v
                            }
                            else if (v.studentname.match(ser)) {
                                return v
                            }

                        })
                            .map((v, i) => {
                                return (
                                    <>
                                        <tr>
                                            <td className="table-td">{i + 1}</td>
                                            <td className="table-tdd">{v.studentname}</td>
                                            <td className="table-td">{v.Rollnumber}</td>
                                            <td className="table-tdd">{v.class}</td>
                                            <td className="table-td"><MdDelete onClick={() => DeleteData(v.id)} style={{ color: "red", fontSize: "24px" }} /></td>
                                            <td className="table-tdd"><Link to={"/updateform/" + v.id}><FaRegEdit style={{ color: "green", fontSize: "24px" }} /></Link></td>

                                        </tr>
                                    </>
                                )
                            })
                    }

                </tbody>
            </table>

        </>
    )
}
export default Showstudentlist;