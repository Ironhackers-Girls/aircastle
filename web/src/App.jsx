import PageLayout from "./components/layouts/page-layout/page-layout";
import { Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from "./pages/index";
import RegisterPage from "./pages/register-page";



function App() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </PageLayout>
      
    </>
  )
};

export default App;
