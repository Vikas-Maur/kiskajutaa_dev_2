import { useContext } from "react";
import AddressContext from "./addressContext";

const useAddress = () => {
    const data = useContext(AddressContext);
    return data;
}

export default useAddress;