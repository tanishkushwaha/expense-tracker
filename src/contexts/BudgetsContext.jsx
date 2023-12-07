import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BudgetsContext = createContext();

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

/*
  Budget:
    id:
    name:
    max:
  
  Expense:
    id:
    budgetId:
    amount:
    description
*/

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const getBudgetExpenses = (budgetId) => {
    
  };

  const addBudget = (name, max) => {
    setBudgets(previousBudgets => {
      if(previousBudgets.find(budget => budget.name === name)) {
        return previousBudgets;
      }

      return [...previousBudgets, {id: uuidv4, name, max}]
    });
  };

  const addExpense = (budgetId, amount, description) => {
    setExpenses(previousExpenses => {
      return [...previousExpenses, {id: uuidv4, budgetId, amount, description}];
    });
  };

  const deleteBudget = ({ id }) => {
    // TODO: Deal with uncategorized expenses
    setBudgets(previousBudgets => {
      return previousBudgets.filter(budget => budget.id !== id);
    });
  };

  const deleteExpense = ({ id }) => {
    setExpenses(previousExpenses => {
      return previousExpenses.filter(expense => expenses.id !== id);
    });
  };


  return (
    <BudgetsContext.Provider value={{
      budgets,
      expenses,
      getBudgetExpenses,
      addBudget,
      addExpense,
      deleteBudget,
      deleteExpense
    }}>
      {children}
    </BudgetsContext.Provider>
  );
};

