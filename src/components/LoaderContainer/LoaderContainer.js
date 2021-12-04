import Loader from "react-loader-spinner";


import "./index.css"

function LoaderContainer({loaderMessage}) {
    return (
        <div className="loader"><Loader
      type="TailSpin"
      color="#00BFFF"
      height={100}
      width={100}
    /><p className="loader-message">{loaderMessage}</p></div>
    );
}

export default LoaderContainer;