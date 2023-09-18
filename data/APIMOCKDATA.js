const collection = {
  idResearch: 25,
  person: {
    idPerson: 12345,
    name: "John Doe",
    idCity: 123456,
    phones: ["800-123-4567", "877-123-1234"],
  },
  questions: [
    {
      idQuestion: 10,
      titleQuestion: "What foods do you like? ",
      type: "checkbox",
      responseOptions: [
        {
          titleResponse: "pasta",
          valueResponse: "pasta",
        },
        {
          titleResponse: "beans",
          valueResponse: "beans",
        },
        {
          titleResponse: "rice",
          valueResponse: "rice",
        },
      ],
    },
    {
      idQuestion: 11,
      titleQuestion: "Which one is the best? ",
      type: "comboBox",
      responseOptions: [
        {
          titleResponse: "pasta",
          valueResponse: "pasta",
        },
        {
          titleResponse: "beans",
          valueResponse: "beans",
        },
        {
          titleResponse: "rice",
          valueResponse: "rice",
        },
      ],
    },
    {
      idQuestion: 12345,
      titleQuestion: "The dog is yellow?",
      type: "radioButton",
      responseOptions: [
        {
          titleResponse: "yes",
          valueResponse: "yes",
        },
        {
          titleResponse: "no",
          valueResponse: "no",
        },
        {
          titleResponse: "maybe",
          valueResponse: "maybe",
        },
      ],
    },
    {
      idQuestion: 876,
      titleQuestion: "The dog is yellow?",
      type: "textArea",
    },
  ],
};
const cities = [
  {
    idCity: 10,
    nameCity: "Nova York",
  },
  {
    idCity: 11,
    nameCity: "Paris",
  },
  {
    idCity: 12,
    nameCity: "Bruxelas",
  },
];

const research = {
  idResearch: 25,
  dontAnswer: false,
  dontTalk: false,
  person: {
    name: "John Keynes",
    idPerson: 12345,
    idCity: 11,
  },
  responses: [
    {
      idQuestion: 10,
      type: "checkbox",
      response: [
        {
          values: [],
        },
      ],
    },
  ],
};

let questions = [
  {
    idQuestion: 10,
    titleQuestion: "What foods do you like? ",
    type: "checkbox",
    responseOptions: [
      {
        titleResponse: "pasta",
        valueResponse: "pasta",
      },
      {
        titleResponse: "beans",
        valueResponse: "beans",
      },
      {
        titleResponse: "rice",
        valueResponse: "rice",
      },
    ],
  },
  {
    idQuestion: 11,
    titleQuestion: "Which one is the best? ",
    type: "comboBox",
    responseOptions: [
      {
        titleResponse: "pasta",
        valueResponse: "pasta",
      },
      {
        titleResponse: "beans",
        valueResponse: "beans",
      },
      {
        titleResponse: "rice",
        valueResponse: "rice",
      },
    ],
  },
  {
    idQuestion: 12345,
    titleQuestion: "The dog is yellow?",
    type: "radioButton",
    responseOptions: [
      {
        titleResponse: "yes",
        valueResponse: "yes",
      },
      {
        titleResponse: "no",
        valueResponse: "no",
      },
      {
        titleResponse: "maybe",
        valueResponse: "maybe",
      },
    ],
  },
  {
    idQuestion: 876,
    titleQuestion: "The dog is yellow?",
    type: "textArea",
  },
];

const divideIntoThree = (questions) => {
  let questionCollection = [];
  let cell = [];
  let stageSeeker = 1;
  for (let i = 0; i < questions.length; i++) {
    if (stageSeeker === 3) {
      stageSeeker = 0;
      cell.push(questions[i]);
      questionCollection.push([...cell]);
      cell = [];
      continue;
    }
    cell.push(questions[i]);
    if (i === questions.length - 1 && stageSeeker !== 3) {
      questionCollection.push([...cell]);
    }
    stageSeeker++;
  }
  return questionCollection;
};
const questionCollection = divideIntoThree(questions);

export { collection, cities, research, questionCollection };
