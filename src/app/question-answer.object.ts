import {RegisterStatus} from "./register-status.enum";

export interface QuestionAnswer {
  questionAnswerId: number;
  questionId: number;
  answer: string;
  brings: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  status: string;
}
