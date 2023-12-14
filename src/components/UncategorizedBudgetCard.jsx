import BudgetCard from "./BudgetCard";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount == 0) return null;

  return <BudgetCard amount={amount} grey name="Uncategorized" {...props} />;
};

export default UncategorizedBudgetCard;
