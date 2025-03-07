import { useAuthContext } from "../../contexts/auth-context"
import {useState, useEffect} from "react"

function MyProfile() {
   const { user } = useAuthContext()
   const [profile, setProfile] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

  useEffect() => {
    myProfile() 
    .then(data => {
        setProfile(data);
        setLoading(false)
    })
  }



  return (
    <>
      <div className="max-w-4xl mx-auto mt-5">
        <h2 className="text-2xl font-semibold mb-4">Perfil de Usuario</h2>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              {user.username}
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              disabled
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              {user.username}
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              {user.phone}
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white py-3 rounded-lg font-semibold">
            Actualizar Perfil
          </button>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
