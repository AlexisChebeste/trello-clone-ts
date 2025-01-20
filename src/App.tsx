import { Suspense, lazy} from "react";
import { Route,  BrowserRouter as Router, Navigate} from "react-router";
import Register from "./pages/Auth/Register";
import Home from "./pages/Workspace/Home";
import BoardPage from "./pages/Board/BoardPage";
import WorkspacePage from "./pages/Workspace/WorkspacePage";
import MembersPage from "./pages/Workspace/MembersPage/MembersPage";
import AccountPage from "./pages/Workspace/AccountPage";
import Layout from "./pages/Layout";
import LayoutAside from "./components/LayoutAside";
import InvitedWorkspace from "./pages/Workspace/MembersPage/InvitedWorkspace";
import SolicitedWorkspace from "./pages/Workspace/MembersPage/SolicitedWorkspace";
import MembersWorkspace from "./pages/Workspace/MembersPage/MembersWorkspace";
import BillingPage from "./pages/Workspace/BillingPage";
import AuthGuard from "./guards/auth.guard";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import { Provider } from "react-redux";
import store from "./redux/store";

const Login = lazy(() => import("./pages/Auth/Login"));
const Private = lazy(() => import("./pages/Private/Private"));

export default function App() {

  return (
    <div className="App">

      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <Router>
            <RoutesWithNotFound>
              <Route path="/" element={<Navigate to={PublicRoutes.LOGIN} replace />} />

              {/* Rutas públicas */}
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />

              <Route element={<AuthGuard privateValidation={true}/>}>
                <Route path={`${PrivateRoutes.HOME}/*`} element={<Private/>} />

                <Route element={<Layout />}>
                  {/* Rutas del workspace */}
                  <Route path="/w/:idWorkspace/home" element={<Home />}/>

                  <Route path="/w/:idWorkspace" element={<LayoutAside />} >
                    <Route index element={<WorkspacePage />}/>
                    <Route path="members" element={<MembersPage />}>
                      <Route index element={<MembersWorkspace />}/>
                      <Route path="guests" element={<InvitedWorkspace />}/>
                      <Route path="request" element={< SolicitedWorkspace/>}/>
                    </Route>
                    <Route path="account" element={<AccountPage />}/>
                    <Route path="belling" element={<BillingPage />}/>
                  </Route>
                  {/* Rutas para ver un board especifico */}
                  <Route path="b/:idBoard/:nameBoard" element={<BoardPage />} />
                </Route>


              </Route>
                
            </RoutesWithNotFound>
          </Router>
        </Provider>
      </Suspense>
    </div>
  )
}
