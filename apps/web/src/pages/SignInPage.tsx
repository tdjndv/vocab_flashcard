import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../api/auth";
import { useAsync } from "../hooks/useAsync";

export default function SignInPage() {

  const signinReq = useAsync(signin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (signinReq.error) signinReq.clearError()
    setEmail(e.target.value)
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (signinReq.error) signinReq.clearError()
      setPassword(e.target.value)
  }

  function resetStorage() {
    localStorage.removeItem("user")
  }

  async function onSubmit(e: any) {
    e.preventDefault();

    try {
        const res = await signinReq.run(email, password);
    
        localStorage.setItem("user", JSON.stringify(res.data));
    } catch(e) {
        
    }


  }

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email: </label>
          <input 
            value={email}
            onChange={onEmailChange}
            type="email"
            required
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            value={password}
            onChange={(onPasswordChange)}
            type="password"
            required
          /> 
        </div>

        {signinReq.error && <div>{signinReq.error}</div>}

        <button disabled={signinReq.loading} type="submit">
          {signinReq.loading ? "Signing in..." : "Sign in"}
        </button>

        <button type="button" onClick={resetStorage}>Logout</button>

      </form>  
    </div>
  );
}
