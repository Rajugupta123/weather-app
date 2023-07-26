const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

//default location
let target = "Kathmandu"

//func to fetch data from weather api
const fetchData=async(target)=>{
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();
    //console.log(data); 

    //destructuring
    const{
        current:{temp_c,condition:{icon,text}},
        location:{name,localtime}
    } = data;

    //calling update dom function
    updateDom(temp_c,name,localtime,icon,text);
    
    }catch (error) {
     alert("location not found");   
    }
}

//updating the dom
function updateDom (temp,city,time,emoji,wcondt){
    const exactDate = time.split(" ")[0];
    const exactTime = time.split(" ")[1];
    const exactDay = new Date(exactDate).getDay();
    const dayName = getFullDayName(exactDay);

    tempField.innerText = temp;
    cityField.innerText = city;
    //dateField.innerText = time;
    //console.log(time);
    //console.log(exactDate);
    //console.log(exactTime);
    
    dateField.innerText = `${exactTime} ${dayName} ${exactDate}`;

    emojiField.src = emoji;
    weatherField.innerText =  wcondt;
}
fetchData(target);

//to search the location entered by user.
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    target = searchField.value;
    // console.log(target);
    fetchData(target);
});


//func to get name of day.
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