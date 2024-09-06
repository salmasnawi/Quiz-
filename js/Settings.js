import {Quiz} from './Quiz.js'


export class Settings {
  constructor() {
    this.categoryElement = document.getElementById("category");
    this.difficultyElement = document.getElementsByName("difficulty");
    this.numOfQuestionsElement = document.getElementById("numOfQuestions");
    this.nextBtn = document.getElementById("startBtn");
    this.nextBtn.addEventListener("click", this.getData.bind(this));
  }

  async getData() {
    if (
      this.numOfQuestionsElement.value >= 0 &&
      this.numOfQuestionsElement.value !== ""
    ) {
      let categoryValue = this.categoryElement.value;
      let numberOfQuesValue = parseInt(this.numOfQuestionsElement.value, 10);
      let difficultyValue = [...this.difficultyElement].find(
        (elem) => elem.checked
      )
        ? [...this.difficultyElement].find((elem) => elem.checked).value
        : null;

      if (difficultyValue) {
        let myURL = `https://opentdb.com/api.php?amount=${numberOfQuesValue}&category=${categoryValue}&difficulty=${difficultyValue}`;
        let myResults = await this.getApi(myURL);
        console.log(myResults);
        $("#setting").fadeOut(500 , function(){
            $("#quiz").fadeIn(500);
            let myQuiz = new Quiz(myResults);
        })
      } else {
        $("#formAlert").fadeIn(1000);
      }
    } else {
      $("#formAlert").fadeIn(1000);
    }
  }

  async getApi(newUrl) {
    try {
      let myData = await fetch(newUrl);
      let myResponse = await myData.json();
      return myResponse.results;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}






































// import {Quiz} from './Quiz.js'

// export class Settings{

//     constructor(){
//         this.categoryElemnt = document.getElementById("category");
//         this.difficulty = document.getElementsByName("difficulty");
//         this.numberOfQues = document.getElementById("numOfQuestions");

//         this.nextBtn = document.getElementById("startBtn");
//         this.nextBtn.addEventListener("click", this.getData.bind(this) )

//     }

//     async getData(){

//         if( this.numberOfQues.value >= 0 && this.numberOfQues.value != ""  ){

//             // https://opentdb.com/api.php?amount=5&category=25&difficulty=easy

//             let categoryValue = this.categoryElemnt.value;
//             let numberOfQuesValue = this.numberOfQues.value;
//             let difficultyvalue = [...this.difficulty].filter( (elem) => { return elem.checked==true } )[0].value;

//             let myURL = `https://opentdb.com/api.php?amount=${numberOfQuesValue}&category=${categoryValue}&difficulty=${difficultyvalue}`;

//             let myResults = await this.getAPI(myURL);
//             console.log(myResults);

//             $("#setting").fadeOut(1000, function(){
//                 $("#quiz").fadeIn(1000);
//                 let myQuiz = new Quiz(myResults);
//             })

//         }
//         else{

//             $("#formAlert").fadeIn(1000);

//         }

//     }

//     async getAPI(newURL){

//         let myData = await fetch(newURL);
//         let myResponse = await myData.json();

//         return myResponse.results;

//     }

// }
