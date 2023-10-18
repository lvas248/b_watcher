import { logoutSession } from "../Redux/Slices/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";


function LogoutButton({toggleOpen}){

    const dispatch = useDispatch()
    const history = useHistory()
    const sessionStatus = useSelector( state => state.session.status)

    function logout(){
        dispatch(logoutSession()).then(res => {
            if(res.meta.requestStatus === 'fulfilled'){ 
            history.push('/')
            toggleOpen()
        } 
        })
    }

    return ( 
        <button onClick={logout}>
            { sessionStatus=== 'pending' ? <LoadingIcon status={sessionStatus}/> : 'LOGOUT' }
        </button>
     );
}

export default LogoutButton;