import CardCategory from "./CardCategory";
import { categoryData } from "../../data/categoryData";



export default function SectionCategory(){

    return(
        <section className="flex flex-col gap-4 items-center justify-center text-slate-600 w-full ">
            {categoryData.map((category, index) => (
                <CardCategory 
                    key={index} 
                    title={category.title} 
                    free={category.free} 
                    standar={category.standar} 
                    premium={category.premium} 
                    enterprise={category.enterprise}
                />
            ))}
        </section>
    )
}