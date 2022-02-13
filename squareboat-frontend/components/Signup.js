import { UserSignup } from "../helpers/services/UserService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  let [params, setParams] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    checked: true,
  });

  let updateData = (key, value) => {
    setParams({ ...params, [key]: value });
  };

  let validateData = () => {
    return new Promise(async (resolve, reject) => {
      try {
    
        if (!params.name) {
          Swal.fire("", `name cannot be empty`, "error");
          resolve(false);
        }

        if (!params.password) {
          Swal.fire("", `password cannot be empty`, "error");
          resolve(false);
        }

        if (!params.confirm_password) {
          Swal.fire("", `confirm_password cannot be empty`, "error");
          resolve(false);
        }

        if (params["password"] != params["confirm_password"]) {
          Swal.fire("", `Passwords do not match`, "error");
          resolve(false);
        }

        if (!isValidEmail(params.email)) {
          Swal.fire("", `Please Enter a valid email`, "error");
          resolve(false);
        }

        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  };

  let isValidEmail = () => {
    let pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
    return new RegExp(pattern).test(params.email);
  };

  let _signup = async () => {
    try {
      let _validate = await validateData();

      if (!_validate) {
        return;
      }

      let result = await UserSignup(params);

      localStorage.setItem("token", result?.data?.data?.access_token);

      Swal.fire("", "SignUp Successful", "success");

      router.reload('/feeds')


      console.log(result);
    } catch (error) {
      let message = error?.response?.data?.errors[0]?.message;

      if (!message) {
        message = "Server Error";
      }

      Swal.fire("", message, "error");

    }
  };

  return (
    <div className="signup-form">
      <div>
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <br />
        <div className="form-group">
          <div className="row">
            <div className="col-xs-6">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Name"
                value={params.name}
                onChange={(e) => updateData("name", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={params.email}
            onChange={(e) => updateData("email", e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={params.password}
            onChange={(e) => updateData("password", e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="confirm_password"
            placeholder="Confirm Password"
            required="required"
            value={params.confirm_password}
            onChange={(e) => updateData("confirm_password", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="checkbox-inline">
            <input
              type="checkbox"
              checked={params.checked}
              required="required"
            />{" "}
            I accept the Terms of Use and Policy
          </label>
        </div>
        <div className="form-group">
          <button onClick={() => _signup()} className="btn btn-primary btn-lg">
            Sign Up
          </button>
        </div>
      </div>
      <div className="hint-text">
        Already have an account?{" "}
        <a className="_color" href="/login">
          Login here
        </a>
      </div>
      <style scoped jsx>{`
        body {
          color: #fff;
          background: #3598dc !important;
          font-family: "Roboto", sans-serif !important;
        }
        ._color {
          color: blue !important;
        }
        .form-control {
          height: 41px !important;
          background: #f2f2f2 !important;
          box-shadow: none !important;
          border: none;
        }
        .form-control:focus {
          background: #e2e2e2 !important;
        }
        .form-control,
        .btn {
          border-radius: 3px !important;
        }
        .signup-form {
          width: 390px;
          margin: 30px auto !important;
        }
        .signup-form form {
          color: #999;
          border-radius: 3px;
          margin-bottom: 15px;
          background: #fff;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
          padding: 30px;
        }
        .signup-form h2 {
          color: #333;
          font-weight: bold;
          margin-top: 0;
        }
        .signup-form hr {
          margin: 0 -30px 20px;
        }
        .signup-form .form-group {
          margin-bottom: 20px;
        }
        .signup-form input[type="checkbox"] {
          margin-top: 3px;
        }
        .signup-form .row div:first-child {
          padding-right: 10px;
        }
        .signup-form .row div:last-child {
          padding-left: 10px;
        }
        .signup-form .btn {
          font-size: 16px;
          font-weight: bold;
          background: #3598dc;
          border: none;
          min-width: 140px;
        }
        .signup-form .btn:hover,
        .signup-form .btn:focus {
          background: #2389cd !important;
          outline: none;
        }
        .signup-form a {
          color: #fff;
          text-decoration: underline;
        }
        .signup-form a:hover {
          text-decoration: none;
        }
        .signup-form form a {
          color: #3598dc;
          text-decoration: none;
        }
        .signup-form form a:hover {
          text-decoration: underline;
        }
        .signup-form .hint-text {
          padding-bottom: 15px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
