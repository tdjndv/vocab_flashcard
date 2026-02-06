import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import { useAsync } from "../hooks/useAsync";
import { useAuth } from "../auth/AuthContext";

export default function SignInPage() {

  const signupReq = useAsync(signUp);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("")

  const navigate = useNavigate()

  const {user} = useAuth()

  useEffect(() => {
    if (user) {
      navigate("/vocab", {replace: true})
    }
  }, [user])

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

  async function onSubmit(e: any) {
    e.preventDefault();

    try {
        const user = await signupReq.run(email, password);

        console.log(user)
        navigate("/vocab")
    } catch(e) {
        // catch rejected promise do nothing
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
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

      </form>  
    </div>
  );
}
