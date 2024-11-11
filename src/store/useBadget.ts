import { create } from 'zustand'

interface Buget{
  id:string;
  description:string;
  amount:number;
  earning: number;
  category:string;
  type: string;
}

interface BudgetState{
  budgets: Buget[];
  addBudget: (description: string, amount:number,earning:number,category: string, type:string) => void;
  removeBudge: (id:string)=>void;
  budget: ()=>number;
  earnings: ()=> number;
}

export const useBudget = create<BudgetState>((set,get) => ({
  budgets:[],
  addBudget: (description: string, amount:number, earning:number,category: string, type:string)=>set((state)=>({
    budgets: [...state.budgets,{
      id: crypto.randomUUID(),
      description,
      amount,
      earning,
      category,
      type
    }]
  })),
  removeBudge: (id:string)=>set(state=>({
    budgets: state.budgets.filter(budget=>budget.id!==id) 
  })),
  budget: ()=>{
    const state = get();
    return state.budgets.reduce((total,budget)=> total + budget.amount ,0)
  },
  earnings: ()=>{
    const state = get();
    return state.budgets.reduce((total,ear)=> total + ear.earning ,0)
  }

}))