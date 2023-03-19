export class QuestionModel {
  public id: string;
  public img: string;
  public answers: string[];
  public correctAnswer: string;
  public question: string;

  constructor(
    id: string,
    img: string,
    answers: string[],
    correctAnswer: string,
    question: string
  ) {
    this.id = id;
    this.img = img;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.question = question;
  }
}
