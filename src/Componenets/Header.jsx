
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserAction, removeuserAction } from '../Redux/Actions/StudentActions';



function Header() {
    let usersLogin = useSelector((state) => state.StudentReducers.userInitialvalue)
    console.log(usersLogin);
    let dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        let userrData = JSON.parse(localStorage.getItem("user"))
        if (userrData) {
            dispatch(getuserAction(userrData.id))
            navigate("/")

        }

    }, [])
let Removedata=()=>{
    dispatch(removeuserAction())

}
    return (
        <>
            <div className="header" style={{ backgroundColor: "black" }}>
                <div className="contain" >
                    <div className="header-wrap" style={{ width: "100%" }}>
                        <div className="hedder-left">
                            <div className="serch-bar" style={{ color: "white",fontSize:"26px",fontFamily:"cursive" }}>
                                Student  Management  App
                            </div>
                        </div>
                        <div className="header-right">
                            <div style={{ backgroundColor: "white", marginRight: "10px", padding: "5px 8px", borderRadius: "5px" }}>
                                {usersLogin.email ? usersLogin.email :
                                    <Link to="/signup"> <button className="header-btn" style={{ marginRight: "10px" }}>SignUp</button></Link>
                                }

                                {usersLogin.email ?
                                    <button className='Sign-In' onClick={() => Removedata()} >Logout</button>

                                    :
                                    <Link to="/signin/"><button className="header-btn">Log In</button></Link>

                                }
                            </div>


                            <div className="menu" />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Header