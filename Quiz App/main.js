// Setting up Variable
let countSpan = document.querySelector(".count span");
let bulletSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let countDownSpan = document.querySelector(".countdown")
// Settting options
let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;
function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let questionsLength = questionsObject.length;

      // Create Bullet Function
      createBullets(questionsLength);

      // addQuestions function
      addQuestions(questionsObject[currentIndex], questionsLength);
      //
  
      // countDown() function
      countDowntime(10, questionsLength)

    
      // Empty result
      resultsContainer.innerHTML = "";


      // Submit Button handel
      submitBtn.onclick = () => {
        let rightAnswer = questionsObject[currentIndex].right_answer;

        // Increase currentIndex (Get next the question)
        currentIndex++;


        // Check answer
        checkAnswer(rightAnswer, questionsLength);

        // Empty the old questions and answers area
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // get the next question
        addQuestions(questionsObject[currentIndex], questionsLength);

        // Handle span Bullet
        handelBullets();
        // Start count down
        clearInterval(countDownInterval);
        countDowntime(10, questionsLength);
        // Show result function
        showResults(questionsLength);
      };

    }
  };

  myRequest.open("GET", "html_ques.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Active the first element
    if (i === 0) {
      theBullet.classList = "on";
    }

    // Append Bullets to BulletSpanContainer
    bulletSpanContainer.appendChild(theBullet);
  }
}

function addQuestions(obj, count) {
  if (currentIndex < count) {
    // Create QuestionTitle
    let questionTitle = document.createElement("h2");

    // Create Text for QuestionTitle
    let questionText = document.createTextNode(obj.title);

    // Append the text to the questionTitle
    questionTitle.appendChild(questionText);

    // Append questionTitle to quiz area
    quizArea.appendChild(questionTitle);

    // Create Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Div
      let mainDiv = document.createElement("div");

      // Add class To mainDiv
      mainDiv.className = "answer";

      // Create radio input
      let radioInput = document.createElement("input");

      // Add type + id + name + Data-Attr
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make the first one checked
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create the label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add text to label
      theLabel.appendChild(theLabelText);

      // Append the label and the radio to the mainDiv
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append mainDiv to the answerArea
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let choosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      choosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === choosenAnswer) {
    rightAnswers++;
  }
}

function handelBullets() {
  let BulletsSpan = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(BulletsSpan);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.classList = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitBtn.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}


function countDowntime(durtaion, count) {
  if (currentIndex < count) {
    let min, secs;
    countDownInterval = setInterval(function () {
      min = parseInt(durtaion / 60);
      secs = parseInt (durtaion % 60)


      min = min < 10 ? `0${min}` : min;
      secs = secs < 10 ? `0${secs}` : secs;

      countDownSpan.innerHTML = `${min}:${secs}`

      if (--durtaion < 0) {
        clearInterval(countDownInterval)
        submitBtn.onclick();
      }
    }, 1000)
  }
}