import Image from "next/image";

import { LeanToken } from "../api/responses/ZoraResponse";

interface Props {
    tokens: LeanToken[];
}
const TokenList = ({ tokens }: Props) => {
    if (!tokens?.length) return null;

    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-6 md:gap-3">
            {tokens.map((token: LeanToken) => (
                <div
                    key={token.tokenId}
                    className="shadow-md bg-white rounded-md w-fit p-2 min-w-[200px] min-h-[100px]"
                >
                    <Image
                        priority
                        src={token.image}
                        width={75}
                        height={75}
                        className="rounded-full float-left mr-4"
                        alt={`${token.name} Token Image`}
                        style={{
                            shapeOutside: "circle()",
                        }}
                    />
                    <div className="">
                        <h1 className="leading-6">{token.name}</h1>
                        <p className="text-sm leading-tight">
                            {token?.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TokenList;
