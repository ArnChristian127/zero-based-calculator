export default function Criteria() {
    const list_1 = [
        {label: "97.50 - 100% (1.00) Excellent"},
        {label: "94.50 - 97.49% (1.25) Very Good"},
        {label: "91.50 - 94.49% (1.50) Very Good"},
        {label: "88.50 - 91.49% (1.75) Very Good"}
    ]
    const list_2 = [
        {label: "85.50 - 88.49% (2.00) Satisfactory"},
        {label: "81.50 - 85.49% (2.25) Satisfactory"},
        {label: "77.50 - 81.49% (2.50) Satisfactory"},
        {label: "73.50 - 77.49% (2.75) Fair"}
    ]
    const list_3 = [
        {label: "69.50 - 73.49% (3.00) Fair"},
        {label: "69.49 % and below (5.00) Failed"}
    ]
    return (
        <div className="bg-white shadow-lg p-4 md:p-6 lg:p-8 mt-8 rounded-lg text-gray-700">
            <h1 className="font-bold text-xl md:text-2xl mb-4">Grading System:</h1>
            <div className="flex flex-wrap gap-10">
                <ul className="flex flex-col gap-3">
                    {list_1.map((items, index) => (
                        <li key={index}><p>★ {items.label}</p></li>
                    ))}
                </ul>
                <ul className="flex flex-col gap-3">
                    {list_2.map((items, index) => (
                        <li key={index}><p>★ {items.label}</p></li>
                    ))}
                </ul>
                <ul className="flex flex-col gap-3">
                    {list_3.map((items, index) => (
                        <li key={index}><p>★ {items.label}</p></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}