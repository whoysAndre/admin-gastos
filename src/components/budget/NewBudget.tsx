import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowDownCircle, ArrowUpCircle, Car, Home, Plus, ShoppingCart, Utensils } from "lucide-react"
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useBudget } from "@/store/useBadget";

// Actualizamos el tipo para incluir el tipo de transacción
type Inputs = {
  description: string;
  amount: number;
  category: string;
  type: string;
}
const defaultValues = {
  description: "",
  amount: 0,
  category: "",
  type: ""
};

const categories = [
  { name: "Comida", icon: <Utensils className="h-4 w-4" /> },
  { name: "Transporte", icon: <Car className="h-4 w-4" /> },
  { name: "Hogar", icon: <Home className="h-4 w-4" /> },
  { name: "Compras", icon: <ShoppingCart className="h-4 w-4" /> },
]

export const NewBudget = () => {
  
  const{addBudget} = useBudget();
  
  const {
    register,
    handleSubmit,
    reset,
    control, // Necesitamos control para usar Controller
  } = useForm<Inputs>({
    defaultValues
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {

    let earning = 0;
    if(data.type==='ingreso'){
      earning = data.amount;
      data.amount = 0;
    }
    
    
    addBudget(data.description,+data.amount,earning,data.category,data.type);
    reset();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4">
        <Input
          placeholder="Descripción"
          className="flex-grow"
          {...register("description", { required: true })}
        />
        <Input
          type="text"
          placeholder="Monto"
          className="w-1/3"
          {...register("amount", { required: true, valueAsNumber: true })}
        />
      </div>
      <div className="flex space-x-4">
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name.toLowerCase()}>
                    <div className="flex items-center">
                      {category.icon}
                      <span className="ml-2">{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ingreso">
                  <div className="flex items-center">
                    <ArrowUpCircle className="h-4 w-4 text-green-500 mr-2" />
                    Ingreso
                  </div>
                </SelectItem>
                <SelectItem value="gasto">
                  <div className="flex items-center">
                    <ArrowDownCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Gasto
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
        <Plus className="mr-2 h-4 w-4" /> Agregar Transacción
      </Button>
    </form>
  )
}