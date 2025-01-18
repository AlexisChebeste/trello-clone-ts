interface HeadSubscriptionProps {
    isMensual: boolean
    title: string
    description: string
    price?: string
    priceMonth?: string
    priceText?: string
    buttonText?: string
    classNameButton?: string
}

export default function HeadSubscription({isMensual, title, description, price,priceMonth, priceText, buttonText, classNameButton}: HeadSubscriptionProps){
    return(
        <th className="h-24">
            <div className="flex flex-col gap-2 h-full w-full py-8">
                <h2 className="font-semibold text-slate-800 text-2xl ">{title}</h2>
                <p className="text-xs font-normal text-slate-900">{description}</p>
                <div className="flex lg:flex-col items-center gap-2">
                    {price &&
                        <p className="font-semibold text-2xl text-slate-800">{isMensual ? priceMonth : price}USD </p>
                    }
                    
                    {
                        priceText ? <p className="text-xs font-normal">{priceText}</p> : <p className="text-xs font-normal">{isMensual? 'por usuario al mes': 'por usuario al año'}</p>
                    }
                    
                </div>
                <button className={`flex items-center justify-center gap-3 py-2 px-3 rounded-md  font-semibold text-sm ${classNameButton}`}>
                    {buttonText}
                </button>
            </div> 
        </th>
    )
}