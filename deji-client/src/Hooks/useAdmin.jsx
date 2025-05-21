
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";

function useAdmin() {
  const { user, loading } =useContext(AuthContext); 
 

  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !loading && !!user?.email, 
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/admin/${user?.email}`);
      console.log(res.data);
      return res?.data?.admin;
    },
  });

  return [isAdmin,loading];
}

export default useAdmin;