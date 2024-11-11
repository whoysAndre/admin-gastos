

interface Props {

  text:string;
  amount: number;
  color: string;

}
export const AmountInfo = ({amount,text,color}:Props) => {
  return (
    <>
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-1">{text}</p>
        <p className={`text-2xl font-bold ${color}`}>${amount}</p>
      </div>
    </>
  )
}
