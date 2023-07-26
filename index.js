const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");

const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "Kathmandu"

const fetchData=async()=>{
    const url = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data); 

    //destructuring
    const{
        current:{temp_c,condition:{icon,text}},
        location:{name,localtime}
    } = data;

    updateDom(temp_c,name,localtime,icon,text);
}
function updateDom (temp,city,time,emoji,wcondt){
    tempField.innerText = temp;
    cityField.innerText = city;
    //dateField.innerText = time;
    console.log(time);
    const exactDate = time.split(" ")[0];
    const exactTime = time.split(" ")[1];
    console.log(exactDate);
    console.log(exactTime);
    const exactDay = new Date(exactDate).getDay();
    const dayName = getFullDayName(exactDay);
    dateField.innerText = `${exactTime} ${dayName} ${exactDate}`;

    emojiField.src = emoji;
    weatherField.innerText =  wcondt;
}
fetchData();

function getFullDayName(num){

    switch(num){
        case 0:
        return "Sunday";
        break;
        case 1:
        return "Monday";
        break;
        case 2:
        return "Tuesday";
        break;
        case 3:
        return "Wednesday";
        break;
        case 4:
        return "Thursday";
        break;
        case 5:
        return "Friday";
        break;
        case 6:
        return "Saturday";
        break;
        default:
            return "don't know";
    }
}



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    target = searchField.value;
    // console.log(target);
    fetchData();
});