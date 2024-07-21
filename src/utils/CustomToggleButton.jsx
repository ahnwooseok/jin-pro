import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize.jsx";
const CustomToggleButton = ({toggleList,toggleState,setToggleState,toggleDisplayList,width=null}) => {


    const colors = {
        "white": "#FFFFFF",
        "black": "#3D3D3D",
        "lightBlack": "#666666",
        "lightGray": "#DADADA",
        "gray": "#EEEEEE",
        "darkGray": "#838383",
        "orange": "#FF7D18",
        "gray01": "#191919",
        "gray05": "#6F6F6F",
        "gray06": "#8B8B8B",
        "gray07": "#A5A5A5",
        "gray09": "#E8E8E8",
        "gray10": "#F9F9F9",
        "sub_color_2": "#838383",
        "bottomBlue": "#415B6D",
        "red": "#FF5353",
        "blue": "#4472EB",
        orange1: "#FF7D18",
        orange3: "#FFF2E8",
        orange300: "#FFBE8B"
    }


    const [wrapperWidth,setWrapperWidth]=useState(null);
    const windowSize = useWindowSize();
    let selectedIndex=toggleList.indexOf(toggleState);
    const handleToggle = (index) => {
        setToggleState(toggleList[index]);
        let width = window.document.getElementById(`toggle${index}`).offsetWidth+"px";
        window.document.getElementById("toggleSwitcher").style.width=width;
        window.document.getElementById("toggleSwitcher").style.minWidth=width;
        let left = toggleList.reduce((acc,cur,curIndex)=>{
            if(curIndex<index){
                return acc+window.document.getElementById(`toggle${curIndex}`).offsetWidth;
            }else{
                return acc;
            }
        },4)+"px";
        window.document.getElementById("toggleSwitcher").style.left=left;

    }

    const resizeToggleBar = (width) => {
        let toggleWrapperWidth;
        let wrapperForMaxWidth = windowSize.width-(20 + 20)  // 윈도우 size - 양쪽 패딩
        if(width===null){
            toggleWrapperWidth=toggleList.reduce((acc,cur,curIndex)=>acc+window.document.getElementById(`toggle${curIndex}`).offsetWidth ,9); //8+1 (1는 css offset => 소숫점 width 섞이면 연산 깨짐)
            if(wrapperForMaxWidth < toggleWrapperWidth){
                toggleWrapperWidth=wrapperForMaxWidth;
            }
        }else{
            if(width.indexOf("%")!==-1){
                toggleWrapperWidth=width;
            }else{
                toggleWrapperWidth=width+"px";
            }
        }
        setWrapperWidth(toggleWrapperWidth);
    }

    useEffect(()=>{
        resizeToggleBar(width);
        handleToggle(0);
    },[])

    return (
        <div id="toggleWrapper" style={{overflowX: "auto",width: wrapperWidth,height: 46, borderRadius: 25, backgroundColor: "#FFFFFF", display: "flex", justifyContent: "space-around", alignItems: "center",position: "relative",overflow: "scroll"}}>
            <div className="pointer" style={{zIndex: 1,position: "absolute", height: 46, borderRadius: 25, backgroundColor: "transparent", display: "flex", justifyContent: "space-between", boxSizing: "border-box", padding: "0px 4px", alignItems: "center",top: 0, left: 0}}>
                {
                    toggleDisplayList.map((toggleDisplay,toggleDisplayIndex)=>(
                        <div
                            id={`toggle${toggleDisplayIndex}`}
                            onClick={()=>{handleToggle(toggleDisplayIndex)}}
                            className="Body5S14" style={{whiteSpace: "nowrap",boxSizing: "border-box" ,display: "flex", justifyContent: "flex-start", alignItems: "center",color: selectedIndex===toggleDisplayIndex ? "#FF7F00" : "#6F6F6F" ,padding: "0px 12px",height: "100%", zIndex:"100"}}
                        >
                            {toggleDisplay}
                        </div>
                    ))
                }
            </div>
            <div id="toggleSwitcher" style={{zIndex: 0,position: "absolute", minHeight: 38, backgroundColor: "#FFF4E8",top: 4,borderRadius: 25, transition:"all 0.2s ease-in-out"}}></div>
        </div>
    )
}
export default CustomToggleButton;