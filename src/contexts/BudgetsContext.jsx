import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../Hooks/useLocalStorage";

const BudgetsContext = createContext();

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addBudget = ({ name, max }) => {
    setBudgets((previousBudgets) => {
      if (previousBudgets.find((budget) => budget.name === name)) {
        return previousBudgets;
      }

      return [...previousBudgets, { id: uuidv4(), name, max }];
    });
  };

  const addExpense = ({ budgetId, amount, description }) => {
    setExpenses((previousExpenses) => {
      return [
        ...previousExpenses,
        { id: uuidv4(), budgetId, amount, description },
      ];
    });
  };

  const deleteBudget = ({ id }) => {
    setExpenses((previousExpenses) => {
      return previousExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((previousBudgets) => {
      return previousBudgets.filter((budget) => budget.id !== id);
    });
  };

  const deleteExpense = ({ id }) => {
    setExpenses((previousExpenses) => {
      return previousExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
