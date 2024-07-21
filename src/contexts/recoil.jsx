import {atom,selector} from "recoil";

export const userInfo = atom({
    key: 'userInfo',
    default: {
        AdAgreeYn: "",
        BizNm: "",
        BizNo: "",
        BizType: "",
        CplatToken: "",
        DailyAlertAmount: "",
        DailyAmountAlertYn: "",
        DailyReportYn: "",
        Email: null,
        LastLoginDate: "",
        Name: "",
        Password: null,
        PhoneNumber: "",
        PushAlertToken: "",
        SnsToken: "",
        SnsType: "",
        StoreCategory1: "",
        StoreCategory2: "",
        StoreName: "",
        StoreSinceWhenSales: "",
        StoreThumbnailImageUrl: "",
        UndeliveryAlertTime: "",
        UndeliveryAlertYn: "",
        UseYn: "",
        UserNo: "",
        VerificationToken: null,
    }
});

export const systemInfo = atom({
    key: 'systemInfo',
    isMobile: window.innerWidth<=500 ? true : false,
    default: {
        isBannerEnable: false,
        isAccountUser: null,
        isLoginChecked: false,
        isRenderLoading:false,
        userReloadCount: 0,
        errorPages: [],
        isErrorPagesLoading: true,
        popup: {
            isPopupOpen : false,
            popupTitle: "",
            popupDescription: "",
            confirmText: "",
            isKakao: false
        },
        alert: {
            alertCount: 0,
            message: "",
            type: ""
        },
        topBanner: {
            isOpen: false,
            displayComponent: <div></div>,
            isNeedCloseButton: true,
            closeList: []
        },
        monitoringModal: {
            isReady: false
        },
    }
});

export const requestSetSystemItem = selector({
    key: "requestSetSystemItem",
    get: ({ get })=> get(systemInfo),
    set: ({ set,get },systemItemObect) => {
        let system = get(systemInfo);
        set(systemInfo,{...system,...systemItemObect});
    }
});

export const requestAlert = selector({
    key: "requestAlert",
    get: ({ get })=> get(systemInfo),
    set: ({ set,get },[message,type]) => {
        let system = get(systemInfo);
        set(systemInfo,{...system,alert: {message,type,alertCount: system.alert.alertCount+1}});
    }
});

export const reloadUserInfo = selector({
    key: "reloadUserInfo",
    get: ({ get })=>get(userInfo),
    set: ({ set,get }) => {
        let system = get(systemInfo);
        set(systemInfo,{...system,userReloadCount: (system.userReloadCount+1)});
    }
});


