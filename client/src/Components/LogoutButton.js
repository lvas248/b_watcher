import { logoutSession } from "../Redux/Slices/sessionSlice";
import { useDispatch } from "react-redux";

function LogoutButton(){

    const dispatch = useDispatch()

    function logout(){
        dispatch(logoutSession()).then(res => console.log(res))
    }

    return ( 
        <button onClick={logout}>
            LOGOUT
        </button>
     );
}

export default LogoutButton;