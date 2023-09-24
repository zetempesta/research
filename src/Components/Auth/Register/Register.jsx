import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AiFillLock, AiOutlineProfile } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-container-wrapper">
      <h1 className="text-center my-5">Register</h1>

      <div className="d-flex align-items-center gap-3 m-3 flex-md-nowrap flex-wrap">
        <InputGroup className=" m-auto">
          <InputGroup.Text id="basic-addon1">
            <AiOutlineProfile />
          </InputGroup.Text>
          <Form.Control
            placeholder="Userame"
            aria-label="Userame"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className=" m-auto ">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
      <div className="d-flex flex-column align-items-center gap-3 m-3 ">
        <InputGroup className=" m-auto m-3">
          <InputGroup.Text id="basic-addon1">
            <AiFillLock />
          </InputGroup.Text>
          <Form.Control
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className=" m-auto m-3">
          <InputGroup.Text id="basic-addon1">
            <AiFillLock />
          </InputGroup.Text>
          <Form.Control
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button variant="light" className="w-100">
          Submit
        </Button>
      </div>
      <div className="m-3 text-center">
        <Form.Text>
          Already Registered?<Link to={"/login"}>Login</Link>
        </Form.Text>
      </div>
    </div>
  );
};

export default Register;
