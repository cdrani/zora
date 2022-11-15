import { useState } from "react";

interface Props {
    handleSubmit: (address: string) => void;
}
const SearchBar = ({ handleSubmit }: Props) => {
    const [address, setAddress] = useState<string>("");

    return (
        <form
            className="flex my-10 w-full h-fit space-between items-center gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(address);
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
                disabled={!address}
                className="flex grow justify-center bg-slate-300 rounded-sm px-4 p-2 md:px-5 md:p-3"
            >
                <span className="md:text-2xl lg:text-2xl">&#128269;</span>
            </button>
        </form>
    );
};

export default SearchBar;
