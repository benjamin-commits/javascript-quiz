console.log("QUESTION TIME!")

var questions = [
    {
        question: "Is cheese good?",
        answer: true
    },
    {
        question: "Are there 24 hours in a day?",
        answer: true,
    },

    {
        question: "Are there 50 states in the United States of America?",
        answer: true,                    
    },

    {
        question: "Is Rich Hosek the class instructor?",
        answer: true,
    },
]
var correctAnswers = 0;

for (i=0; i < questions.length; i++) {
    var answer = confirm(questions[i].question);
    if (answer == questions[i].answer) {
        alert("Correct!");
        correctAnswers++;
    } else {
        alert("Wrong!");
    }
}
