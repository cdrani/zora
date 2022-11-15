import Head from "next/head";
import { observer } from "mobx-react-lite";

import { useStore } from "../stores/configureStores";
import SearchCommand from "../commands/SearchCommand";
import { useCommand, Invoker } from "../commands/Command";

import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import TokenList from "../components/TokenList";

const Home = () => {
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
                <main className="flex w-full flex-col justify-center items-center mx-auto pb-12">
                    <div className="w-full space-between">
                        <h1 className="text-2xl md:text-3xl text-center">
                            Zora ETH Tokens Viewer
                        </h1>
                        <SearchBar
                            handleSubmit={(address: string) => {
                                Invoker(searchCommand, { address });
                            }}
                        />

                        <Spinner loading={searchCommand.pending} />

                        {searchCommand.error && (
                            <h1 className="text-2xl md:text-3xl text-red-500">
                                {searchCommand.error}
                            </h1>
                        )}

                        <TokenList tokens={tokens} />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default observer(Home);
