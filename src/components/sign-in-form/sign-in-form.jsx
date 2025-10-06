import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

import { googleSignInStart, emailSignInStart  } from "../../store/user/user.action";

import './sign-in-form.scss'

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {

        dispatch(googleSignInStart());
        // await signInWithGooglePopup();
        // setCurrentUser(user);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            dispatch(emailSignInStart(email, password));
            // await signInAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/invalid-credential":
                    alert("Invalid credentials. Please try again.");
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email. Please sign up.");
                    break;
                default:
                    console.log(error);

            }

        }

        // Create a user document in the database
        // const userDocRef = await createUserDocumentFromAuth(user, { displayName });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />


                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>

                    <Button type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default SignInForm;