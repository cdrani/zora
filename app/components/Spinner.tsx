import { TailSpin } from "react-loader-spinner";

interface Props {
    loading: boolean;
}
const Spinner = ({ loading }: Props) => {
    if (!loading) return null;

    return (
        <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
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
        </div>
    );
};

export default Spinner;
