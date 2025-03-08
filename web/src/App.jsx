import PageLayout from "./components/layouts/page-layout/page-layout";
import { Route, Routes } from "react-router-dom";
import { CastleDetail, HomePage, LoginPage, MyProfile } from "./pages/index";
import RegisterPage from "./pages/register-page";
import Footer from "./components/ui/footer/footer";
import NavBar from "./components/ui/navbar/navbar";
import { PrivateRoute } from "./guards";

function App() {
  return (
    <>
      <PageLayout>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/castles/:id" element={<CastleDetail />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </PageLayout>
    </>
  );
}

export default App;
