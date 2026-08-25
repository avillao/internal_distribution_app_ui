"use client"
import { loginSchemaValidator } from "@/features/auth/validators/loginSchema";
import Style from "@/features/auth/styles/login.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useToast } from "@/shared/hooks/useToast";
import { Toast, ToastContainer } from "react-bootstrap";
import { Alert } from "@/shared/components/alert";
import { useEffect } from "react";

function LoginBody () {
    const { isLoading, login, error} = useAuth();
    const { showToast, setShowToast } = useToast();

    useEffect(()=>{
        if(error){
            setShowToast(true);
        }
    }, [error]);

    
    return(
        <div className={Style.bodyContainer}>
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} autohide delay={3000}>
                <Toast.Body>
                    <Alert title="Error" subtitle={error}></Alert>
                </Toast.Body>
                </Toast>
            </ToastContainer>
            <Formik
                initialValues={{email:"", password: ""}}
                validate={loginSchemaValidator}
                onSubmit={(values)=> login(values.email, values.password, "/")}
                //onSubmit={()=>setShowToast(true)}
            >
                {({isValid, isSubmitting})=> (
                    <Form>
                        <div className="input-group">
                            <div>
                                <label>Email</label>
                            </div>
                            <Field
                                type="text" 
                                name="email" 
                                placeholder="name@company.com"
                            />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div className="input-group">
                            <div>
                                <label>Password</label>
                                <span className="">Forgot password?</span>
                            </div>
                            <Field
                                type="password"
                                name="password"
                            />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <Field
                            type="submit" 
                            value="Iniciar Sesión"
                            name="submit"
                            disabled={!isValid || isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginBody;