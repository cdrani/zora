import { makePersistable } from "mobx-persist-store";
import { action, observable, makeObservable } from "mobx";

import ZoraService from "../services/ZoraService";
import { APIResponse } from "../api/handleResponse";
import { Data, Node, LeanToken } from "../api/responses/ZoraResponse";

const isBrowser = typeof window !== "undefined";

class ZoraStore {
    @observable data: Data | null = null;
    @observable lastAddress: string | null = null;

    @observable public tokens: LeanToken[] = [];

    constructor() {
        makeObservable(this);

        // store persistence to localStorage for cacheing & cache invalidation
        makePersistable(this, {
            name: "ZoraStore",
            expireIn: 3600000, // 1 hour (in ms)
            removeOnExpiration: true,
            properties: ["lastAddress", "tokens"],
            storage: isBrowser ? window.localStorage : undefined,
        });
    }

    get parsedStore(): any {
        const store = window.localStorage.getItem("ZoraStore");
        const parsedStore = JSON.parse(store as string);
        return parsedStore;
    }

    cacheInvalid(address: string): boolean {
        const {
            tokens,
            lastAddress,
            __mps__: { expireInTimestamp },
        } = this.parsedStore;

        if (!lastAddress || !tokens) return true;
        if (lastAddress !== address) return true;
        return Date.now() > expireInTimestamp;
    }

    @action retrieveFromCache(): void {
        Zora.tokens = this.parsedStore.tokens;
    }

    async fetchFreshData(address: string): Promise<APIResponse<Data>> {
        const response = await ZoraService.getAddressData(address);

        if (!response.status) {
            this.reset();
        } else {
            this.setLastAddress(address);
            this.setData(response?.payload);
            const transformedTokenData = this.cleanedAndFilteredTokens(
                response?.payload
            );
            this.setTokens(transformedTokenData);
        }
        return response;
    }

    public async getAddressData(
        address: string
    ): Promise<APIResponse<Data> | void> {
        if (!this.cacheInvalid(address)) {
            this.retrieveFromCache();
        }
        return await this.fetchFreshData(address);
    }

    // reset observables & mapped properties to localStorage
    @action reset(): void {
        this.setData(null);
        this.setTokens([]);
        this.setLastAddress(null);

        this.parsedStore.lastAddress = null;
        this.parsedStore.tokens = [];
    }

    cleanedAndFilteredTokens(data: Data | null): [] | LeanToken[] {
        if (!this.data) return [];

        return this?.data?.tokens?.nodes
            .map((node: Node) => ({
                tokenId: node.token.tokenId,
                ...node.token.metadata,
            }))
            .filter(
                (token) => !!token.image && !!token.description && !!token.name
            );
    }

    @action setTokens(tokens: LeanToken[] | []): void {
        this.tokens = tokens;
    }

    @action setData(data: Data | null): void {
        this.data = data;
    }

    @action setLastAddress(address: string | null): void {
        this.lastAddress = address;
    }
}

// export as singleton to use the same instance in useStore hook & commands
export const Zora = new ZoraStore();
