import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../lib/auth";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(isLogin){
            await auth.login(email,password);
        }
        else{
            await auth.register(email,password);
        }
        navigate('/');
    }

    const handleGuest = async () => {
        await auth.invited('invited@gmail.com','12345')
        navigate('/');
    }

    const changeLogin = () => {
        setIsLogin(!isLogin);
    }

    

    return (
        <div className="flex flex-col justify-center py-6 sm:py-12 min-h-screen px-4 sm:px-6 lg:px-8 bg-slate-3">
            <div className="bg-white mx-auto w-full max-w-md rounded-lg p-6 shadow-lg sm:p-8 ">
                
                <h2 className="text-center text-2xl font-bold sm:text-3xl text-gray-900">{isLogin ? 'Iniciar sesión' : 'Registrar usuario' }</h2>
                <div className="mt-8 sm:mx-auto  w-full sm:max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{isLogin ? 'Iniciar sesión' : 'Registrarse' }</button>
                        </div>
                    </form>
                </div>
                {isLogin ?
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">¿No tienes una cuenta? <button onClick={changeLogin} className="font-medium text-indigo-600 hover:text-indigo-500">Regístrate</button></p>
                    </div>
                    :
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">¿Ya tienes una cuenta? <button onClick={changeLogin} className="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesión</button></p>
                    </div>
                }

                <div className="mt-6 text-center">
                    <button onClick={handleGuest} className=" text-sm font-medium text-teal-600 hover:text-teal-500">Iniciar sesión como invitado</button>
                </div>
                
            </div>
            
        </div>
    );
}