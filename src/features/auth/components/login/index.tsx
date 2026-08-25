import Style from "@/features/auth/styles/login.module.css";
import LoginBody from "./body";
import Image from "next/image";

function LoginComponent() {
    return (
        <div className={Style.rootContainer}>
            <main>
                <section>
                    <header className={Style.headerContainer}>
                        <div>
                            <Image src={"/icons/app-logo.svg"} width={13} height={22} alt=''/>
                        </div>
                        <div className="header-title">
                            <h2>Internal App Distribution</h2>
                            <h3>LOGIN</h3>
                        </div>
                    </header>
                    <LoginBody></LoginBody>
                    <footer className={Style.footerContainer}>
                        <span>V1.0.4-BETA</span>
                    </footer>
                </section>
            </main>
        </div>
    )
}

export default LoginComponent;