import ButtonWorkspace from "../ButtonWorkspace";
import CardSubscription from "./CardSubscription";


export default function SectionSubscription({isMensual}: {isMensual: boolean}){

    return(
        <div className="flex flex-col gap-4  w-full  items-center ">
            {/* <div className="hidden lg:flex lg:col-span-2 w-full h-full">
                <CardSubscription />
                <CardSubscription 
                    title="Gratuito" 
                    description="Para particulares y equipos que deseen aumentar su productividad." 
                    price={0.00} 
                    priceDescription={'Gratuito para siempre'}>
                </CardSubscription>
            </div> */}

            <CardSubscription 
                title="Standard" 
                description="Optimiza la productividad de tu equipo." 
                price={isMensual ? 6.00 :60.00} 
                isMensual={isMensual}
                priceDescription={isMensual ? 'por usuario al mes' : 'por usuario al año'}>
                <ButtonWorkspace >Actualizar ahora</ButtonWorkspace>
            </CardSubscription>
            <CardSubscription 
                title="Premium" 
                description="Para equipos y empresas que necesiten consultar su trabajo de diferentes formas mientras realizan el seguimiento de varios proyectos." 
                price={isMensual ? 12.50 :119.99} 
                isMensual={isMensual}
                priceDescription={isMensual ? 'por usuario al mes' : 'por usuario al año'}>
                <button className="flex items-center justify-center gap-3 py-2 px-3 rounded-md  font-semibold text-sm w bg-blue-700 text-white hover:bg-blue-800">Pruébalo gratis durante 14 días</button>
                <p className="text-sm">o <span className="text-blue-700 hover:underline cursor-pointer">actualizar ahora</span></p>
            </CardSubscription>
            <CardSubscription 
                title="Enterprise" 
                description="Para empresas que necesiten mejorar sus servicios de control, seguridad y asistencia." 
                priceDescription={"Los precios varían en función del número de licencias"}>
                <button className="flex items-center justify-center gap-3 py-2 px-3 rounded-md  font-semibold text-sm w bg-gray-200 text-slate-800 hover:bg-gray-300">Contactar con el equipo de ventas</button>
            </CardSubscription>
        </div>
    )
}