import { useDispatch, useSelector } from "react-redux"

export default function Login() {

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}