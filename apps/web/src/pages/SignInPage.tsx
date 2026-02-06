import { useEffect, useState } from "react";
import { signIn, signOut } from "../api/auth";
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
    <div>
      <h1>Sign in</h1>
      {user && <h2>You are signed in as {user.email}</h2>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Email: </label>
          <input value={email} onChange={onEmailChange} type="email" required />
        </div>

        <div>
          <label>Password: </label>
          <input value={password} onChange={onPasswordChange} type="password" required />
        </div>

        {signinReq.error && <div>{errorMsg}</div>}

        <button disabled={signinReq.loading} type="submit">
          {signinReq.loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}