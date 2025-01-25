import { Suspense, lazy} from "react";
import { Route,  BrowserRouter as Router, Navigate} from "react-router";
import AuthGuard from "./guards/auth.guard";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import { Provider } from "react-redux";
import {store} from "./redux/store";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Private = lazy(() => import("./pages/Private/Private"));
const BoardPage = lazy(() => import("./pages/Private/Board/BoardPage"));

export default function App() {

  return (
    <div className="App">

      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
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
        </Provider>
      </Suspense>
    </div>
  )
}
