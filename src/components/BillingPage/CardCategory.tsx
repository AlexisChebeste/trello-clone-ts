import { Check } from "lucide-react";

interface CardCategoryProps {
    title: string;
    free: string;
    standar: string;
    premium: string;
    enterprise: string;
}

export default function CardCategory({title, free, standar, premium, enterprise}: CardCategoryProps){


    return(
        <div className="border-2 border-gray-300   rounded-sm flex flex-col   text-slate-800 w-80  h-full  text-sm">
            <h3 className="font-bold  text-slate-800 px-4 border-b-2 border-gray-300 py-3">
                {title}
            </h3>
            <div className="flex items-center justify-between py-3 px-4 border-b-2 border-gray-300">
                <span >Gratuito</span>
                <span className="w-2/3 flex items-end justify-end">{free === 'check' ? (<Check className="size-5 text-green-600"/>) : free}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-gray-300">
                <span >Standar</span>
                <span className="w-2/3 flex items-end justify-end">{standar === 'check' ? (<Check className="size-5 text-green-600 "/>) : standar}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-gray-300">
                <span >Premium</span>
                <span className="w-2/3 flex items-end justify-end">{premium === 'check' ? (<Check className="size-5 text-green-600"/>) : premium}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 ">
                <span >Enterprise</span>
                <span className="w-2/3 flex items-end justify-end">{enterprise === 'check' ? (<Check className="size-5 text-green-600"/>) : enterprise}</span>
            </div>
        </div>
    )
}