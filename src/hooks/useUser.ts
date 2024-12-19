import { useSelector } from "react-redux";
import { RootState } from "../store";

const useUser = () => {
  const authUser = useSelector((state: RootState) => state.auth);
  return {
    email: authUser.email,
    fullName: authUser.fullName,
    id: authUser.id,
  };
};

export default useUser;
