import { useState } from "react";
import { Button, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineProfile } from "react-icons/ai";
import { collection, cities } from "../../../data/APIMOCKDATA";
const Contacts = () => {
  const [inputs, setinputs] = useState(collection.person.phones.length);
  return (
    <div className="d-flex  flex-column ">
      <div className="d-flex gap-2  flex-md-nowrap flex-wrap py-5 ">
        <InputGroup className="m-3">
          <InputGroup.Text id="basic-addon1">
            <AiOutlineProfile />
          </InputGroup.Text>
          <Form.Control
            defaultValue={collection.person.name}
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="m-3">
          <InputGroup.Text id="basic-addon1">
            <AiOutlineHome />
          </InputGroup.Text>
          <Form.Select aria-label="Default select example">
            <option disabled selected className="d-none">
              City
            </option>
            <option value="123456" selected>
              123456
            </option>
            {cities.map((e, i) => (
              <option value={e.idCity} key={i}>
                {e.nameCity}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </div>
      <div className="d-flex m-3 flex-md-nowrap flex-wrap">
        <FormGroup className="flex-col border border-light rounded-1 text-center form-group-contact w-100 md-w-75">
          <strong>Phone</strong>
          {[...new Array(inputs)].map((e, i) => (
            <Form.Control
              defaultValue={collection.person.phones[i]}
              key={i}
              className="rounded-0"
            />
          ))}

          <div className="d-flex justify-content-between mt-1">
            <div></div>
            {/* <Button
              variant="light"
              onClick={() => setinputs((prev) => prev + 1)}
            >
              +
            </Button> */}
          </div>
        </FormGroup>
        <div className="w-100 md-w-25 d-flex flex-column p-3">
          <div className="d-flex gap-1">
            <Form.Check />
            Did not answer the phone
          </div>
          <div className="d-flex gap-1">
            <Form.Check />
            Do not answer
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
