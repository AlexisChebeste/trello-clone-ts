import { Check } from "lucide-react"
import { categoryData } from "../../data/categoryData"
import HeadSubscription from "./HeadSubscription"

const subcriptionData = [
    {
        title: 'Gratuito',
        description: 'Para particulares y equipos que deseen aumentar su productividad.',
        price: '0,00 ',
        priceMonth: '0,00 ',
        priceText: 'Gratuito para siempre'
    },
    {
        title: 'Standard',
        description: 'Optimiza la productividad de tu equipo.',
        priceMonth: '6,00 ',
        price: '60,00 ',
        buttonText: 'Actualizar ahora',
        classNameButton: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
    },
    {
        title: 'Premium',
        description: 'Para equipos y empresas que necesiten consultar su trabajo de diferentes formas mientras realizan el seguimiento de varios proyectos.',
        price: '119,99',
        priceMonth: '12,50 ',
        buttonText: 'Pruébalo gratis durante 14 días',
        classNameButton: 'bg-blue-700 hover:bg-blue-800 text-white'
    },
    {
        title: 'Enterprise',
        description: 'Para empresas que necesiten mejorar sus servicios de control, seguridad y asistencia.',
        priceText: 'Los precios varían en función del número de licencias',
        buttonText: 'Contactar con el equipo de ventas',
        classNameButton: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
    }
]


export default function TableSub({isMensual}: {isMensual: boolean}){
    return(
        <table className="w-full text-center border-collapse table table-fixed">
            <thead >
                <tr >
                    <th ></th>
                    {subcriptionData.map((subcription, index) => (
                        <HeadSubscription 
                            key={index} 
                            title={subcription.title} 
                            description={subcription.description} 
                            price={subcription.price} 
                            priceMonth={subcription.priceMonth}
                            priceText={subcription.priceText}
                            isMensual={isMensual} 
                            buttonText={subcription.buttonText}
                            classNameButton={subcription.classNameButton}
                        />
                    ))

                    }
                </tr>
            </thead>
            <tbody>
                {categoryData.map((category, index) => (
                    <tr key={index}>
                        <td>{category.title}</td>
                        <td>
                            {category.free === 'check' ? (
                                <span className="flex justify-center items-center">
                                    <Check className="size-5 text-green-600"/>
                                </span>
                            ) : category.free }</td>
                        <td>
                            {category.standar === 'check' ? (
                                <span className="flex justify-center items-center">
                                    <Check className="size-5 text-green-600"/>
                                </span>
                                
                            ) : category.standar }
                        </td>
                        <td>
                            {category.premium === 'check' ? (
                                <span className="flex justify-center items-center">
                                    <Check className="size-5 text-green-600"/>
                                </span>
                            ) : category.premium }
                        </td>
                        <td>
                            {category.enterprise === 'check' ? (
                                <span className="flex justify-center items-center">
                                    <Check className="size-5 text-green-600"/>
                                </span>
                            ) : category.enterprise }
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    )
}