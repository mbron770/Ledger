export default function InvestmentSecuritiesDisplayTable({securities}) {


    return (
        <>


            <div className="overflow-y-auto flex-grow">


                <table className="w-full text-sm text-left font-thin font-goldman text-custom-purple">
                    <thead className="text-xs uppercase bg-custom-blue">
                        <tr>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Name</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Ticker</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Type</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Close Price</th>
                        </tr>
                    </thead>


                    <tbody> {}
                        {
                        securities ?. map((security) => (
                            <tr key={
                                    security.name
                                }
                                className="bg-custom-blue py-2 duration-300 hover:scale-105 hover:shadow-xl">
                                <th scope="row" className="px-3 py-2 font-thin font-goldman text-custom-purple">
                                    {
                                    `${
                                        security.name
                                    }`
                                } </th>
                                <td className="px-3 py-2 font-thin font-goldman text-blue-700">
                                    {
                                    `${
                                        security.ticker_symbol
                                    }`
                                }</td>
                                <td className="px-3 py-2 font-thin font-goldman text-custom-purple">
                                    {
                                    `${
                                        security.type
                                    }`
                                }</td>
                                <td className="px-3 py-2 font-thin font-goldman text-green-700">
                                    {
                                    `${
                                        security.close_price
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
