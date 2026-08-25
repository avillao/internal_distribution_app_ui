"use client"
import { loginSchemaValidator } from "@/features/auth/validators/loginSchema";
import Style from "@/features/auth/styles/login.module.css";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAlert } from "@/shared/hooks/useAlert";
import { useEffect } from "react";
import { AlertType } from "@/shared/enums/components";

function LoginBody () {
    const { isLoading, login, error} = useAuth();
    const { setShowAlert, RenderAlert } = useAlert();

    useEffect(()=>{
        if(error){
            setShowAlert(true);
        }
    }, [error]);

    
    return(
        <div className={Style.bodyContainer}>
            <RenderAlert type={AlertType.ERROR} message={error ?? ""} />
            <Formik
                initialValues={{username:"", password: ""}}
                validate={loginSchemaValidator}
                onSubmit={(values)=> login(values.username, values.password, "/dashboard")}
            >
                {({isValid, isSubmitting})=> (
                    <Form>
                        <div className="input-group">
                            <div>
                                <label>Username</label>
                            </div>
                            <Field
                                type="text"
                                name="username"
                            />
                            <ErrorMessage name="username" component="div" />
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