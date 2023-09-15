
import { createContext, useContext } from "react";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * budget {
 * id , name , max
 * }
 * expense {
 * id, desc, amount, budget_id
 * }
 */
export const UN_CATEGORIZED_BUDGET_ID = 'un_categorized'
// 1- create context
const BudgetsContext = createContext({
  budgets:[],
  expenses:[],
  getBudgetExpenses:()=>{},
  getBudgetExpensesTotalAmount:()=>{},
  addExpense:()=>{},
  addBudget:()=>{},
  deleteItem:()=>{},
});


// 2- create context provider that wrapes the whole app
export const BudgetsProvider = ({children}) => 
{
  //for card color ///////////////////////////////////////////////////////
  

  //////////////////////////////////////////////////////////////////////////
  const [budgets , setBudgets] = useLocalStorage('budgets',[]);
  const [expenses, setExpenses] = useLocalStorage('expenses',[]);

  

  const getBudgetById = budgetId => budgets.find(budget => budget.id === budgetId)

  const getBudgetExpenses = budgetId => expenses.filter(expense => expense.budgetId === budgetId)
  
  const getBudgetExpensesTotalAmount = (budgetId) => 
  { 
    return getBudgetExpenses(budgetId).reduce((total,expense) => total+expense.amount ,0)
  }


  const addExpense = ({budgetId,amount,description}) => {
    setExpenses(prevExpenses => [...prevExpenses,{id:v4(),budgetId,amount,description}])}



  const addBudget = ({name,max}) => {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(prevBudget => prevBudget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets,{id:v4(),name,max}]
    })
  }

  const deleteItem = ({id,item_type}) => {
    if (item_type === "budget") {
      // TODO: Deal with expenses
      setBudgets(prevBudgets => {
        return prevBudgets.filter(prevBudget => prevBudget.id !== id)
      })
    }else if(item_type === "expense") {
      setExpenses(prevExpenses => {
        return prevExpenses.filter(prevExpense => prevExpense.id !== id)
      })
    }
  }


  const store = {
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteItem,
    getBudgetExpensesTotalAmount,
    getBudgetById
}

    return (<BudgetsContext.Provider value={store}>
             {children}
           </BudgetsContext.Provider>)
}

//3- create useContext
export const useBudgets = () => useContext(BudgetsContext);