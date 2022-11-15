export interface Data {
    tokens: {
        nodes: Node[]
    }
}

export interface Node {
    token: Token
};

export interface Token  {
    tokenId: string;
    metadata: MetaData;
}

export interface MetaData {
    name: string;
    image: string;
    description: string;
};

export interface LeanToken extends MetaData {
    tokenId: string
}
