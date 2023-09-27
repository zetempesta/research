import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineHome, AiFillBuild, AiFillSmile } from "react-icons/ai";
import { AiOutlineProfile } from "react-icons/ai";
import Select from "react-select";
import { useEffect } from "react";
import { toast } from "react-toastify";
import QuestionaireService from "../../service/QuestionaireService";
const Contacts = ({ form, setForm }) => {
  const [options, setOptions] = useState({ cities: [], neighbourhood: [] });
  const [values, setValues] = useState({
    cities: options.cities
      .map((e) => ({
        label: e.name,
        value: e.id,
      }))
      .find((ef) => (ef.value = form?.person?.idCity)),
    neighbourhood: options.neighbourhood
      .map((e) => ({
        label: e.name,
        value: e.id,
      }))
      .find((ef) => (ef.value = form?.person?.idNeighboor)),
  });

  const getOptions = async () => {
    try {
      const { data: cities } = await QuestionaireService.city();
      const { data: neighbourhood } = await QuestionaireService.neighborhood();

      setOptions({ cities, neighbourhood });
      setValues({
        cities: cities
          .map((e) => ({
            label: e.name,
            value: e.id,
          }))
          .find((ef) => (ef.value = form?.person?.idCity)),
        neighbourhood: neighbourhood
          .map((e) => ({
            label: e.name,
            value: e.id,
          }))
          .find((ef) => (ef.value = form?.person?.idNeighboor)),
      });
      console.log(form);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getOptions();
    console.log();
  }, []);
  return (
    <div className="d-flex  flex-column ">
      <div className="d-flex gap-2  flex-md-nowrap flex-wrap py-5 ">
        <InputGroup className="m-3">
          <InputGroup.Text id="basic-addon1">
            <AiOutlineProfile />
          </InputGroup.Text>
          <Form.Control
            value={form.person.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                person: { ...prev.person, name: e.target.value },
              }))
            }
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="m-3">
          <InputGroup.Text id="basic-addon1">
            <AiOutlineHome />
          </InputGroup.Text>
          <Select
            className="react-select"
            aria-label="Default select example"
            value={options.cities
              .map((e) => ({
                label: e.name,
                value: e.id,
              }))
              .find((e) => e.value === form.person.idCity)}
            options={options.cities.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                person: {
                  ...prev.person,
                  idCity: parseInt(e.value),
                },
              }));

              setValues((prev) => ({ ...prev, cities: e }));
            }}
            placeholder="Cities"
          />
        </InputGroup>
        <InputGroup className="m-3  ">
          <InputGroup.Text id="basic-addon1">
            <AiFillBuild />
          </InputGroup.Text>
          <Select
            className="react-select"
            aria-label="Default select example"
            value={values.neighbourhood}
            options={options.neighbourhood.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                person: {
                  ...prev.person,
                  idNeighboor: parseInt(e.value),
                },
              }));

              setValues((prev) => ({ ...prev, neighbourhood: e }));
            }}
            placeholder="Neighbourhood"
          />
        </InputGroup>
        <InputGroup className="m-3  ">
          <InputGroup.Text id="basic-addon1">
            <AiFillSmile />
          </InputGroup.Text>
          <Select
            className="react-select"
            aria-label="Default select example"
            value={[
              { label: "Masculino", value: "male" },
              { label: "Feminino", value: "female" },
            ].find((e) => e.value === form.person.sex)}
            options={[
              { label: "Masculino", value: "male" },
              { label: "Feminino", value: "female" },
            ]}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                person: {
                  ...prev.person,
                  sex: e.value,
                },
              }));
            }}
            placeholder="Sex"
          />
        </InputGroup>
      </div>
      <div className="d-flex m-3 flex-md-nowrap flex-wrap">
        <FormGroup className="flex-col border border-light rounded-1 text-center form-group-contact w-100 md-w-75">
          <strong>Phone</strong>
          {form?.person?.phones.map((phone, i) => (
            <Form.Control
              value={phone}
              onChange={(ce) => {
                const updatedPhones = [...form.person.phones]; // Create a copy of the phones array
                updatedPhones[i] = ce.target.value; // Update the specific phone number
                setForm((prev) => ({
                  ...prev,
                  person: {
                    ...prev.person,
                    phones: updatedPhones, // Update the phones array in the state
                  },
                }));
              }}
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
            <Form.Check
              checked={form.dontTalk}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, dontTalk: e.target.checked }))
              }
            />
            Did not answer the phone
          </div>
          <div className="d-flex gap-1">
            <Form.Check
              checked={form.dontAnswer}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, dontAnswer: e.target.checked }))
              }
            />
            Do not answer
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
