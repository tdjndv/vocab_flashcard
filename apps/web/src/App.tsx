import { useEffect, useState } from "react";

type Word = {
  id: number;
  term: string;
  definition: string;
};

export default function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function loadWords() {
      try {
       

        const res = await fetch("http://localhost:3000/auth/signin", {
          method: "POST"
        });
        const data = await res.json()
        console.log(data)

      } catch (err) {
        
      }
    }

    loadWords();
  }, [count]);

  return (
    <div style={{ padding: 24 }}>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
