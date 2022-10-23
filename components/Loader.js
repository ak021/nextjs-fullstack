import { Dna } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="w-full flex items-center justify-center h-80">
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
