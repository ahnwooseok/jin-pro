import {useEffect, useRef, useState} from "react";
import {useRecoilState} from "recoil";
import {userInfo} from "../contexts/recoil.jsx";
import VideoComponent from "../components/VideoComponent.jsx";
import ReactModal from 'react-modal';
import axios from 'axios';



function Home() {
    const [user,setUser]= useRecoilState(userInfo)

    const [postArr, setPostArr] = useState([]);
    const [randomInt, setRandomInt] = useState(null)
    const [randomIntRendered, setRandomIntRendered] = useState(false)

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    async function start() {
        if (randomIntRendered || isLoading) return; // 이미 렌더링된 경우 함수 종료
        setIsLoading(true)

        // const url = 'https://uz0z2s1zeg.execute-api.ap-northeast-2.amazonaws.com/default/counterLambda';
        const url = 'https://usgwkz0zw8.execute-api.ap-northeast-2.amazonaws.com/default/counterLambda';
        // const apiKey = 'Bearer patFjwcwyHdZ3J4Pk.5493bc8317039dce3f81a22e049d8de3077d959455e7c34cfa2e95c110e7f872';

        try {
            const response = await axios.post(url, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': apiKey
                }
            });
            console.log('Record added successfully:', response.data.counter);
            setRandomInt(response.data.counter)
            setModalOpen(false);
            setIsLoading(false)
            setRandomIntRendered(true)
            const fields = {
                ad_name: `ad-${response.data.counter}`,
                nickname: nickname,
                is_pop_up: false,
                is_button: false,
                is_enter:true,
            };
            addRecordToAirtable(fields);
        } catch (error) {
            console.error('Error adding record:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const initialPostArr = ["post001", "post002", "post003", "ad"];
        // 랜덤으로 배열 재배열
        const shuffledArr = initialPostArr.sort(() => 0.5 - Math.random());
        setPostArr(shuffledArr);
        console.log("render")

    }, []); // 빈 배열을 의존성으로 전달하여 최초 렌더링 시만 실행



    const customModalStyles = {
        overlay: {
            // backgroundColor: "#000",
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "500px",
            maxWidth:"100%",
            height: "fit-content",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyContent: "center",
            padding: "0px",
            outline: 'none',
        },
    };
    const [modalOpen, setModalOpen] = useState(true)
    const [nickname, setNickname] = useState('');
    const validateNickname = (nickname) => {
        const regex = /^(?=.*[0-9])(?=.*[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ])[0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]{5,20}$/;
        return regex.test(nickname);
    };
    const handleEnter = () => {
        if (nickname.length !== 0 && !isLoading) { // Check isLoading before calling start
            console.log('Valid nickname:', nickname);
            start(); // Start function is called only if it's not loading
        } else if (nickname.length === 0) {
            alert('Please enter your email address.');
        }
    };

    const customModalStyles2 = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "500px",
            maxWidth:"100%",
            height: "fit-content",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyContent: "center",
            padding: "0px",
            outline: 'none',
        },
    };
    const [modalOpen2, setModalOpen2] = useState(false)
    const [modalCount, setModalCount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)


    // Airtable API 요청 함수
    async function addRecordToAirtable(fields) {
        const url = 'https://api.airtable.com/v0/appbESyRwcJEoMoQ7/statistcs';
        const apiKey = 'Bearer patFjwcwyHdZ3J4Pk.5493bc8317039dce3f81a22e049d8de3077d959455e7c34cfa2e95c110e7f872';

        const data = {
            records: [
                {
                    fields: fields
                }
            ]
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey
                }
            });
            console.log('Record added successfully:', response.data);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    }



    return (
        <div className="w-full">
            {postArr.map((item, idx) => {
                return (
                    <div className={"flexColumn"} style={{marginTop:"8px"}} key={idx}>
                        <div className={"flexRow flexAlign-between"} style={{padding:"0px 16px"}}>
                            <div className={"flexRow flexAlign-column"}>
                                {item === "ad" ? <img src={`/images/advertise_img.png`} style={{width:"40px", height:"40px"}}/> : <img src={`/images/profile${item.slice(-1)}.png`} style={{width:"40px", height:"40px"}}/>}
                                <div className={"w6"}/>
                                <div style={{fontSize:"14px", fontWeight:"500", color:"#000"}}>{item === "post001" ? "Jennie_99" : item === "post002" ? "Sarah_Writes" : item === 'post003' ? "RockinJake11" : "advertisement" + randomInt}</div>
                            </div>
                            <img src={"/images/Group.svg"}/>
                        </div>
                        <div className={"h8"}/>
                        {item === "ad" ?
                            randomInt > 3 ?
                                <img
                                    className={"cursor"}
                                    src={`/images/ad-${randomInt}.png`}
                                    onClick={() => {
                                        const fields = {
                                            ad_name: `ad-${randomInt}`,
                                            nickname: nickname,
                                            is_pop_up: false,
                                            is_button: false
                                        };
                                        addRecordToAirtable(fields);
                                        setModalOpen2(true)
                                    }}
                                />
                                :
                                <VideoComponent
                                    fields={{
                                        ad_name: `ad-${randomInt}`,
                                        nickname: nickname,
                                        is_pop_up: false,
                                        is_button: false
                                    }}
                                    addRecordToAirtable={addRecordToAirtable}
                                    modalOpen={modalOpen}
                                    setModalOpen2={setModalOpen2}
                                    randomInt={randomInt}
                                    randomIntRendered={randomIntRendered}
                                />
                            :
                            <img
                                src={`/images/${item}.png`}
                                className={"cursor"}
                                onClick={() => {
                                    const fields = {
                                        ad_name: item,
                                        nickname: nickname,
                                        is_pop_up: false,
                                        is_button: false
                                    };
                                    addRecordToAirtable(fields);
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
            <ReactModal
                isOpen={modalOpen}
                style={customModalStyles}
                ariaHideApp={false}
                contentLabel="Pop up Message"
            >
                <div style={{ position: 'relative', textAlign: 'center' }}>
                    <img src={"/images/Username-001 (1).png"} style={{ width: "100%" }} />
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Enter your CloudResearch id"
                        style={{
                            position: 'absolute',
                            bottom: '6.5%',
                            left: '24%',
                            padding: '10px',
                            fontSize: '12px',
                            width: '50%',
                            maxWidth: '200px',
                            boxSizing: 'border-box',
                            border: "none",
                            backgroundColor:"#fef4e8"
                        }}
                    />
                    <div
                        onClick={handleEnter}
                        style={{
                            position: 'absolute',
                            bottom: '6%',
                            left: '80%',
                            width:"16%",
                            height:"8%",
                            cursor: 'pointer',
                            backgroundColor:"none",
                        }}
                    />
                </div>
                {isLoading ? <div className={"loader absolute"} style={{left:"50%", top:"50%"}}/> : ""}
            </ReactModal>
            <ReactModal
                isOpen={modalOpen2}
                style={customModalStyles2}
                ariaHideApp={false}
                contentLabel="Pop up Message"
            >
                <div style={{ position: 'relative', textAlign: 'center' }}>
                    <img
                        onClick={()=>{
                            const fields = {
                                ad_name: `ad-${randomInt}`,
                                nickname: nickname,
                                is_pop_up: true,
                                is_button: false
                            };
                            addRecordToAirtable(fields);
                        }}
                        src={`/images/00${modalCount}.png`}
                        style={{ width: "100%" }}
                    />
                    {modalCount === 3 ?
                        <div
                            onClick={(event)=>{
                                event.stopPropagation()
                                alert("The product has not been released yet.")
                                const fields = {
                                    ad_name: `ad-${randomInt}`,
                                    nickname: nickname,
                                    is_pop_up: true,
                                    is_button: true
                                };
                                addRecordToAirtable(fields);
                                setModalOpen2(false)
                                setModalCount(1)
                            }}
                            style={{
                                position: 'absolute',
                                bottom: '4%',
                                width:"46%",
                                height:"14%",
                                left: '28%',
                                cursor: 'pointer',
                            }}
                        />
                        :
                        <div
                            onClick={(event)=>{
                                event.stopPropagation()
                                const fields = {
                                    ad_name: `ad-${randomInt}`,
                                    nickname: nickname,
                                    is_pop_up: true,
                                    is_button: true
                                };
                                addRecordToAirtable(fields);
                                setModalCount(modalCount+1)
                            }}
                            style={{
                                position: 'absolute',
                                bottom: '0%',
                                width:"20%",
                                height:"6%",
                                left: '80%',
                                cursor: 'pointer',
                            }}
                        />
                    }

                </div>
            </ReactModal>
        </div>

    );
}

export default Home;
