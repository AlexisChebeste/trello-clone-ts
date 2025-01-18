
interface CardBillingProps {
    children: React.ReactNode;
    className?: string;
}

export default function CardBilling({children,className}: CardBillingProps){
    return(
        <div className={`border border-gray-300  rounded-sm flex flex-col items-center gap-4 text-center text-slate-600 w-80  h-max ${className}`}>	
            
            {children}
        </div>
    )
}