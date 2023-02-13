import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import {CHILDREN_PROP_TYPE} from "../../utils/AppPropTypes";

function ModalOverlay({onClick, children}) {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: CHILDREN_PROP_TYPE.isRequired,
};

export default ModalOverlay;
