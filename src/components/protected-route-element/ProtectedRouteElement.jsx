import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

function ProtectedRouteElement({onlyUnAuth = false, children}) {
    const location = useLocation();
    const { user, isAuthChecked } = useSelector(store => store.user);

    if (!isAuthChecked) {
        return null;
    }

    if (user && onlyUnAuth) {
        return (<Navigate to={location.state?.previousPath || "/"}/>);
    }

    if (!user && !onlyUnAuth) {
        return (<Navigate to={"/login"} state={{ previousPath: location.pathname }}/>);
    }

    return children;
}

export default ProtectedRouteElement;
