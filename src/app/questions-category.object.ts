import {Question} from "./question.object";

export interface QuestionsCategory {
  questionCategoryId: number;
  categoryName: string;
  categoryDescription: string;
  questionEntities: Question[]
}
