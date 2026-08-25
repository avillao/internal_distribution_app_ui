import { LoginModel } from "@/features/auth/models/login";

export const loginSchemaValidator = (values: LoginModel) => {
    const errors: LoginModel = {};
    if (!values.username) {
        errors.username = 'Required';
    } else if (
        !/^[A-Z0-9._]+$/i.test(values.username)
    ) {
        errors.username = 'Invalid email address';
    }
    return errors;
}

