import { useEffect, useState } from "react";
import { signIn } from "../api/auth";
import { useAsync } from "../hooks/useAsync";

import {useNavigate} from "react-router-dom"
import {useAuth} from "../auth/AuthContext"

export default function SignInPage() {

  const {user, setUser} = useAuth()

  const signinReq = useAsync(signIn)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/vocab", {replace: true})
    }
  }, [user])

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (signinReq.error) signinReq.clearError();
    setEmail(e.target.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (signinReq.error) signinReq.clearError();
    setPassword(e.target.value);
  }

  async function onSubmit(ev: any) {
    ev.preventDefault();
    
    try {
      const user = await signinReq.run(email, password);
      
      console.log(user)
      setUser(user)
      navigate("/vocab")
    } catch(e) {
      //catch rejected promise do nothing
    }
  }

  const errorMsg =
    typeof signinReq.error === "string"
      ? signinReq.error
      : (signinReq.error as any)?.message ?? String(signinReq.error ?? "");

  return (
    <div className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="mx-auto w-full max-w-[1000px] mt-20 flex flex-col items-center gap-4">
        <p className="text-white font-bold text-2xl">
          Sign in to Vocab Flashcard
        </p>

        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="text-white font-normal text-base">Email</label>
            <input
              className="w-full rounded border h-6 px-2 bg-gray-100"
              value={email}
              onChange={onEmailChange}
              type="email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white font-normal text-base">Password</label>
            <input
              className="w-full h-6 rounded border bg-gray-100 px-2"
              value={password}
              onChange={onPasswordChange}
              type="password"
              required
            />
          </div>

          {signinReq.error && <div className="error">{errorMsg}</div>}

          <button
            className="w-full h-8 rounded text-sm font-semibold text-lg
              text-white bg-green-600 border"
            disabled={signinReq.loading}
            type="submit"
          >
            {signinReq.loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex flex-row gap-2">
          <span className="text-white">
            Don't have an account?
          </span>

          <a
            href="/signup"
            className="text-cyan-600 font-bold hover:text-cyan-700 text-base"
          >
            Sign up here
          </a>


        </div>
      </div>
    </div>
  );
}