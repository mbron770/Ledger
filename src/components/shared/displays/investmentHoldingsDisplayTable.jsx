
export default function InvestmentHoldingsDisplayTable({holdings}) {
  

    return (
        <>


            <div className="overflow-y-auto flex-grow">
               

            <table className="w-full text-sm text-left font-thin font-goldman text-custom-purple">
                <thead className="text-xs uppercase bg-custom-blue">
                    <tr>
                        <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Cost Basis</th>
                        <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Institution Price</th>
                        <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Institution Value</th>
                        <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Quantity</th>
                    </tr>
                </thead>
                <tbody> {
                    holdings ?. map((holding) => (
                        <tr key={
                                holding.cost_basis
                            }
                            className="bg-custom-blue py-2 duration-300 hover:scale-105 hover:shadow-xl">
                            <th scope="row" className="px-3 py-2 font-thin font-goldman text-blue-700">
                                {
                                `${
                                    holding.cost_basis
                                }`
                            } </th>
                            <td className="px-3 py-2 font-thin font-goldman text-green-700">
                                {
                                `$${
                                    holding.institution_price
                                }`
                            }</td>
                            <td className="px-3 py-2 font-thin font-goldman text-custom-purple">
                                {
                                `${
                                    holding.institution_value
                                }`
                            }</td>
                            <td className="px-3 py-2 font-thin font-goldman text-custom-purple">
                                {
                                `${
                                    holding.quantity
                                }`
                            }</td>
                        </tr>
                    ))
                } </tbody>
            </table>

        </div>
    </>
    );
}
