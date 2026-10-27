
"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("Click the button to call the API.");
  const [loading, setLoading] = useState(false);

  async function callApi() {
    setLoading(true);
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch {
      setResult(
        "API unavailable. Check Front Door, APIM, networking and DNS."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: "40px auto" }}>
      <h1>Azure Static + Dynamic Application</h1>
      <p>
        This page is statically generated with Next.js.
        The button calls the dynamic backend through Azure API Management.
      </p>

      <button
        onClick={callApi}
        disabled={loading}
        style={{
          padding: "12px 20px",
          background: "#075985",
          color: "white",
          border: 0,
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        {loading ? "Loading..." : "Call Dynamic API"}
      </button>

      <pre style={{
        marginTop: 24,
        padding: 20,
        background: "white",
        borderRadius: 8,
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere"
      }}>
        {result}
      </pre>
    </main>
  );
}
