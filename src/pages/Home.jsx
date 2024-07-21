import {useEffect, useRef, useState} from "react";
import {useRecoilState} from "recoil";
import {userInfo} from "../contexts/recoil.jsx";
import VideoComponent from "../components/VideoComponent.jsx";



function Home() {
    const [user,setUser]= useRecoilState(userInfo)

    let postArr = ["post001", "post002", "post003", "ad"]
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let randomInt = getRandomInt(1, 4)
    return (
        <div className="w-full">
            {postArr.sort(() => 0.5 - Math.random()).map((item, idx) => {
                return (
                    <div className={"flexColumn"} style={{marginTop:"8px"}} key={idx}>
                        <div className={"flexRow flexAlign-between"} style={{padding:"0px 16px"}}>
                            <div className={"flexRow flexAlign-column"}>
                                <img src={"/images/Story_icon.svg"}/>
                                <div className={"w6"}/>
                                <div style={{fontSize:"14px", fontWeight:"500", color:"#000"}}>{item === "post001" ? "Jennie_99" : item === "post002" ? "Sarah_Writes" : item === 'post003' ? "RockinJake11" : "ad" + randomInt}</div>
                            </div>
                            <img src={"/images/Group.svg"}/>
                        </div>
                        <div className={"h8"}/>
                        {item === "ad" ?
                            randomInt > 2 ?
                                <img
                                    className={"cursor"}
                                    src={`/images/ad-${randomInt}.png`}
                                    onClick={() => {
                                        alert("count")
                                    }}
                                />
                                :
                                <VideoComponent/>

                            :
                            <img
                                className={"cursor"}
                                src={`/images/${item}.png`}
                                onClick={() => {
                                    alert("count")
                                }}
                            />
                        }
                        <div className={"h10"}/>
                        <div className={"flexRow flexAlign-between"} style={{padding:"0px 16px"}}>
                            <div className={"flexRow flexAlign-column"}>
                                <img src={"/images/Vector4.svg"}/>
                                <div className={"w16"}/>
                                <img src={"/images/Vector5.svg"}/>
                                <div className={"w16"}/>
                                <img src={"/images/Group6.svg"}/>
                            </div>
                            <img src={"/images/Vector7.svg"}/>
                        </div>
                        <div className={"h16"}/>
                        <div className={"flexColumn"} style={{padding:"0px 16px"}}>
                            <div style={{fontSize:"14px", fontWeight:"300", color:"#000"}}>
                                Liked by <span style={{fontWeight:"500"}}>thekamraan</span> and <span style={{fontWeight:"500"}}>{Math.floor(Math.random() * 1000)} others</span>
                            </div>
                            <div className={"h8"}/>
                            <div style={{fontSize:"14px", fontWeight:"400", color:"#000"}}>
                                {item === "post001" ? "Soaking up the sun at the beach today!🏖️  Perfect day for some volleyball, swimming, and just chilling by the ocean. #BeachDay #SummerFun #OceanLovers" : item === "post002" ? "Sunday mornings are made for cozy coffee shop vibes.📚 Love this spot for a perfect blend of great coffee and a peaceful atmosphere. #CoffeeLover #CafeCulture #SundayVibes" : item === 'post003' ? "Rocking out at the music festival! The energy here is insane, and the bands are absolutely killing it. Can't wait for more performances tonight! 🎸 🔥 #MusicFestival #LiveMusic #FestivalVibes #ChicagoRocks" : "ad"}
                                <span style={{color:"#8A8A8A"}}>...more</span>
                            </div>
                            <div className={"h6"}/>
                            <div style={{fontSize:"14px", fontWeight:"400", color:"#8A8A8A"}}>
                                View all {Math.floor(Math.random() * 101)} comments
                            </div>
                        </div>
                    </div>
                )
            })}



        </div>
    );
}

export default Home;
