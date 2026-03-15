import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../utils/auth";

const MainNavbar = () => {

const navigate = useNavigate();
const location = useLocation();
const user = getUser();

const initial = user?.name?.charAt(0).toUpperCase();

return(

<nav className="main-navbar">

<div className="nav-left">

<h2 className="logo" onClick={()=>navigate("/dashboard")}>
📚 Study Planner
</h2>

{location.pathname !== "/dashboard" &&
<button onClick={()=>navigate("/dashboard")}>Dashboard</button>
}

<button onClick={()=>navigate("/calendar")}>Calendar</button>
<button onClick={()=>navigate("/subjects")}>Subjects</button>

</div>

<div className="nav-right">

<div
className="avatar"
onClick={()=>navigate("/profile")}
>
{initial}
</div>

</div>

</nav>

)

}

export default MainNavbar