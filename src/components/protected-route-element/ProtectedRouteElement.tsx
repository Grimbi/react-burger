import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {getUserSelector} from "../../services/store";

interface IProtectedRouteElementProps {
    onlyUnAuth?: boolean;
    children: ReactElement;
}

function ProtectedRouteElement({onlyUnAuth = false, children}: IProtectedRouteElementProps): ReactElement | null {
    const location = useLocation();
    const { user, isAuthChecked } = useSelector(getUserSelector);

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
