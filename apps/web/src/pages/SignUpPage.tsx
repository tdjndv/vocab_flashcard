import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { useAsync } from "../hooks/useAsync";

export default function SignInPage() {

  const signupReq = useAsync(signup);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("")

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (signupReq.error) signupReq.clearError()
    setEmail(e.target.value)
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (signupReq.error) signupReq.clearError()
      setPassword(e.target.value)
  }

  function onConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (signupReq.error) signupReq.clearError()
      setConfirm(e.target.value)
  }

  function resetStorage() {
    localStorage.removeItem("user")
  }

  async function onSubmit(e: any) {
    e.preventDefault();

    try {
        const res = await signupReq.run(email, password);
    
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

        <div>
          <label>Confirm: </label>
          <input
            value={confirm}
            onChange={(onConfirmChange)}
            type="password"
            required
          /> 
        </div>

        {signupReq.error && <div>{signupReq.error}</div>}

        <button disabled={signupReq.loading} type="submit">
          {signupReq.loading ? "Signing up..." : "Sign up"}
        </button>

        <button type="button" onClick={resetStorage}>Logout</button>

      </form>  
    </div>
  );
}
