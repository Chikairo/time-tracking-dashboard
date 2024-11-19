const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");



window.addEventListener("load",(e)=> {
    //get jsondata(daily)
    getJsonData("daily");
});

    //color changes when the button gets clicked
daily.addEventListener("click",function() {
    weekly.style.color="#5858b4";
    monthly.style.color="#5858b4";
    this.style.color="white";
    getJsonData("daily");
});

weekly.addEventListener("click",function() {
    daily.style.color="#5858b4";
    monthly.style.color="#5858b4";
    this.style.color="#FAFAFA";
    getJsonData("weekly");
});

monthly.addEventListener("click",function() {
    daily.style.color="#5858b4";
    weekly.style.color="#5858b4";
    this.style.color="#FAFAFA";
    getJsonData("monthly");
});

function getJsonData(timeFrame) {
    fetch("./data.json").then(response => {
        return response.json();
    }).then(data => {
        data.forEach((value, index) => {
            //store json data variables
            const current = value.timeframes[timeFrame].current;
            const previous = value.timeframes[timeFrame].previous;
            const title = value.title;
            let textnode;

            //store the nodes in variables
            const titleElement = document.getElementById(`title-${index}`);
            const currentHourstElement = document.getElementById(`current-${index}`);

            //set text inside the title & current hours field
            titleElement.innerText = title;
            currentHourstElement.innerText = current.toString() + "hrs";

            //establish a span to hold the previous timeframe data & append it to the currntHours 
            const spanNode = document.createElement("span");
            if(timeFrame == "daily"){
                textnode = document.createTextNode("Yesterday - " + previous.toString() + "hrs");
            }
            else if(timeFrame == "weekly") {
                textnode = document.createTextNode("Lask Week - " + previous.toString() + "hrs");
            }
            
            else {
                textnode = document.createTextNode("Last Month - " + previous.toString() + "hrs");
            }

            spanNode.appendChild(textnode);
            currentHourstElement.appendChild(spanNode);
        })
    });
}