import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Page not found 😢</h2>
      <p>The page you are looking for does not exist.</p>

      <Link to="/">← Go back to Home</Link>
    </div>
  );
}
