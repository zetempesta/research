export const divideIntoThree = (questions) => {
  let questionCollection = [];
  let cell = [];
  let stageSeeker = 1;
  for (let i = 0; i < questions.length; i++) {
    if (stageSeeker === 3) {
      stageSeeker = 1;
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
