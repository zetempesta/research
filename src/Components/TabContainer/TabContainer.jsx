import { Button, Tab, Tabs } from "react-bootstrap";
import Contacts from "../Contacts/Contacts";
import { useState } from "react";
import Questions from "../Questions/Questions";
import { collection, questionCollection } from "../../../data/APIMOCKDATA";

export const TabContainer = () => {
  const [activeKey, setActiveKey] = useState("0");
  return (
    <div className="tab-container-wrapper">
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
          <Contacts />
        </Tab>
        {questionCollection.map((e, i) => (
          <Tab
            eventKey={`${i + 1}`}
            key={i}
            title={
              i === questionCollection.length - 1
                ? "Final"
                : `Questions ${i + 1}`
            }
            className="border-warning-subtle bg-transparent"
          >
            <Questions data={e} />
          </Tab>
        ))}
      </Tabs>
      <div className="d-flex justify-content-between footer">
        {activeKey !== "0" ? (
          <Button
            variant="light"
            onClick={() => setActiveKey((prev) => String(parseFloat(prev) - 1))}
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          variant="light"
          onClick={() => {
            if (parseInt(activeKey) === questionCollection.length) {
              return setActiveKey("0");
            }
            setActiveKey((prev) => String(parseFloat(prev) + 1));
          }}
        >
          {parseInt(activeKey) !== questionCollection.length
            ? "Next"
            : "Finish"}
        </Button>
      </div>
    </div>
  );
};
