import { createContext } from "react";
import { Address } from "@/utils/types";

export const AddressContext = createContext<{
    address: Address;
    setAddress: (address: any) => void;
}>({
    address: {
        fullname: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    },
    setAddress: () => { },
});

export const AddressProvider = AddressContext.Provider;

export default AddressContext;