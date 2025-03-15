import { useEffect, useState } from "react";
import * as AirCastleApi from "../../../services/aircastle-service";
import CastlePageItem from "../castle-page-item/castle-page-item";
import { useAuthContext } from "../../../contexts/auth-context";
import { Snackbar, Alert } from "@mui/material";
import Lottie from "react-lottie";
import animationEmpty from "../../../assets/empty-castles-animation.json";

function CastlePageList() {
  const [castles, setCastles] = useState([]);
  const { user } = useAuthContext();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationEmpty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    AirCastleApi.listCastles(user.id)
      .then((castles) => {
        setCastles(castles);
      })
      .catch((error) => console.error(error));
  }, [user]);

  const handleDelete = (id) => {
    AirCastleApi.deleteCastle(id)
      .then(() => {
        setCastles((prevCastles) =>
          prevCastles.filter((castle) => castle.id !== id)
        );
        setSnackbarMessage("Castle deleted");
        setSnackbarSeverity("info");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarMessage("Error deleting castle");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        console.error(error);
      });
  };

  return (
    <div className="flex items-center">
      {castles.length === 0 && (
        <div className="flex flex-col w-full justify-center items-center mb-5">
          <Lottie options={lottieOptions} height={400} width={400} />
          <p className="text-center text-[var(--dark-gray)]">No castles found.</p>
        </div>
      )}

      {castles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {castles.map((castle) => (
            <CastlePageItem
              key={castle.id}
              castle={castle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
        sx={{ top: "80px" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CastlePageList;
