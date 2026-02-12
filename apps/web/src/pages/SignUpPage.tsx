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
    <div className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="mx-auto w-full max-w-[1000px] mt-20 flex flex-col items-center gap-4">
    <p className="text-white font-bold text-2xl">
      Sign up for Vocab Flashcard
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

      <div className="flex flex-col">
        <label className="text-white font-normal text-base">Confirm password</label>
        <input
          className="w-full h-6 rounded border bg-gray-100 px-2"
          value={confirm}
          onChange={onConfirmChange}
          type="password"
          required
        />
      </div>

      {signupReq.error && (
        <div className="w-full rounded border border-red-400 bg-red-100 px-3 py-2 text-sm text-red-800">
          {String(signupReq.error)}
        </div>
      )}

      <button
        className="w-full h-8 rounded text-sm font-semibold text-lg
          text-white bg-green-600 border"
        disabled={signupReq.loading}
        type="submit"
      >
        {signupReq.loading ? "Signing up..." : "Sign up"}
      </button>
    </form>

    <div className="flex flex-row gap-2">
      <span className="text-white">
        Already have an account?
      </span>

      <a
        href="/signin"
        className="text-cyan-600 font-bold hover:text-cyan-700 text-base"
      >
        Sign in here
      </a>
    </div>
  </div>
</div>
  );
}
