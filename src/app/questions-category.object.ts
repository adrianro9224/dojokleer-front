import {Question} from "./question.object";

export interface QuestionsCategory {
  questionCategoryId: number;
  categoryName: string;
  categoryDescription: string;
  questionEntities: Question[];
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  status: string;
}
