export interface MonthlySummary {
  totalIncome: number;
  totalExpense: number;
  net: number;
}


export interface BudgetVsActual {
  category: string;
  budget: number;
  actual: number;
}


export interface CategoryExpense {
  category: string;
  amount: number;
}