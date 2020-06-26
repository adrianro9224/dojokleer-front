import {QuestionAnswer} from "./question-answer.object";
import {RegisterStatus} from "./register-status.enum";

export interface Question {
  questionId: number;
  question: string;
  questionCategoryId: number;
  answerEntities: QuestionAnswer[];
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  status: string;
}
