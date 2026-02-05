import { useState } from "react";
import { signIn, signOut } from "../api/auth";
import { useAsync } from "../hooks/useAsync";

import {useNavigate} from "react-router-dom"

import {useAuth} from "../auth/AuthContext"

export default function SignInPage() {

  const {user, setUser} = useAuth()

  const signinReq = useAsync(signIn);
  const signoutReq = useAsync(signOut);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

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

    // ✅ 你应该在这里做一个“登录成功后的动作”
    // 比如：navigate("/"), setUser(user), toast("signed in"), etc.
    
  }

  async function onLogout() {
    await signoutReq.run(); // or await signOut()
    // ✅ 登出后通常也要清理 UI

    setUser(null)

    setEmail("");
    setPassword("");
    signinReq.clearError();
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

        <button disabled={signoutReq.loading} type="button" onClick={onLogout}>
          {signoutReq.loading ? "Logging out..." : "Logout"}
        </button>
      </form>
    </div>
  );
}