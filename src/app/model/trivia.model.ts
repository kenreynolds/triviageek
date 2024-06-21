export interface CategoryItem {
  id: string;
  name: string;
}

export interface QuestionItem {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
