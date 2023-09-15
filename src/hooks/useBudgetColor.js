import { useEffect, useState } from 'react'
import { useBudgets } from '../contexts/BudgetsContext'

export default function useBudgetColor(budget_id){
    
    const [cardState,setCardState] = useState("primary")
    const { getBudgetById,getBudgetExpensesTotalAmount } = useBudgets()
    useEffect(()=>{

        let total_amount = getBudgetExpensesTotalAmount(budget_id)
        let max = getBudgetById(budget_id).max 
        let ratio = total_amount / max ;

        if(ratio < 0.5)
        {
            setCardState("primary")
        }
        else if(ratio < 0.75)
        {
            setCardState("warning")
        }
        else
        {
            setCardState("danger")
        } 

    },[cardState,budget_id])

    return [cardState,setCardState]
}