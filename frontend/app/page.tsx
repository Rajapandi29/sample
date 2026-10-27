
"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function callApi() {
    setLoading(true);

    try {
      const response = await fetch("/api/hello");

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch {
      setMessage("API request failed. Check server logs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      maxWidth: 800,
      margin: "60px auto",
      padding: 24,
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>My Azure Application</h1>
      <p>Frontend: Next.js</p>
      <p>Backend: Node.js / Express</p>

      <button onClick={callApi} disabled={loading}>
        {loading ? "Loading..." : "Call Backend API"}
      </button>

      <pre style={{
        marginTop: 20,
        padding: 16,
        background: "#f3f4f6",
        whiteSpace: "pre-wrap"
      }}>
        {message}
      </pre>
    </main>
  );
}
