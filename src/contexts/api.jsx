import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL;


export const UserSignInBySocial = (token, type)=>{
    return axios.post(BACKEND_URL+`user/sign_in_by_social`, {
        access_token: token,
        SnsType: "kakao",
        Token: token,
        // OsType: "Web",
        OsType: type,
        CurrentVersion: "Sellkey",
    });
}




export const UserGetUserInfo = (token)=>{
    return axios.post(`https://devapi.cplat.io/v2/user/get_user_info`, {
        cplatToken: token,
    });
}
export const GetSubscriptionModel = ()=>{
    return axios.post(`https://devapi.cplat.io/v2/ai-cs/get_subscription_model`, {
    });
}

export const ServiceValidPromotionCode = (data) => {
    return axios.post(BACKEND_URL+"service/valid_promotion_code", data
    );
};

export const  PaymentReadyForKakaoPay = (data) => {
    return axios.post(BACKEND_URL+"user/payment_ready_for_kakao_pay", data
    );
};

export const SetSubscriptionForKakaoPay = (data) => {
    return axios.post(BACKEND_URL+"user/set_subscription_for_kakao_pay", data
    );
};


export const UserRegisterCardForBilling = (data) => {
    return axios.post(BACKEND_URL+"user/register_card_for_billing",data);
};
export const UserSetSubscription = (data) => {
    return axios.post(BACKEND_URL+"user/set_subscription",data);
};
export const UserSetUnsubscription = (data) => {
    return axios.post(BACKEND_URL+"user/set_unsubscription",data);
};
export const SetUnsubscriptionRollback = (data) => {
    return axios.post(BACKEND_URL+"user/set_unsubscription_rollback", data
    );
};
export const ChangeSubscriptionPlan = (data) => {
    return axios.post(BACKEND_URL+"user/change_subscription_plan", data
    );
};


export const GetMarketModel = (data) => {
    return axios.post(BACKEND_URL+"service/get_market_model",data);
};
export const UserRegisterMarketAccount = (data) => {
    return axios.post(BACKEND_URL+"user/register_market_account",data);
};
export const UserSetAuthenticationCodeByMarket = (data) => {
    return axios.post(BACKEND_URL+"user/set_authentication_code_by_market",data);
};


export const UserGetRegisteredMarketAccountInfo = (data) => {
    return axios.post(BACKEND_URL+"user/get_registered_market_account_info",data);
};


export const UserUnregisterMarketAccount = (data) => {
    return axios.post(BACKEND_URL+"user/unregister_market_account",data);
};

export const SetMarketDnisRegister = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/set_market_dnis_register",data);
};
export const VerifyAuthenticationNo = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/verify_authentication_no",data);
};
export const SetMarketDnisRollback = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/set_market_dnis_rollback",data);
};
export const VerifyAuthenticationNoRollback = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/verify_authentication_no_rollback",data);
};
export const SetMarketSellerPhoneNo = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/set_market_seller_phone_no",data);
};
export const GetAiSellerRegisteredMarket = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/get_ai_seller_registered_market",data);
};

export const GetMarketRegisterManagement = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/get_market_register_management",data);
};

export const UpdateAvailableWorkingTime = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/update_available_working_time",data);
};

export const GetAiSellerUser = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/get_ai_seller_user",data);
};

export const GetAiSellerCurrentPhoneNo = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/get_ai_seller_current_phone_no",data);
};


export const GetSubscriptionInfo = (data) => {
    return axios.post(BACKEND_URL+"user/get_subscription_info", data);
};
export const UserRetrieveBillingInfo = (data) => {
    return axios.post(BACKEND_URL+"user/retrieve_billing_info",data);
};

export const GetPaymentInfo = (data) => {
    return axios.post(BACKEND_URL+"user/get_payment_info", data);
};

export const GetRefundHistory = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/get_refund_history", data);
};
export const GetCallStatistics = (data) => {
    return axios.post(BACKEND_URL+"ai-cs/get_call_statistics", data);
};

export const FileUploadImage = (data) => {
    let header = {
        'Content-Type': "multipart/form-data",
        'Accept': "application/json",
    };
    return axios.post(`${BACKEND_URL}file/upload_image`, data, header);
}
export const SetAskInfo = (data) => {
    return axios.post(BACKEND_URL+"user/set_ask_info", data
    );
};

export const GetAskInfo = (data) => {
    return axios.post(BACKEND_URL+"user/get_ask_info", data
    );
};

export const UserSetUserInfo = (data) => {
    return axios.post(BACKEND_URL+"user/set_user_info",data);
};

export const UserHasStoreName = (storeName) => {
    return axios.post(BACKEND_URL+"user/has_store_name", {
        storeName: storeName,
    });
};

