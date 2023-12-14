import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";

const UncategorizedBudgetCard = () => {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max == 0) return null;

  return <BudgetCard amount={amount} grey max={max} name="Total" hideButtons />;
};

export default UncategorizedBudgetCard;
