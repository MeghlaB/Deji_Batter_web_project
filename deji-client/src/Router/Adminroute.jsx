import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";
import useAdmin from "../Hooks/useAdmin";

function Adminroute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminPending] = useAdmin();

  if (loading || isAdminPending) {
    return (
      <div className="flex items-center justify-center mt-24">
        <span className=" loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/auth/login"}></Navigate>;
}

export default Adminroute;
