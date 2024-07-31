export interface AnswerData {
  correctAnswer: string;
  hasCorrectAnswer: boolean;
  hasWrongAnswer: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface QuestionItem {
  id: number;
  correctAnswer: string;
  answers: string[];
  question: string;
}
