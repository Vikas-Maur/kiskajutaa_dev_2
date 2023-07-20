import { createContext } from "react";

type Address = {
    fullname: string,
    address: string,
    city: string,
    state: string,
    pincode: string
}

export const AddressContext = createContext<{
    address: Address;
    setAddress: (address: Address) => void;
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