var fish = document.getElementById("fish");
var fish_request = new XMLHttpRequest();

var date = new Date();
var month = date.getMonth();
var hour = date.getHours();

fish_request.open('GET', 'https://acnhapi.com/fish', true);

fish_request.onload = function () {
    var fish_data = JSON.parse(this.response);

    for (const key in fish_data) {
        if (fish_data.hasOwnProperty(key)) {
            var fish_monthlimit;

            if (!fish_data[key].availability.isAllYear) {
                fish_monthlimit = fish_data[key].availability["month-northern"].match(/\d+/g);
            } else {
                fish_monthlimit[0] = 1;
                fish_monthlimit[1] = 12;
            }
            if (parseInt(fish_monthlimit[0], 10) > parseInt(fish_monthlimit[1], 10) && month <= fish_monthlimit[1]-1) {
                fish_monthlimit[0] = fish_monthlimit[0] - 12;
            }
            if (parseInt(fish_monthlimit[0], 10) > parseInt(fish_monthlimit[1], 10) && month >= fish_monthlimit[0]-1) {
                fish_monthlimit[1] = parseInt(fish_monthlimit[1], 10) + 12;
            }
            if (parseInt(fish_monthlimit[2], 10) > parseInt(fish_monthlimit[3], 10) && month <= fish_monthlimit[3]-1) {
                fish_monthlimit[2] = fish_monthlimit[2] - 12;
            }
            if (parseInt(fish_monthlimit[2], 10) > parseInt(fish_monthlimit[3], 10) && month >= fish_monthlimit[3]-1) {
                fish_monthlimit[3] = parseInt(fish_monthlimit[3], 10) + 12;
            }
            if (fish_monthlimit[1] == null && !fish_data[key].availability.isAllYear) fish_monthlimit[1] = fish_monthlimit[0];

            var fish_timelimit = new Array();

            if (!fish_data[key].availability.isAllDay) {
                fish_timelimit = fish_data[key].availability.time.match(/\d+/g);
                if(fish_data[key].availability.time.substr(1,2)==="pm") fish_timelimit[0]=parseInt(fish_timelimit[0], 10)+12;
                if(fish_data[key].availability.time.substr(-2)==="pm") fish_timelimit[1]=parseInt(fish_timelimit[1], 10)+12;
            } else {
                fish_timelimit[0] = 0;
                fish_timelimit[1] = 24;
            }
            
            if (parseInt(fish_timelimit[0], 10) > parseInt(fish_timelimit[1], 10) && hour <= fish_timelimit[1]-1) {
                fish_timelimit[0] = fish_timelimit[0] - 24;
            }
            if (parseInt(fish_timelimit[0], 10) > parseInt(fish_timelimit[1], 10) && hour >= fish_timelimit[0]-1) {
                fish_timelimit[1] = parseInt(fish_timelimit[1], 10) + 24;
            }
                
            
            
            if(((month >= fish_monthlimit[0]-1 && month <= fish_monthlimit[1]-1) || (month >= fish_monthlimit[2]-1 && month <= fish_monthlimit[3]))
                && (hour >= fish_timelimit[0] && hour <= fish_timelimit[1])) {
                var fishpara = document.createElement("p");
                var fish_yearavail;
                var fish_dayavail;
                fish_data[key].availability.isAllYear?fish_yearavail = "All year":fish_yearavail = fish_data[key].availability["month-northern"];
                fish_data[key].availability.isAllDay?fish_dayavail = "All day":fish_dayavail = fish_data[key].availability.time;

                fishpara.innerHTML = "<img src='https://acnhapi.com/icons/fish/" + fish_data[key].id + "' height=64 width=64><h4>" + capitalizeFirstLetter(fish_data[key].name["name-eneu"]) + " (" + fish_data[key]["file-name"] +")</h4><p class='details'>Availability: " + fish_yearavail + "; " +
                fish_dayavail + "</p><p class='details'>Location: " +
                fish_data[key].availability.location + "</p><p class='details'>Rarity: " +
                fish_data[key].availability.rarity + "</p><p class='details'>Shadow: " +
                fish_data[key].shadow + "</p><p class='details'>Price: " +
                fish_data[key].price + " (<span title='Price at CJ'>" + fish_data[key]["price-cj"] + "</span>)</p>";
                fish.appendChild(fishpara);
            }
        }
    }
}

fish_request.send();

var bugs = document.getElementById("bugs");
var bugs_request = new XMLHttpRequest();

bugs_request.open('GET', 'https://acnhapi.com/bugs', true);

bugs_request.onload = function () {
    var bug_data = JSON.parse(this.response);

    console.log (bug_data);

    for (const key in bug_data) {
        if (bug_data.hasOwnProperty(key)) {
            var bug_monthlimit;

            if (!bug_data[key].availability.isAllYear) {
                bug_monthlimit = bug_data[key].availability["month-northern"].match(/\d+/g);
            } else {
                bug_monthlimit[0] = 1;
                bug_monthlimit[1] = 12;
            }
            if (parseInt(bug_monthlimit[0], 10) > parseInt(bug_monthlimit[1], 10) && month <= bug_monthlimit[1]-1) {
                bug_monthlimit[0] = bug_monthlimit[0] - 12;
            }
            if (parseInt(bug_monthlimit[0], 10) > parseInt(bug_monthlimit[1], 10) && month >= bug_monthlimit[0]-1) {
                bug_monthlimit[1] = parseInt(bug_monthlimit[1], 10) + 12;
            }
            if (parseInt(bug_monthlimit[2], 10) > parseInt(bug_monthlimit[3], 10) && month <= bug_monthlimit[3]-1) {
                bug_monthlimit[2] = bug_monthlimit[2] - 12;
            }
            if (parseInt(bug_monthlimit[2], 10) > parseInt(bug_monthlimit[3], 10) && month >= bug_monthlimit[3]-1) {
                bug_monthlimit[3] = parseInt(bug_monthlimit[3], 10) + 12;
            }
            if (bug_monthlimit[1] == null && !bug_data[key].availability.isAllYear) bug_monthlimit[1] = bug_monthlimit[0];

            var bug_timelimit = new Array();

            if (!bug_data[key].availability.isAllDay) {
                bug_timelimit = bug_data[key].availability.time.match(/\d+/g);
                if(bug_data[key].availability.time.substr(1,2)==="pm") bug_timelimit[0]=parseInt(bug_timelimit[0], 10)+12;
                if(bug_data[key].availability.time.substr(-2)==="pm") bug_timelimit[1]=parseInt(bug_timelimit[1], 10)+12;
            } else {
                bug_timelimit[0] = 0;
                bug_timelimit[1] = 24;
            }

            console.log(bug_data[key]["file-name"], bug_timelimit[0], bug_timelimit[1]);
            
            if (parseInt(bug_timelimit[0], 10) > parseInt(bug_timelimit[1], 10) && hour <= bug_timelimit[1]-1) {
                bug_timelimit[0] = bug_timelimit[0] - 24;
            }
            if (parseInt(bug_timelimit[0], 10) > parseInt(bug_timelimit[1], 10) && hour >= bug_timelimit[0]-1) {
                bug_timelimit[1] = parseInt(bug_timelimit[1], 10) + 24;
            }

            if(((month >= bug_monthlimit[0]-1 && month <= bug_monthlimit[1]-1) || (month >= bug_monthlimit[2]-1 && month <= bug_monthlimit[3]))
                && (hour >= bug_timelimit[0] && hour <= bug_timelimit[1])) {
                var bugpara = document.createElement("p");
                var bug_yearavail;
                var bug_dayavail;
                bug_data[key].availability.isAllYear?bug_yearavail = "All year":bug_yearavail = bug_data[key].availability["month-northern"];
                bug_data[key].availability.isAllDay?bug_dayavail = "All day":bug_dayavail = bug_data[key].availability.time;

                bugpara.innerHTML = "<img src='https://acnhapi.com/icons/bugs/" + bug_data[key].id + "' height=64 width=64><h4>" + capitalizeFirstLetter(bug_data[key].name["name-eneu"]) + " (" + bug_data[key]["file-name"] +")</h4><p class='details'>Availability: " + bug_yearavail + "; " +
                bug_dayavail + "</p><p class='details'>Location: " +
                bug_data[key].availability.location + "</p><p class='details'>Rarity: " +
                bug_data[key].availability.rarity + "</p><p class='details'>Price: " +
                bug_data[key].price + " (<span title='Price at Flick'>" + bug_data[key]["price-flick"] + "</span>)</p>";
                bugs.appendChild(bugpara);
            }
        }
    }
}

bugs_request.send();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }