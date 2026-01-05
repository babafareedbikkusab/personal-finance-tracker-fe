import api from "./axios";
import type {
    MonthlySummary,
    CategoryExpense,
    BudgetVsActual,
} from "../types/dashboard";

export const getMonthlySummary = async (
  year: number,
  month: number
): Promise<MonthlySummary> => {
  const res = await api.get("/dashboard/monthly-summary", {
    params: { year, month },
  });
  return res.data;
};

export const getCategoryExpense = async (
  year: number,
  month: number
): Promise<CategoryExpense[]> => {
  const res = await api.get("/dashboard/category-expense", {
    params: { year, month },
  });
  return res.data;
};

export const getBudgetVsActual = async (
  year: number,
  month: number
): Promise<BudgetVsActual[]> => {
  const res = await api.get("/dashboard/budget-vs-actual", {
    params: { year, month },
  });
  return res.data;
};
