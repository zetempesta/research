import { Button, Spinner, Tab, Tabs } from "react-bootstrap";
import Contacts from "../Contacts/Contacts";
import { useEffect, useLayoutEffect, useState } from "react";
import Questions from "../Questions/Questions";

import QuestionaireService from "../../service/QuestionaireService";
import { divideIntoThree } from "../../service/QuestionDivider";
import { toast } from "react-toastify";

export const TabContainer = () => {
  const [activeKey, setActiveKey] = useState("0");
  const [formData, setFormData] = useState({
    idResearch: 0,
    dontAnswer: false,
    dontTalk: false,
    person: {
      idPerson: 0,
      name: "",
      sex: "male",
      idCity: 0,
      idNeighborhood: 0,
      phones: [],
    },
    responses: [],
    questions: [],
    loading: true,
  });
  const getResearch = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("questionare_user"));

      const { data } = await QuestionaireService.research(user.id ?? 0);
      setFormData({
        ...{
          idResearch: 0,
          dontAnswer: false,
          dontTalk: false,
          person: {
            idPerson: 0,
            name: "",
            sex: "male",
            idCity: 0,
            idNeighborhood: 0,
            phones: [],
          },
          responses: [],
          questions: [],
          loading: true,
        },
        ...data,
        loading: false,
        responses: data.questions.map((e) => ({
          idQuestion: e.idQuestion,
          type: e.type,
          response: [],
        })),
      });
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    getResearch();
  }, []);
  if (formData.loading) {
    return (
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div className="super-wrapper">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="tab-container-wrapper"
      >
        <Tabs
          activeKey={activeKey}
          className="mb-3 "
          fill
          onSelect={(e) => {
            setActiveKey(e);
            console.log(e, typeof e);
          }}
        >
          <Tab
            eventKey={`0`}
            title="Contact"
            className="border-warning-subtle bg-transparent"
          >
            <Contacts form={formData} setForm={setFormData} />
          </Tab>
          {divideIntoThree(formData.questions).map((e, i) => (
            <Tab
              eventKey={`${i + 1}`}
              key={i}
              title={
                i === divideIntoThree(formData.questions).length - 1
                  ? "Final"
                  : `Questions ${i + 1}`
              }
              className="border-warning-subtle bg-transparent"
            >
              <Questions data={e} form={formData} setForm={setFormData} />
            </Tab>
          ))}
        </Tabs>
      </form>
      <div className="d-flex justify-content-between footer">
        {activeKey !== "0" ? (
          <Button
            variant="light"
            onClick={() => setActiveKey((prev) => String(parseFloat(prev) - 1))}
          >
            Anterior
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          variant="light"
          onClick={async () => {
            const answer = JSON.parse(JSON.stringify(formData));
            delete answer.questions;
            delete answer.name;
            delete answer.person.phones;
            delete answer.loading;
            answer.responses = answer.responses.map((e) => ({
              idQuestion: e.idQuestion,
              type: e.type,
              response: e.response.length > 0 ? e.response : [""],
            }));
            answer.person.idNeighborhood = !!answer.person.idNeighborhood
              ? answer.person.idNeighborhood
              : 0;
            if (
              parseInt(activeKey) === divideIntoThree(formData.questions).length
            ) {
              try {
                await QuestionaireService.answer(answer);
                setFormData((prev) => ({ ...prev, loading: true }));
                await getResearch();
                toast.success("Successfully Submitted");
                return setActiveKey("0");
              } catch (error) {
                toast.error(error.message);
                return;
              }
            }
            QuestionaireService.answer(answer);
            setActiveKey((prev) => String(parseFloat(prev) + 1));
          }}
        >
          {parseInt(activeKey) !== divideIntoThree(formData.questions).length
            ? "Next"
            : "Finish"}
        </Button>
      </div>
    </div>
  );
};
