import { Helmet } from "react-helmet-async";
import authSubmitHandler from "../../utils/handlers/authSubmitHandler";

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Tips of Iron connection page" />
      </Helmet>
      <main>
        <section>
          <form onSubmit={authSubmitHandler}>
            <label htmlFor="email">Login ID (email address):</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength="150"
              required
            />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Submit</button>
          </form>

          <a href="">Create a new account</a>
        </section>
      </main>
    </>
  );
}
