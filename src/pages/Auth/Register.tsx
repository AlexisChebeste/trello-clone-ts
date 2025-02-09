import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { PublicRoutes } from "../../models/routes";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { register } from "../../redux/states/authSlice";

export default function Login(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {isLoading, error} = useSelector((state: RootState) => state.auth);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(register({name, lastname, email, password}));
        navigate(`/${PublicRoutes.LOGIN}`, {replace:true});
        
    }

    

    return (
        <div className="flex justify-center items-center h-screen    w-full bg-indigo-100">
            <div className="bg-white rounded-lg  py-12 px-6  max-w-xl w-full  shadow-lg  mx-5 ">
                
                <h2 className="text-center text-3xl font-bold text-gray-700">Registrar usuario</h2>
                <div className="mt-12   w-full ">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input 
                                type="name" 
                                id="name" 
                                name="name"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 " 
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellido</label>
                            <input 
                                type="lastname" 
                                id="lastname" 
                                name="lastname"
                                placeholder="Tu apellido"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 " 
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                placeholder="tu@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 " 
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Ingrese una contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {isLoading ? "Registrando..." : "Registrar"}
                            </button>
                        </div>
                        {error && <p>{error}</p>}
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">¿Ya tienes una cuenta? <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesión</Link></p>
                </div>

            </div>
            
        </div>
    );
}