import * as React from "react";
import { Zora as ZoraStore } from "./ZoraStore";

export type Stores = {
    zoraStore: typeof ZoraStore;
};

export default function storeSetup(): Stores {
    return { zoraStore: ZoraStore };
}

const stores: Stores = storeSetup();
export const StoreContext = React.createContext(stores);

export const useStore = () => React.useContext(StoreContext);
