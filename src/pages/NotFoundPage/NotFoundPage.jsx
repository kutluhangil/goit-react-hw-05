import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h2 className={css.code}>404</h2>
      <p className={css.message}>Page not found</p>
      <Link to="/" className={css.link}>
        ← Go back to Home
      </Link>
    </div>
  );
}
