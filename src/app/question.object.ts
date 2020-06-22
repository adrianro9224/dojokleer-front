import {QuestionAnswer} from "./question-answer.object";

export interface Question {
  questionId: number;
  question: string;
  questionCategoryId: number;
  answerEntities: QuestionAnswer[]
}
