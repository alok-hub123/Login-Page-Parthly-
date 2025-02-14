"use client";
import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  provider,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "./firebase";
import Login from "./Login";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { Toast } from "flowbite-react";
import { HiX } from 'react-icons/hi'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle Authentication (Login/Signup)
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Handle Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the user's email is verified
        if (!user.emailVerified) {
          setError("Please verify your email before logging in.");
          setLoading(false);
          return;
        }
        console.log("User logged in:", userCredential.user);

        // Redirect to homepage after successful login and delete the browser stack, so that user can't go back to login page
        navigate("/homepage", { replace: true });

      } else {
        // Handle Signup
        if (password !== confirmPassword) {
          setError("Password and Confirm password do not match.");
          setLoading(false);
          return;
        }

        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);

        // Store additional attributes in Firestore

        await user.updateProfile({
          displayName: { fullName },
        });

        // Optionally, save additional data to Firestore
        // const db = getFirestore(); // Import Firestore
        // await setDoc(doc(db, "users", user.uid), {
        //   uid: user.uid,
        //   email: user.email,
        //   fname,
        //   lname,
        //   createdAt: new Date(),
        // });

        alert("Registration successful! Please check your email to verify your account.");

        // Switch to login page after successful sign-up
        setIsLogin(true);

      }

    } catch (error) {
      console.error("Authentication Error:", error.message);
      setError("Invalid Credentials. Please try again.");
    }
    setLoading(false);
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Successful:", result.user);

      // Redirect to homepage after successful login and delete the browser stack, so that user can't go back to login page
      navigate("/homepage", { replace: true });

    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Password Reset Error:", error.message);
      setError("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div className="flex overflow-hidden md:flex-row justify-center items-center min-h-screen bg-[#c9f2c7] p-4">
      {/* Error Message */}
      {error &&
        <Toast className="absolute top-5 left-auto right-auto w-full">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{error}</div>
          <Toast.Toggle />
        </Toast>
      }
      <div className="flex">
        <div className="w-full md:h-[85vh] overflow-hidden max-w-md p-6 space-y-6 shadow-lg rounded-tl-lg rounded-bl-lg">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            {isLogin ? "Welcome Back !" : "Create an Account !"}
          </h1>
          <p className="text-center text-gray-500">
            {isLogin
              ? <>Simplify your workflow and boost your productivity with <span className="font-bold text-[#243119]">Parthly</span></>
              : ""
            }
          </p>

          <form className="space-y-4" onSubmit={handleAuth}>
            {isLogin ? (
              <>
                <Login setEmail={setEmail} setPassword={setPassword} />
                <p className="text-center">
                  <button
                    className="text-[#243119] hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </p></>
            ) : (
              <SignUp
                setFullName={setFullName}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
              />
            )}
            <button
              type="submit"
              className="w-full p-3 bg-[#5d7853] text-white rounded-3xl hover:bg-[#243119] transition"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center">or continue with</p>
          <div className="flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="p-2 border rounded-full shadow-md hover:shadow-lg"
            >
              <img
                src="./googleIcon.png"
                alt="Google Sign In"
                className="h-10 rounded-full"
              />
            </button>
          </div>
          <p className="text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-[#243119] hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        {/* Illustration Section */}
        <div className="hidden md:h-[85vh] md:flex flex-col items-center w-1/2 p-6 text-center shadow-lg rounded-tr-lg rounded-br-lg bg-[#aceca1]">
          <img
            src={isLogin ? "./loginllustration.png" : "./signupIllustration.png"}
            alt={isLogin ? "Login Illustration" : "SignUp Illustration"}
            className="h-[70vh] w-auto mx-auto"
          />
          <p className="mt-3 text-lg font-semibold text-gray-700">
            Convert your dream career into reality with{" "}
            <span className="font-bold text-xl">Parthly</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;