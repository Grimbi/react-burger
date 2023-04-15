import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {CHILDREN_PROP_TYPE} from "../../utils/AppPropTypes";
import {selectors} from "../../services/store";

function ProtectedRouteElement({onlyUnAuth = false, children}) {
    const location = useLocation();
    const { user, isAuthChecked } = useSelector(selectors.getUser);

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

ProtectedRouteElement.propTypes = {
    onlyUnAuth: PropTypes.bool,
    children: CHILDREN_PROP_TYPE.isRequired,
};

export default ProtectedRouteElement;
