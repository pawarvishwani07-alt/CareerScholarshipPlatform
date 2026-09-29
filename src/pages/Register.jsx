import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [educationLevel, setEducationLevel] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  /* =========================================================
     REGISTER STUDENT
  ========================================================= */

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://career-scholarship-backend.onrender.com/api/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            full_name: fullName,
            email: email,
            password: password,
            education_level: educationLevel,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message || "Registration failed."
        );

        setIsLoading(false);
        return;
      }

      /* Registration successful */

      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);

      setErrorMessage(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }

    setIsLoading(false);
  };


  return (
    <div className="register-page">

      {/* LEFT SECTION */}

      <div className="register-left">

        <Link to="/" className="register-brand">
          Career<span>Scholarship</span>
        </Link>

        <div className="register-intro">

          <p className="register-tag">
            START YOUR JOURNEY
          </p>

          <h1>
            Create your
            <br />
            <span>student account.</span>
          </h1>

          <p className="register-description">
            Join Career ScholarshipPlatform and discover career paths,
            scholarships and opportunities designed to help you plan
            your future.
          </p>

          <div className="register-points">

            <div className="register-point">
              <span>✓</span>
              <p>Explore career opportunities</p>
            </div>

            <div className="register-point">
              <span>✓</span>
              <p>Discover scholarships</p>
            </div>

            <div className="register-point">
              <span>✓</span>
              <p>Get personalized guidance</p>
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT SECTION */}

      <div className="register-right">

        <div className="register-box">

          <div className="register-header">

            <p className="register-small-title">
              WELCOME
            </p>

            <h2>
              Create Account
            </h2>

            <p>
              Register to access Career ScholarshipPlatform.
            </p>

          </div>


          {/* ERROR MESSAGE */}

          {errorMessage && (
            <div className="register-error">
              {errorMessage}
            </div>
          )}


          {/* REGISTER FORM */}

          <form onSubmit={handleRegister}>

            {/* FULL NAME */}

            <div className="register-form-group">

              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="register-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="register-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="register-password-field">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                  required
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <small>
                Password must contain at least 8 characters.
              </small>

            </div>


            {/* EDUCATION */}

            <div className="register-form-group">

              <label htmlFor="education">
                Education Level
              </label>

              <select
                id="education"
                value={educationLevel}
                onChange={(e) =>
                  setEducationLevel(e.target.value)
                }
                required
              >

                <option value="" disabled>
                  Select your education level
                </option>

                <option value="after10">
                  After 10th
                </option>

                <option value="after12">
                  After 12th
                </option>

                <option value="graduation">
                  Graduation
                </option>

                <option value="postgraduation">
                  Post Graduation
                </option>

              </select>

            </div>


            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="register-submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>


          {/* FOOTER */}

          <div className="register-footer">

            <p>
              Already have an account?
              <Link to="/login">
                {" "}Login
              </Link>
            </p>

            <Link
              to="/"
              className="register-back-home"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;