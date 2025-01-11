import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../../lib/auth";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await auth.register(email,password);
        navigate('/w/1/home');
    }

    const handleGuest = async () => {
        await auth.invited('invited@gmail.com','12345')
        navigate('/w/1/home');
    }

    

    return (
        <div className="flex justify-center items-center h-screen    w-full bg-indigo-100">
            <div className="bg-white rounded-lg  py-12 px-6  max-w-xl w-full  shadow-lg  mx-5 ">
                
                <h2 className="text-center text-3xl font-bold text-gray-700">Registrar usuario</h2>
                <div className="mt-12   w-full ">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Registar usuario</button>
                        </div>
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">¿Ya tienes una cuenta? <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesión</Link></p>
                </div>

                <div className="mt-6 text-center">
                    <button onClick={handleGuest} className=" text-sm font-medium text-teal-600 hover:text-teal-500">Iniciar sesión como invitado</button>
                </div>
                
            </div>
            
        </div>
    );
}