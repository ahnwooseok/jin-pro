import {useEffect, useState} from 'react'
import {useRecoilState, useSetRecoilState} from "recoil";
import {requestSetSystemItem, systemInfo} from "./contexts/recoil.jsx";
import {enqueueSnackbar} from "notistack";
import {UserGetUserInfo} from "./contexts/api.jsx";
import {BrowserRouter, Router, Route, Routes, useLocation, useNavigate, NavLink} from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {


    const [system, setSystem] = useRecoilState(systemInfo);
    const [isLogin,setIsLogin] = useState(false)


    const setSystemItemState = useSetRecoilState(requestSetSystemItem);



    const makeSnackbar = (orderMessage, orderType)=> {
        return (
            enqueueSnackbar(orderMessage, {variant: orderType,
                content: (key,message) => (
                    <div className='flexRow flexAlign-column borderBox' style={{padding: "16px 34px",maxWidth: "100%",width: "calc(100%)",minWidth: 200, minHeight: 40,backgroundColor:  orderType==="error" ? "rgba(217, 42, 42, 0.6)" : "rgba(0, 143, 66, 0.6)", borderRadius: "15px"}}>

                        {orderType==="error" ?
                            <div style={{width:"24px",  color: "#FFFFFF"}}>⚠</div>

                            // <img src="/images/snackbar-warning-icon.png" style={{width: 24,height: 24, marginRight:"12px"}} />
                            :
                            <div style={{width:"24px",  color: "#FFFFFF",fontSize: 14}}>✅</div>

                        }
                        <div className="flexRowWrapper" style={{justifyContent: "space-between", width: "100%", whiteSpace: "pre-wrap"}}>
                            <div style={{color: "#FFFFFF",fontWeight: 400, fontSize:"14px",whiteSpace: "pre-wrap",width: "100%",wordBreak: "break-all"}}>
                                {" "+message.split("<>").join("\n")}
                            </div>
                            {/* <div className="pointer" style={{color: "#FFFFFF"}} onClick={()=>{closeSnackbar(key)}}>✖</div> */}
                        </div>
                    </div>
                )
            })
        )

    }
    useEffect(()=>{
        if(system.alert.message!==""){
            makeSnackbar(system.alert.message,system?.alert?.type ? system.alert.type : "error");
        }
    },[system.alert.alertCount])

    const routerPush = useNavigate();


    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100); // 지연 시간을 100ms로 설정하여 렌더링 후에 스크롤을 조정

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    return (

        <div className={"flexAlign"} style={{width:"100vw"}}>
            <div className={"flexColumn flexAlign-column"} style={{width:"100vw", maxWidth:"500px"}}>
                <div className={"h12"}/>
                <div className={"flexRow flexAlign-between w-full"} style={{padding:"0px 20px"}}>
                    <img src={"/images/logos_instagram.png"} className={"cursor"} onClick={()=>{routerPush("/")}} style={{width:"123px", height:"35px"}}/>
                    <div className={"flexRow flexAlign-column'"}>
                        <img src={"/images/Vector1.svg"}/>
                        <div className={"w24"}/>
                        <img src={"/images/Vector2.svg"}/>
                        <div className={"w24"}/>
                        <img src={"/images/Vector3.svg"}/>
                    </div>
                </div>
                <div className={"h12"}/>
                <div className={"h1 w-full"} style={{backgroundColor:"#E0E0E0"}}/>
                <Routes>
                    <Route path="/" element={<Home />} />,
                </Routes>
            </div>
        </div>

    )
}

export default App
