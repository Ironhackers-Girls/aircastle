import PageLayout from "./components/layouts/page-layout/page-layout";

import { Route, Routes } from "react-router-dom";
import {
  CastleDetail,
  HomePage,
  LoginPage,
  MyProfile,
  BookingsPage,
  CastlesPage,
  CastleUpdatePage,
} from "./pages/index";
import RegisterPage from "./pages/register-page";
import Footer from "./components/ui/footer/footer";
import NavBar from "./components/ui/navbar/navbar";
import PrivateRoute from "./guards/private-route";

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
            path="/castles/:id/update"
            element={
              <PrivateRoute role="host">
                <CastleUpdatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute role="guest">
                <BookingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/castles"
            element={
              <PrivateRoute role="host">
                <CastlesPage />
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
