import { QuestionCategory } from './QuestionCategory';

export type AnswerGroup = {
    label: QuestionCategory;
    rating?: number;
    goingWell?: string;
    improve?: string;
    level10?: string;
};
