
import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTranslation } from "react-i18next";

/**
 * 
 * budget {
 * id , name , max
 * }
 * 
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
  getBudgetById:()=>{},
  addExpense:()=>{},
  addBudget:()=>{},
  deleteItem:()=>{},
  getTotalAmount:()=>{},
  getTotalMax:()=>{},
});


// 2- create context provider that wrapes the whole app
export const BudgetsProvider = ({children}) => 
{
  
  const [budgets , setBudgets] = useLocalStorage('budgets',[]);
  const [expenses, setExpenses] = useLocalStorage('expenses',[]);

  const [code,setCode] = useLocalStorage('code','en')
  const { t, i18n } = useTranslation();

  const getBudgetById = budgetId => budgets.find(budget => budget.id === budgetId)

  const getBudgetExpenses = budgetId => {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }
  
  const getBudgetExpensesTotalAmount = (budgetId) => 
  { 
    return getBudgetExpenses(budgetId).reduce((total,expense) => total+expense.amount ,0)
  }


  const addExpense = ({budgetId,amount,description}) => {
    setExpenses(prevExpenses => [...prevExpenses,{id:v4(),budgetId,amount,description}])
  }



  const addBudget = ({name,max}) => {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(prevBudget => prevBudget.name === name)) {
        return prevBudgets;
      }
      //initializing unCategorized Budget
      if(!max){
        return [...prevBudgets,{id:UN_CATEGORIZED_BUDGET_ID,name,max}]
      }
      return [...prevBudgets,{id:v4(),name,max}]
    })
  }

  const deleteItem = ({id,item_type}) => {
    if (item_type === "budget") {
      
      setExpenses(prevExpenses => {
        return prevExpenses.map(expense => {
          if (expense.budgetId !== id) {
            return expense
          }else{
            return {...expense,budgetId:UN_CATEGORIZED_BUDGET_ID}
          }
        })
      })

      setBudgets(prevBudgets => {
        return prevBudgets.filter(prevBudget => prevBudget.id !== id)
      })
    }
    
    else if(item_type === "expense") {
      
      setExpenses(prevExpenses => {
        return prevExpenses.filter(prevExpense => prevExpense.id !== id)
      })
    }
  }

  const getTotalAmount = () => expenses.reduce((total,expense)=>total+expense.amount,0)
  const getTotalMax = () => budgets.reduce((total,budget)=>total+budget.max,0)

  useEffect(()=>{i18n.changeLanguage(code)},[code,setCode])

  const store = {
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteItem,
    getBudgetExpensesTotalAmount,
    getBudgetById,
    getTotalAmount,
    getTotalMax,
    code,
    setCode,
    t,
    i18n
}

    return (<BudgetsContext.Provider value={store}>
             {children}
           </BudgetsContext.Provider>)
}

//3- create useContext
export const useBudgets = () => useContext(BudgetsContext);