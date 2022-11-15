import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { TailSpin } from "react-loader-spinner";

import { useStore } from "../stores/configureStores";
import SearchCommand from "../commands/SearchCommand";
import { useCommand, Invoker } from "../commands/Command";
import { LeanToken } from "../api/responses/ZoraResponse";

const Home = () => {
    const [address, setAddress] = useState<string>("");
    const {
        zoraStore: { tokens },
    } = useStore();
    const searchCommand = useCommand(() => new SearchCommand());

    return (
        <div className="relative flex flex-col w-full h-[100vh] mx-auto bg-slate-50">
            <Head>
                <title>ZORA</title>
                <meta
                    name="description"
                    content="ZORA API tokens gallery view"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="relative flex flex-col justify-center items-center mx-auto w-11/12 lg:w-10/12 max-w-[1440px] py-12">
                <main className="relative flex flex-col justify-center items-center mx-auto pb-12">
                    <div className="mx-auto space-between">
                        <h1 className="text-2xl md:text-3xl">
                            Zora ETH Tokens Viewer
                        </h1>
                        <form
                            className="flex my-10 w-full h-fit space-between items-center gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                Invoker(searchCommand, { address });
                            }}
                        >
                            <input
                                required
                                name="address"
                                value={address}
                                placeholder="jacob.eth"
                                onChange={(e) => setAddress(e.target.value)}
                                className="input px-4 p-2 md:px-6 md:p-4 w-[90%] rounded-sm text-base md:text-xl lg:text-2xl"
                            />
                            <button
                                type="submit"
                                disabled={
                                    !searchCommand.canExecute({ address })
                                }
                                className="flex grow justify-center bg-slate-300 rounded-sm px-4 p-2 md:px-5 md:p-3"
                            >
                                <span className="md:text-2xl lg:text-2xl">
                                    &#128269;
                                </span>
                            </button>
                        </form>

                        {searchCommand.pending && (
                            <TailSpin
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        )}

                        {searchCommand.error && (
                            <h1 className="text-3xl text-red-500">
                                {searchCommand.error}
                            </h1>
                        )}

                        {!!tokens?.length && (
                            <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-6 md:gap-3">
                                {tokens.map((token: LeanToken) => (
                                    <div
                                        key={token.tokenId}
                                        className="shadow-md bg-white rounded-md w-fit p-2 min-w-[200px] min-h-[100px]"
                                    >
                                        {token.image && (
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
                                        )}
                                        <div className="">
                                            <h1 className="leading-6">
                                                {token.name}
                                            </h1>
                                            <p className="text-sm leading-tight">
                                                {token?.description
                                                    ?.split(". ")
                                                    ?.at(1)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                <footer className="static bottom-0">
                    <a
                        href="https://api.zora.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by Zora API
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default observer(Home);
