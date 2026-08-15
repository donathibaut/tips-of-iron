import { Helmet } from "react-helmet-async";

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Tips of Iron connection page" />
      </Helmet>
      <main>
        <section>
          <form action="">
            <label htmlFor="">Login ID (email address):</label>
            <input type="text" />
            <label htmlFor="">Password:</label>
            <input type="text" />
            <button type="submit">Submit</button>
          </form>
          <a href="">Create a new account</a>
        </section>
      </main>
    </>
  );
}
