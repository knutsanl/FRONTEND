import { Link } from "react-router-dom";
import "./reset-password.css";

function ResetPassword(props) {
  return (
    <div id="resetpassword-page" >
        <h1>Reset password</h1>
        <p>Enter your email to get a link to reset your password.</p>
        <form onSubmit=''>
            <input type="email" name="email" placeholder="Enter email" />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default ResetPassword;
