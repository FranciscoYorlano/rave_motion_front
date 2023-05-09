/* =======================================================
    VIEW SignIn - "/signin" - Vista para iniciar sesión

    styles:
    A un lado el form y al otro una imagen o mockup del home
    email, password || ingresar con Google) 

    * Redirecciona al UserTickets
    
*/

// React router dom
import { Link } from "react-router-dom";

// Hooks
import { useToggle } from "../../functions/customHooks";

// React icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("El email no es valido.")
        .required("Este campo es requerido."),
    password: Yup.string().required("Este campo es requerido."),
});

const SignIn = () => {
    // Show password
    const [isPasswordShow, toggleShowPassword] = useToggle();

    // Form
    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, touched, errors }) => (
                    <Form className="flex flex-col w-96 py-8 px-4 bg-slate-900 rounded-xl border border-secondaryBorder">
                        <h2 className="text-4xl text-center mb-8">
                            Bienvenido!
                        </h2>

                        {/* Email */}
                        <div className="flex flex-col my-2">
                            <label
                                htmlFor="email"
                                className="block my-1 font-semibold"
                            >
                                Email:
                            </label>
                            <Field
                                className={
                                    touched.email && errors.email
                                        ? "inputError"
                                        : touched.email && !errors.email
                                        ? "inputSuccess"
                                        : "input"
                                }
                                type="text"
                                placeholder="Tu email"
                                name="email"
                                autoFocus
                                autoComplete="false"
                            />
                            <ErrorMessage
                                name="email"
                                component="span"
                                className="errorMessage"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col my-2">
                            <label
                                htmlFor="password"
                                className="block my-1 font-semibold"
                            >
                                Contraseña:
                            </label>
                            <div className="relative w-full">
                                <Field
                                    className={
                                        touched.password && errors.password
                                            ? "inputError"
                                            : touched.password &&
                                              !errors.password
                                            ? "inputSuccess"
                                            : "input"
                                    }
                                    type={isPasswordShow ? `text` : `password`}
                                    name="password"
                                    placeholder="Tu contraseña"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <button
                                        onClick={toggleShowPassword}
                                        type="button"
                                    >
                                        {isPasswordShow ? (
                                            <AiFillEyeInvisible
                                                size="1.5rem"
                                                color="#18181b"
                                            />
                                        ) : (
                                            <AiFillEye
                                                size="1.5rem"
                                                color="#18181b"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="span"
                                className="errorMessage"
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col mt-4">
                            <Link
                                className="text-center text-sm mb-2 link"
                                to="/changepassword"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                            <button
                                type="submit"
                                className="btnPrimary"
                                disabled={isSubmitting}
                            >
                                Iniciar sesión
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                OR
                            </p>
                        </div>

                        {/* Google */}
                        <button type="submit" className="grid btnPrimary">
                            <div className="flex flex-row justify-self-center items-center gap-2">
                                <FcGoogle size="1.5rem" />
                                <span className="text-lg">
                                    Iniciar sesión con Google
                                </span>
                            </div>
                        </button>

                        {/* Links */}
                        <div className="flex flex-col mt-8">
                            <div className="text-center flex-row my-1">
                                ¿No tenes cuenta?{" "}
                                <Link className="link" to="/signup">
                                    Registrate.
                                </Link>
                            </div>
                            <div className="text-center flex-row my-">
                                Volver al{" "}
                                <Link className="link" to="/">
                                    home.
                                </Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignIn;
