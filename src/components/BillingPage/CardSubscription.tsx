import CardBilling from "./CardBelling";

interface CardBillingProps {
    title?: string;
    description?: string;
    price?: number;
    priceDescription?: string;
    children?: React.ReactNode;
    isMensual?: boolean;
}

export default function CardSubscription({title, description, price, priceDescription, children, isMensual}: CardBillingProps){
    return(
        <CardBilling>
            <h2 className="font-semibold text-slate-800 text-2xl mt-5">{title}</h2>
            <p className="text-xs">{description}</p>
            
            <div className="flex lg:flex-col items-center gap-2">
                {price !== null && price !== undefined && (<p className="font-semibold text-2xl text-slate-800">{price.toFixed(2)} USD</p>)}
                <p className="text-xs ">{priceDescription}</p>
            </div>
            
            {price && children}

            <div className="w-full bg-gray-100 py-2 px-3  flex items-center justify-center h-20 border-t border-t-gray-300">
                {price ? (
                    isMensual ? (
                        <p className="text-sm text-center">
                            Por 1 miembro en prueba, pagarías un total de <span className="text-slate-800 font-bold">{price.toFixed(2)} USD</span> al mes, lo que son <span className="text-slate-800 font-bold">{(price * 12).toFixed(2)} USD</span> al año.
                        </p>
                    ) : (
                        <p className="text-sm text-center">
                            Por 1 miembro en prueba, serían <span className="text-slate-800 font-bold">{price.toFixed(2)} USD</span> al año.
                        </p>
                    )
                ) : (
                    children
                )}
                
            </div>
        </CardBilling>
    )
}