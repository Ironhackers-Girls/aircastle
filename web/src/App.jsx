import PageLayout from "./components/layouts/page-layout/page-layout";
import { Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from "./pages/index";



function App() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </PageLayout>
      
    </>
  )
}

export default App
