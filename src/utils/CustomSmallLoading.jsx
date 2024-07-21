import Lottie from "lottie-react";
import loading from "../../public/icons/loading.json"
const CustomSmallLoading = ({style={width: 160},wrapperStyle={width: "100%"},marginTop=null}) => {
    return <div className="flexRow">
        <div className="flexRow" style={wrapperStyle}><Lottie  style={style} animationData={loading} loop={true} /></div>
    </div>
}
export default CustomSmallLoading;
