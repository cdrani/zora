import { observable, action, makeObservable } from "mobx";

import { Command } from "./Command";
import { Zora } from "../stores/ZoraStore";

export interface SearchParams {
    address: string;
}

export default class SearchCommand implements Command<SearchParams> {
    @observable public pending: boolean = false;
    @observable public error: string | null = null;

    constructor() {
        makeObservable(this);
    }

    @action setPending(pending: boolean) {
        this.pending = pending;
    }

    @action setError(error: string | null) {
        this.error = error;
    }

    @action public async execute(params: SearchParams): Promise<void> {
        if (Zora.cacheInvalid(params.address)) {
            this.setPending(true);
            const result = await Zora.getAddressData(params.address);
            this.setError(result?.message ?? null);
            this.setPending(false);
        } else {
            Zora.retrieveFromCache()
        }
    }

    @action public canExecute(params?: SearchParams): boolean {
        if (!params?.address) {
            return false;
        }
        return !this.pending;
    }
}
