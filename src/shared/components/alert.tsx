import Styles from "@/shared/styles/alert.module.css";

export interface AlertProps {
    title: string; 
    subtitle?: string;
}

export const Alert = ({title, subtitle}: AlertProps) => {
    return (
        <div className="bg-white">
            <div className={`d-flex flex-row gap-2 p-3 justify-content-start ${Styles.alertContainer}`}>
                <i className="bi bi-exclamation-circle-fill"></i>
                <div className={`d-flex flex-column gap-1 ${Styles.alertTextContent}`}>
                    <p className="text-uppercase fw-bold lh-1 ">{title}</p>
                    <p className="lh-1">{subtitle}</p>
                </div>
            </div>
        </div>
    )
}