import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Select from "react-select";

// eslint-disable-next-line react/prop-types
const Questions = ({ data = [] }) => {
  const [selectValue, setSelectValue] = useState({});
  return (
    <div className="d-flex flex-column quesiton p-3 gap-5">
      {data.map((e, i) => (
        <div key={i}>
          <h1>{e.titleQuestion}</h1>
          <div className="d-flex align-items-center gap-4">
            {e.type === "checkbox" &&
              e.responseOptions?.map((qe, i) => (
                <div key={i}>
                  <InputsDependingUponType data={qe} type={e.type} />
                </div>
              ))}
            {e.type === "radioButton" &&
              e.responseOptions?.map((qe, i) => (
                <div key={i}>
                  <InputsDependingUponType data={qe} type={e.type} />
                </div>
              ))}
            {e.type == "textArea" && (
              <div className="w-100">
                <Form.Control as="textarea" aria-label="With textarea" />
              </div>
            )}

            {e.type === "comboBox" && (
              <div className="w-100">
                <div className=" w-100">
                  <Select
                    options={e.responseOptions?.map((pe) => ({
                      value: pe.titleResponse,
                      label: pe.valueResponse,
                    }))}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
function InputsDependingUponType({ type, data }) {
  if (type === "checkbox") {
    return (
      <div className="d-flex align-items-center gap-1">
        <Form.Check />
        {data.titleResponse}
      </div>
    );
  } else if (type === "radioButton") {
    return (
      <div className="d-flex align-items-center gap-1">
        <InputGroup.Radio
          aria-label="Radio button for following text input"
          name="options"
        />
        {data.titleResponse}
      </div>
    );
  }
}
