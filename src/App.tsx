import { Suspense, lazy, useEffect} from "react";
import { Route,  BrowserRouter as Router, Navigate} from "react-router";
import AuthGuard from "./guards/auth.guard";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import {useDispatch } from "react-redux";
import { checkAuth } from "./redux/states/authSlice";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Private = lazy(() => import("./pages/Private/Private"));
const BoardPage = lazy(() => import("./pages/Private/Board/BoardPage"));

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // Ejecuta checkAuth al cargar la aplicación
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="App">

      <Suspense fallback={<div>Loading...</div>}>
        
          <Router>
            <RoutesWithNotFound>
              <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} replace />} />

              {/* Rutas públicas */}
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />

              <Route element={<AuthGuard privateValidation={true}/>}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
                <Route path="/b/:idBoard/:nameBoard" element={<BoardPage />} />
              </Route>
                
            </RoutesWithNotFound>
          </Router>
      </Suspense>
    </div>
  )
}
