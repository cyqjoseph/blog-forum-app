import { Link } from "react-router-dom";

function Home(props: any) {
  return (
    <div>
      <h1>HOME</h1>
      <h1>Status: {props.authenticated}</h1>
      <p>
        Don't have an account? <Link to="auth"> Register</Link>
      </p>
    </div>
  );
}

export default Home;
