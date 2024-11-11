import { AnimatePresence, motion } from "framer-motion"
import { ArrowDownCircle, ArrowUpCircle, Car, CreditCard, Home, ShoppingCart, Utensils, X } from "lucide-react"
import { Title, AmountInfo, NewBudget } from "@/components/index"
import { useBudget } from "./store/useBadget";
import { Button } from "./components/ui/button";
import { ReactNode } from "react";

type IconsType = {
  [key: string]: ReactNode;
};

const icons:IconsType = {
  comida: <Utensils className="h-4 w-4" />,
  transporte: <Car className="h-4 w-4" />,
  compras: <ShoppingCart className="h-4 w-4" /> ,
  hogar: <Home className="h-4 w-4" />
}


export const App = () => {

  const {budgets,removeBudge,budget,earnings} = useBudget();
  const budgetV = budget();
  const earningV = earnings();
  const balance = earningV - budgetV;
  const renderIcon = (category:string)=>{
    return icons[category];
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Title />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-6 mb-8"
          >
            {/* AMOUNT INFO */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <AmountInfo
                text="Balance"
                amount={balance}
                color="text-purple-600"
              />
              <AmountInfo
                text="Ingresos"
                amount={earningV}
                color="text-green-500"
              />
              <AmountInfo
                text="Gastos"
                amount={budgetV}
                color="text-orange-500"
              />
            </div>

            <NewBudget />

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-purple-500" />
              Actividades Recientes
            </h2>
            <ul className="space-y-4">
              <AnimatePresence>
                {
                  budgets.map((budget, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      {/* RENDER  BUDGETS*/}
                      <div className="flex items-center">
                        {
                          renderIcon(budget.category)
                        }
                        <span className="ml-2 font-medium">{budget.description}</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <span className="text-purple-600 font-bold mr-2">$
                            {
                              (budget.type==='ingreso') ? budget.earning : budget.amount 
                            }
                          </span>
                          {budget.amount % 2 || budget.earning !== 0 ? (
                            <ArrowUpCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownCircle className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={()=>removeBudge(budget.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                    </motion.li>
                  ))
                }
              </AnimatePresence>
            </ul>
          </motion.div>
        </motion.div>
      </div>

    </>
  )
};
