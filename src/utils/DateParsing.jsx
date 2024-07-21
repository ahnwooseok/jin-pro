export const DateParsing = (string) => {
    if(string === "") return "";
    let dateArray = string.split("T")[0].split("-");
    return dateArray[0] + "년 " + dateArray[1] + "월 " +dateArray[2] + "일 ";
};
export const DateParsingDot = (string) => {
    if(string === "") return "";
    let dateArray = string.split("T")[0].split("-");
    return dateArray[0] + ". " + dateArray[1] + ". " +dateArray[2];
};