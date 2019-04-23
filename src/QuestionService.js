class QuestionService {

}

QuestionService.fetch = function(url, state) {

  return fetch(url)
    .then((response) => {
      console.log('tenemos resultados')
      return response.json();
    })
    .then((json) => {
      console.log('hemos conseguido resultados de response.json()')
      console.log(json);

      const clues = json.clues;
      const count = clues.length; // 130
      const randomQuestions = [];
      let i = 0;
      while(i++ < 5) {
        let random = Math.floor(Math.random() * clues.length);
        randomQuestions.push(clues[random]);
        clues.splice(random, 1); // <-- le quitamos preguntas al resultado cada vez que elegimos una
      }
      const questionData = randomQuestions[0];
      const question = questionData.question; //pregunta aleatoria
      const pattern = /<[^>]*>/g;
      const answers = [
        randomQuestions[1].answer.replace(pattern, ''),
        randomQuestions[2].answer.replace(pattern, ''),
        randomQuestions[3].answer.replace(pattern, ''),
        randomQuestions[4].answer.replace(pattern, ''),
      ];
      const correct = Math.floor(Math.random() * 4);
      answers.splice(correct, 1, questionData.answer)
      const newState = { correct, answers, chosen: undefined, question, questionData };
      console.log(newState);
      return newState;

    })
    .catch((err) => {
      // OH NO HA FUNCIONADO!!
    });
}


module.exports = QuestionService;