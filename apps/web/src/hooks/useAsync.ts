import { useState } from "react";

export function useAsync<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function run(...args: TArgs): Promise<TResult> {
    setLoading(true);
    setError("");

    try {
      const result = await fn(...args);
      return result;
    } catch (e: any) {
      const msg = e?.payload?.message ?? e?.message ?? "Request failed";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError("");
  }

  return {
    run,
    loading,
    error,
    clearError,
  };
}
