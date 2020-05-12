var fish = document.getElementById("fish");
var request = new XMLHttpRequest();

request.open('GET', 'https://acnhapi.com/fish', true);

request.onload = function () {
    var data = JSON.parse(this.response);

    // console.log(data);

    var date = new Date();
    var month = date.getMonth();
    var hour = date.getHours();

    // var d1 = new Date(date.getFullYear(), date.getMonth());
    // var d2 = new Date(2021, 0, 0, 9);

    // var txt = "foo3bar5";
    // var num = string.match(/\d/g);

    // console.log(num[1]);
    

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            var monthlimit;

            if (!data[key].availability.isAllYear) {
                monthlimit = data[key].availability["month-northern"].match(/\d+/g);
            } else {
                monthlimit[0] = 1;
                monthlimit[1] = 12;
            }
            if (parseInt(monthlimit[0], 10) > parseInt(monthlimit[1], 10) && month <= monthlimit[1]-1) {
                monthlimit[0] = monthlimit[0] - 12;
            }
            if (parseInt(monthlimit[0], 10) > parseInt(monthlimit[1], 10) && month >= monthlimit[0]-1) {
                monthlimit[1] = parseInt(monthlimit[1], 10) + 12;
            }
            if (parseInt(monthlimit[2], 10) > parseInt(monthlimit[3], 10) && month <= monthlimit[3]-1) {
                monthlimit[2] = monthlimit[2] - 12;
            }
            if (parseInt(monthlimit[2], 10) > parseInt(monthlimit[3], 10) && month >= monthlimit[3]-1) {
                monthlimit[3] = parseInt(monthlimit[3], 10) + 12;
            }
            if (monthlimit[1] == null && !data[key].availability.isAllYear) monthlimit[1] = monthlimit[0];

            var timelimit = new Array();

            if (!data[key].availability.isAllDay) {
                timelimit = data[key].availability.time.match(/\d+/g);
                data[key].availability.time.substr(1,2)=="am"?timelimit[0]=parseInt(data[key].availability.time.substr(0,1), 10):timelimit[0]=parseInt(data[key].availability.time.substr(0,1), 10)+12;
                data[key].availability.time.substr(7,2)=="am"?timelimit[1]=parseInt(data[key].availability.time.substr(6,1), 10):timelimit[1]=parseInt(data[key].availability.time.substr(6,1), 10)+12;
            } else {
                timelimit[0] = 1;
                timelimit[1] = 24;
            }
            
            if (parseInt(timelimit[0], 10) > parseInt(timelimit[1], 10) && hour <= timelimit[1]-1) {
                timelimit[0] = timelimit[0] - 24;
            }
            if (parseInt(timelimit[0], 10) > parseInt(timelimit[1], 10) && hour >= timelimit[0]-1) {
                timelimit[1] = parseInt(timelimit[1], 10) + 24;
            }
            // timelimit[0] < 10 ? timelimit[0] = "0" + timelimit[0] + ":00" : timelimit[0] = timelimit[0] + ":00";
            // timelimit[1] < 10 ? timelimit[1] = "0" + timelimit[1] + ":00" : timelimit[1] = timelimit[1] + ":00";
            
            
            if(((month >= monthlimit[0]-1 && month <= monthlimit[1]-1) || (month >= monthlimit[2]-1 && month <= monthlimit[3]))
                && (hour >= timelimit[0] && hour <= timelimit[1])) {
                // && (data[key].availability.isAllDay || (hour >= timelimit[0] && hour <= timelimit[1]) || (timelimit[0]>timelimit[1] && ((hour >= timelimit[0] && hour <= 23) || (hour <= timelimit[1] && hour >= 0))))){
                var fishpara = document.createElement("p");
                var yearavail;
                var dayavail;
                data[key].availability.isAllYear?yearavail = "All year":yearavail = data[key].availability["month-northern"];
                data[key].availability.isAllDay?dayavail = "All day":dayavail = data[key].availability.time;

                fishpara.innerHTML = "<img src='https://acnhapi.com/icons/fish/" + data[key].id + "' height=64 width=64><br><h4>" + capitalizeFirstLetter(data[key]["file-name"].replace(/_/g, " ")) + "</h4>Availability: " + yearavail + "; " +
                dayavail + "<br>Location: " +
                data[key].availability.location + "<br>Rarity: " +
                data[key].availability.rarity + "<br>Shadow: " +
                data[key].shadow;
                fish.appendChild(fishpara);
            }
        }
    }
}

request.send();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }