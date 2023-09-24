/* eslint-disable react/no-unescaped-entities */
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AiFillLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import QuestionaireService from "../../../service/QuestionaireService";
const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("questionare_user"));
    if (user?.username) {
      navigate("/home");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await QuestionaireService.login(formData);
      if (data.username) {
        localStorage.setItem("questionare_user", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="auth-container-wrapper ">
      <h1 className="text-center my-5 ">Login</h1>

      <form
        className="d-flex flex-column align-items-center gap-3 m-3 "
        onSubmit={handleSubmit}
      >
        <InputGroup className=" m-auto ">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className=" m-auto m-3">
          <InputGroup.Text id="basic-addon1">
            <AiFillLock />
          </InputGroup.Text>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button type="submit" variant="light" className="w-100">
          Submit
        </Button>
      </form>
      <div className="m-3 text-center">
        {/* <Form.Text>
          Haven't registered yet?<Link to={"/register"}>Register</Link>
        </Form.Text> */}
      </div>
    </div>
  );
};

export default Login;
