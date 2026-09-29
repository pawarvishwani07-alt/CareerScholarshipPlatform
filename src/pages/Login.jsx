import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  /* =========================================================
     LOGIN STUDENT
  ========================================================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();


      /* =====================================================
         LOGIN ERROR
      ===================================================== */

      if (!response.ok) {
        setErrorMessage(
          data.message || "Login failed."
        );

        setIsLoading(false);
        return;
      }


      /* =====================================================
         LOGIN SUCCESS
      ===================================================== */

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      /* Save logged-in student's information */

      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      /* Tell Floating AI Buddy that login changed */

      window.dispatchEvent(
        new Event("authChanged")
      );

      /* Go to Dashboard */

      navigate("/dashboard");

    } catch (error) {

      console.error("Login error:", error);

      setErrorMessage(
        "Unable to connect to the server. Please make sure the backend is running."
      );

    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="login-page">


      {/* =====================================================
          LEFT SECTION
      ===================================================== */}

      <div className="login-left">

        <Link
          to="/"
          className="login-brand"
        >
          Career<span>Scholarship</span>
        </Link>


        <div className="login-intro">

          <p className="login-tag">
            WELCOME BACK
          </p>

          <h1>
            Continue your
            <br />
            <span>career journey.</span>
          </h1>

          <p className="login-description">
            Sign in to explore career opportunities, scholarships and
            guidance that can help you take the next step toward your future.
          </p>

          <div className="login-points">

            <div className="login-point">
              <span>✓</span>
              <p>Explore career pathways</p>
            </div>

            <div className="login-point">
              <span>✓</span>
              <p>Track scholarship opportunities</p>
            </div>

            <div className="login-point">
              <span>✓</span>
              <p>Plan your future with confidence</p>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}

      <div className="login-right">

        <div className="login-box">


          {/* LOGIN HEADER */}

          <div className="login-header">

            <p className="login-small-title">
              STUDENT LOGIN
            </p>

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to continue to Career ScholarshipPlatform.
            </p>

          </div>


          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {errorMessage && (
            <div className="login-error">
              {errorMessage}
            </div>
          )}


          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form onSubmit={handleLogin}>


            {/* EMAIL */}

            <div className="login-form-group">

              <label htmlFor="loginEmail">
                Email Address
              </label>

              <input
                id="loginEmail"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="login-form-group">

              <div className="login-password-label">

                <label htmlFor="loginPassword">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>

              </div>


              <div className="login-password-field">

                <input
                  id="loginPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Logging in..."
                : "Login to Account"}
            </button>

          </form>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="login-footer">

            <p>
              Don't have an account?

              <Link to="/register">
                {" "}Create Account
              </Link>
            </p>

            <Link
              to="/"
              className="login-back-home"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;