import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import Styles from "@/shared/styles/alert.module.css";
import { AlertType } from '../enums/components';

interface AlertProps {
    type: AlertType;
    message: string;
}

export const useAlert = () => {
    const [showAlert, setShowAlert] = useState(false);

    function RenderAlert({type, message}: AlertProps){

        let iconClass;
        let variantClass;

        switch(type){
            case AlertType.SUCCESS:
                iconClass = "bi-check-circle-fill"
                variantClass = Styles.alertSuccess
                break;
            case AlertType.WARNING:
                iconClass = "bi-exclamation-triangle-fill"
                variantClass = Styles.alertWarning
                break;
            case AlertType.ERROR:
            default:
                iconClass = "bi-exclamation-circle-fill"
                variantClass = Styles.alertError
                break;
        }

        return (
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showAlert} onClose={() => setShowAlert(false)} autohide delay={3000}>
                <Toast.Body>
                    <div className={`bg-white ${Styles.alertContainer}`}>
                        <div className={`d-flex flex-row gap-2 p-3 justify-content-start align-items-start ${variantClass}`}>
                            <i className={`bi ${iconClass}`}></i>
                            <div className={`d-flex flex-column gap-1 ${Styles.alertTextContent}`}>
                                <p className="text-uppercase fw-bold lh-1 ">{type.toString()}</p>
                                <p className="lh-1">{message}</p>
                            </div>
                        </div>
                    </div>
                </Toast.Body>
                </Toast>
            </ToastContainer>
        )
    }

    return {
        showAlert,
        setShowAlert,
        RenderAlert
    }
    
} 