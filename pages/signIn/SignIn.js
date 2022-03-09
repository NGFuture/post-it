import React, { useState, useEffect } from "react";
import { auth } from "../../config/fire-config";
import { Container, Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import style from "../../styles/Home.module.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";


import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { MainProvider } from "@/components/context/MainContext";

const SignInPage = ({ }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("Error message");
  const router = useRouter();

  const routing = (user) => {
    router.query.routeTo ?
      router.push(router.query.routeTo) :
      (router.query.routeBack ?
        router.push(`${router.query.routeBack}${user.uid}`) :
        router.push("/"))
  }


  const login = () => {
    signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    )
      .then((user) => {
        setErrorMessage("");
        routing(user)
      }).catch((error) => {
        const errMsg = error.message;
        if (errMsg.includes("invalid-email")) {
          setErrorMessage(
            "Invalid Email, Please provide email in 'example@domin.com' format"
          );
        } else if (errMsg.includes("user-not-found")) {
          setErrorMessage("User does not exist. Please sign up.");
        } else if (errMsg.includes("wrong-password")) {
          setErrorMessage(
            "The password you proivded does not match our records. Please check your password or click on 'Forgot password'."
          );
        }
      })
  };


  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
      }).then(() => {
        onAuthStateChanged(auth, (user) =>
          routing(user))
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("sorry, try again. ", errorMessage);
      });
  };
  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setErrorMessage("");
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      }).then(() => {
        onAuthStateChanged(auth, (user) =>
          routing(user))
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setErrorMessage("");
  }, [userEmail, userPassword]);



  return (
    <MainProvider>
      <Container>
        <div className={style.signInContainer}>
          <h1>Sign In</h1>

          <Form
            validated={userEmail && userPassword ? true : false}
            className={style.formContainer}
            onSubmit={() => login()}

          >
            <Form.Group className="mb-3" controlId="validateUserEmail">
              <Form.Label className="d-flex align-item-center justify-content-between">
                Email address{" "}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setErrorMessage("");
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Email.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex align-item-center justify-content-between">
                Password
            </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                  setErrorMessage("");
                }}
                required
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Passwords must be at least six letters long.
            </Form.Control.Feedback>
            </Form.Group>
            <small style={{ color: "#D50005" }}> {errorMessage} </small><br />

            <small className="">
              <u
                onClick={() => {
                  router.push("/signIn/ForgotPassword");
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Forgot password
            </u>
            </small>

            <div>
              <small style={{ justifyContent: "flex-start" }}>
                Need an account?
              <span
                  style={{ cursor: "pointer", color: "blue" }}
                  className="w-100"
                  onClick={() => router.push("/signIn/SignUp")}
                >
                  {" "}
                  Sign up{" "}
                </span>
              </small>
            </div>

            <div className="d-flex w-100 justify-content-center mt-3">
              <Button
                style={{
                  background: "#ffc107",
                  border: "none",
                  color: "black",
                  width: "60%",
                }}
                onClick={() => {
                  if (userEmail !== "" || userPassword !== "") {
                    login()
                  }
                }}
              >
                Sign In
            </Button>
            </div>
          </Form>
          <hr />
          <p className="m-auto text-center py-3"> Or Login with: </p>
          <div className="d-flex justify-content-center border-top-0">
            <div className={style.providerButtons}>

              <button onClick={() => {
                googleLogin();
                routing()

              }}
              >
                <FcGoogle />
              </button>

              <button
                style={{ color: "#13315f" }}
                className={style.facebookButton}
                onClick={() => {
                  facebookLogin();

                }}
              >
                <AiFillFacebook />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </MainProvider>
  );
};

export default SignInPage;


