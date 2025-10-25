import ClerkProviderWithRoutes from './auth/ClerkProviderWithRoutes.jsx'
import {Routes, Route} from "react-router-dom";
import './App.css'
import Layout from './components/layout/Layout.jsx'
import ChallengeGenerator from './components/challenge/ChallengeGenerator.jsx'
import HistoryPanel from "./components/history/HistoryPanel.jsx";
import AuthenticationPage from "./auth/AuthenticationPage.jsx";
function App() {

  return (
    <ClerkProviderWithRoutes>
        <Routes>
            <Route path="/sign-in/*" element={<AuthenticationPage />} />
            <Route path="/sign-up" element={<AuthenticationPage />} />
            <Route element={<Layout />}>
                <Route path="/" element={<ChallengeGenerator />} />
                <Route path="/history" element={<HistoryPanel />} />
            </Route>
        </Routes>
    </ClerkProviderWithRoutes>
  )
}

export default App
