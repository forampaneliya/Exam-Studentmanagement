import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Updateform() {
    let [update, setUpdate] = useState({})
    let record = useParams()

    useEffect(() => {
        axios.get("http://localhost:7000/student/" + record.id)
            .then((res) => {
                setUpdate(res.data)
            })
    }, [setUpdate])
    function ChangeInput(e) {
        let { name, value } = e.target;
        setUpdate({ ...update, [name]: value })
    }
    let updateData = (e) => {
        e.preventDefault()
        axios.put("http://localhost:7000/student/" + update.id, update);
        setUpdate({})
    }
    return (
        <>
            <form action="" method="post" onSubmit={(e) => updateData(e)} style={{ marginTop: "50px" }}>
                <table align="center" style={{ margin: "0px auto", backgroundColor: "rgb(190, 187, 187)", padding: "20px", borderRadius: "10px" }}>
                    <tr>
                        <td style={{ fontSize: "16px" }}>Studentname:-</td>
                        <td><input type="text" name="studentname" value={update.studentname ? update.studentname : ""} onChange={(e) => ChangeInput(e)} style={{ width: "250px", padding: "6px 10px", borderRadius: "5px", marginBottom: "8px" }} /></td>
                    </tr>
                    <tr>
                        <td style={{ fontSize: "16px" }}>Rollnumber</td>
                        <td><input type="number" name="Rollnumber" value={update.Rollnumber ? update.Rollnumber : ""} onChange={(e) => ChangeInput(e)} style={{ width: "250px", padding: "6px 10px", borderRadius: "5px", marginBottom: "8px" }} /></td>
                    </tr>
                    <tr>
                        <td style={{ fontSize: "16px" }}>Class</td>
                        <td><input type="text" name="class" value={update.class ? update.class : ""} onChange={(e) => ChangeInput(e)} style={{ width: "250px", padding: "6px 10px", borderRadius: "5px", marginBottom: "8px" }} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit" name="edit" value={"Edit"} style={{ backgroundColor: "black", color: "white", padding: "8px 10px", fontSize: "18px", width: "250px", border: "none", borderRadius: "5px " }} /></td>
                    </tr>
                </table>
            </form>
        </>
    )
}
export default Updateform