"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import appLogo from "@/app/public/images/logo.png";
import Input from "../components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { loginSchema, registerSchema } from "@/libs/zodSchema";

const Auth = () => {
  const [userAuthState, setUserAuthState] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginErrors, setLoginErrors] = useState<string[]>([]);
  const [registerErrors, setRegisterErrors] = useState<string[]>([]);

  const switchUserState = useCallback(() => {
    setUserAuthState((userLogState) =>
      userLogState === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const validationResult = loginSchema.safeParse({ email, password });

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map((error) => {
          switch (error.code) {
            case "invalid_type":
              return "Invalid type";
            case "invalid_string":
              return "Invalid email format";
            case "too_small":
              return "Password must contain at least 8 characters";
            case "too_big":
              return "Value is too big";
            default:
              return "Validation error";
          }
        });
        setLoginErrors(errors);
        return;
      }

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    if (isRegistering) return;
    setIsRegistering(true);

    try {
      const validationResult = registerSchema.safeParse({
        email,
        name,
        password,
      });

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map((error) => {
          switch (error.code) {
            case "invalid_type":
              return "Invalid type";
            case "invalid_string":
              return "Invalid email format";
            case "too_small":
              return "Password must contain at least 8 characters";
            case "too_big":
              return "Value is too big";
            default:
              return "Validation error";
          }
        });
        setRegisterErrors(errors);
        setIsRegistering(false);
        return;
      }

      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, isRegistering, login, name, password]);

  return (
    <div className="min-h-screen h-full w-full relative bg-[url('public/images/hero.jpg')] bg-center bg-fixed bg-cover bg-no-repeat">
      <div className="bg-black min-h-screen h-full w-full lg:bg-opacity-50 ">
        <nav className="py-6 px-10">
          <Image src={appLogo} alt="logo" height={50}></Image>
        </nav>

        <div className="flex justify-center">
          <div className="bg-black rounded-md w-full bg-opacity-60 self-center mt-3 px-16 py-16 lg:w-2/5 lg:max-w-md">
            <h3 className="text-white font-semibold text-3xl mb-5">
              {userAuthState === "login" ? "Sign in" : "Register"}
            </h3>
            <div className="flex flex-col gap-3">
              {userAuthState === "login" ? (
                <>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    label="Email"
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Input
                    id="password"
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                      setLoginErrors([]);
                    }}
                    value={password}
                    label="Password"
                    type="password"
                  />
                  {loginErrors.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm">
                      {error}
                    </p>
                  ))}
                </>
              ) : (
                userAuthState === "register" && (
                  <>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      label="Email"
                      onChange={(e: any) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <Input
                      id="name"
                      onChange={(e: any) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      label="Username"
                      type="text"
                    />
                    <Input
                      id="password"
                      onChange={(e: any) => {
                        setPassword(e.target.value);
                        setRegisterErrors([]);
                      }}
                      value={password}
                      label="Password"
                      type="password"
                    />
                    {registerErrors.map((error, index) => (
                      <p key={index} className="text-red-500 text-sm">
                        {error}
                      </p>
                    ))}
                  </>
                )
              )}
            </div>
            <button
              onClick={userAuthState === "login" ? login : register}
              disabled={isRegistering}
              className={`py-3 rounded-md w-full mt-8 transition ${
                isRegistering
                  ? "bg-neutral-600 cursor-not-allowed"
                  : "bg-red-700 text-white hover:bg-red-500"
              }`}
            >
              {userAuthState === "login" ? "Login" : "Sign up"}
            </button>

            <div
              onClick={() => {
                signIn("google", { callbackUrl: "/profiles", redirect: true });
              }}
              className="flex flex-row gap-4 items-center mt-8 justify-center"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => {
                  signIn("github", {
                    callbackUrl: "/profiles",
                    redirect: true,
                  });
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={50} />
              </div>
            </div>
            <p className="text-neutral-500 mt-10 ">
              {userAuthState === "login"
                ? "New here?"
                : "Already have an account?"}
              <span
                onClick={switchUserState}
                className="text-white cursor-pointer ml-3 hover:underline"
              >
                {userAuthState === "login"
                  ? "Register an account."
                  : "Log in instead."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
