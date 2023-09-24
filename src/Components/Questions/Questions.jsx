import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Select from "react-select";

// eslint-disable-next-line react/prop-types
const Questions = ({ data = [], setForm }) => {
  return (
    <div className="d-flex flex-column quesiton p-3 gap-5">
      {data.map((e, i) => (
        <div key={i}>
          <h5>{e.titleQuestion}</h5>
          <div className="d-flex align-items-center gap-4 flex-wrap">
            {e.type === "checkbox" &&
              e.responseOptions?.map((qe, i) => (
                <div key={i}>
                  <InputsDependingUponType
                    idQuestion={e.idQuestion}
                    data={qe}
                    type={e.type}
                    setForm={setForm}
                  />
                </div>
              ))}
            {e.type === "radioButton" &&
              e.responseOptions?.map((qe, i) => (
                <div key={i}>
                  <InputsDependingUponType
                    idQuestion={e.idQuestion}
                    data={qe}
                    type={e.type}
                    name={e.idQuestion}
                    setForm={setForm}
                  />
                </div>
              ))}
            {e.type == "textArea" && (
              <div className="w-100">
                <Form.Control
                  aria-label="With textarea"
                  onChange={(ce) =>
                    setForm((prev) => ({
                      ...prev,
                      responses: [
                        ...prev.responses.map((qe) => {
                          if (qe?.idQuestion !== e?.idQuestion) {
                            return qe;
                          } else {
                            const answerobj = { ...qe };
                            answerobj.response = [ce.target.value];

                            return answerobj;
                          }
                        }),
                      ],
                    }))
                  }
                />
              </div>
            )}

            {e.type === "comboBox" && (
              <div className="w-100">
                <div className=" w-100">
                  <Select
                    onChange={(ce) =>
                      setForm((prev) => ({
                        ...prev,
                        responses: [
                          ...prev.responses.map((qe) => {
                            if (qe?.idQuestion !== e?.idQuestion) {
                              return qe;
                            } else {
                              const answerobj = { ...qe };
                              answerobj.response = [ce.value];

                              return answerobj;
                            }
                          }),
                        ],
                      }))
                    }
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
function InputsDependingUponType({ name, idQuestion, type, data, setForm }) {
  if (type === "checkbox") {
    return (
      <div className="d-flex align-items-center gap-1">
        <Form.Check
          onChange={(ce) =>
            setForm((prev) => ({
              ...prev,
              responses: [
                ...prev.responses.map((qe) => {
                  if (qe?.idQuestion !== idQuestion) {
                    return qe;
                  } else {
                    const answerobj = { ...qe };
                    ce.target.checked
                      ? answerobj.response.push(data.titleResponse)
                      : answerobj.response.filter(
                          (prev) => prev !== data.valueResponse
                        );

                    return answerobj;
                  }
                }),
              ],
            }))
          }
        />
        {data.titleResponse}
      </div>
    );
  } else if (type === "radioButton") {
    return (
      <div className="d-flex align-items-center gap-1">
        <InputGroup.Radio
          aria-label="Radio button for following text input"
          name={"options" + name}
          onChange={(ce) =>
            setForm((prev) => ({
              ...prev,
              responses: [
                ...prev.responses.map((qe) => {
                  if (qe?.idQuestion !== idQuestion) {
                    return qe;
                  } else {
                    const answerobj = { ...qe };
                    answerobj.response[0] = data.valueResponse;

                    return answerobj;
                  }
                }),
              ],
            }))
          }
        />
        {data.titleResponse}
      </div>
    );
  }
}
