let decodeKey = ["0b91f", "a51b72", "362abc", "437d7", "eddc8be445", "2c"];
let secret = "32";
let stepOne = decodeKey.join("").split("").reverse().join("");
let stepTwo = stepOne.split(secret);
let stepThree = stepTwo[0] + stepTwo[1];

const API_KEY = stepThree;
export default API_KEY;