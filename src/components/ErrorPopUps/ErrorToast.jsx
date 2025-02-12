import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles/ErrorPopUpStyles.module.css";

/**
 * @component Renders the passed in error information into toast pop ups at the bottom right of the page container.
 * @param {boolean} isErrorToastDisplayed - Denotes if the toast should be displayed.
 * @param {object} error - Error information to be displayed in the toast popup.
 * @returns {React.JSX.Element}
 */
export function ErrorToast({ isErrorToastDisplayed, error }) {
  return (
    <Toast
      show={isErrorToastDisplayed}
      animation={true}
      className="position-absolute bottom-0 end-0"
    >
      <Toast.Header className={`${styles.header}`} closeButton={false}>
        <p>
          <strong>ERROR - </strong>
          {error?.name}
        </p>
        <FontAwesomeIcon icon={faExclamationCircle} className="ms-auto" />
      </Toast.Header>
      <Toast.Body className={`${styles.bodyContainer}`}>
        {error?.message}
      </Toast.Body>
    </Toast>
  );
}
