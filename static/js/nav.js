function querySelector(teamNumber) {
    // This function queries the selector to return the team Name for logo files and data.
    let selectElement = document.querySelector(`#team${teamNumber}`);
    let teamName = selectElement.options[selectElement.selectedIndex].value;
    return teamName;
}

function getTeamLogo(teamNumber) {
    // This function returns the image file from the team selector by calling the flask endpoint for the image.
    let teamName = querySelector(teamNumber);
    if (teamName === '') {
        return '';
    }
    let imageHTML = `<img id="team${teamNumber}Icon" src="getTeamLogo/${teamName}" alt=${teamName} width="225" height="150"></img>`;
    return imageHTML;
}


// TODO:  break apart functions to querySelector both teams on predict
// TODO: take returned object and display results on page.



function getTeamStats(teamNumber) {
    // This function is a stub until we get the data for real stats.  Hardcoded html for now.
    
    let teamName = querySelector(teamNumber);
    if (teamName === '') {
        return '';
    }

    // TODO:  Refactor this into a straight jQuery get as ajax is deprecated and will send a notice to the console.

    // let teamStats = $.get(`/getTeamStats/${teamName}`, function(data, status, xhr) {
    //     return(data)
    // }, "json");

    
    let teamStats = $.ajax({type: "GET", 
        dataType: 'json',
        url: `/getTeamStats/${teamName}`, 
        async: false}).responseJSON;

    let playerHTML = `<table>
    <tr> <th>Name</th> <th>Age</th> <th>Ht (cm)</th> 
    <th>Wt (kg)</th> <th>College</th> <th>Draft Year</th></tr>`;

    for (i = 0; i < teamStats.length; i++) {
        playerHTML += `<tr>
        <td>${teamStats[i]['player_name']}</td> 
        <td>${teamStats[i]['age']} </td>
        <td>${Math.round(teamStats[i]['player_height'])}</td> 
        <td>${Math.round(teamStats[i]['player_weight'])}</td>
        <td>${teamStats[i]['college']} </td>
        <td>${teamStats[i]['draft_year']} </td>
        </tr>`;
    }

    playerHTML += `</table>`;

    return playerHTML;
}

function getTeamOptionManager(teamNumber) {
    // This function will populate all the html for logo and stats or whatever else we may write.
    document.getElementById(`Team${teamNumber}Logo`).innerHTML = getTeamLogo(teamNumber);
    document.getElementById(`Team${teamNumber}Stats`).innerHTML = getTeamStats(teamNumber);
    // Add more stats stuff here
}

function getTeamInnerHTML(teamNumber) {
    // Initial function to manage the selector and call other functions for data/images
    let teamHTML = `<p><select id="team${teamNumber}" onChange="getTeamOptionManager(${teamNumber})"> ${teamList}</select></p> `;
    return teamHTML;
}

// Rhyce's code

function getWinningTeamName()
    {
        let winner = "<h3>winning team name will go here</h3>"
        return winner
    }

function getWinningTeamLogo(winningName)
    {
        // let teamName = querySelector(teamNumber);

        let winningLogo =  `<img id="winning_team_logo" src="getTeamLogo/${winningName}" alt=${winningName} width="225" height="150"></img>`;
        // "<img src = '#' alt = 'winning team logo will go here'></img>"
        return winningLogo
    }


var predict = d3.select(".button")
predict.on("click", function() 
    {
        console.log("The predict button has been clicked")

        HomeTeam = querySelector(1)
        VisitingTeam = querySelector(2)

        console.log(HomeTeam)
        console.log(VisitingTeam)

        let winnerDetails = $.ajax({type: "GET", 
        dataType: 'json',
        url: `/getWinner/${HomeTeam}&${VisitingTeam}`,
        async: false}).responseJSON;

        console.log(winnerDetails)

        winningName = winnerDetails["winner"]
        console.log(winningName)

        // document.getElementById("winning_team_name").innerHTML = getWinningTeamName()
        document.getElementById("winning_team_logo").innerHTML = getWinningTeamLogo(winningName)
    });

// End Rhyce's code



document.getElementById('Team1Selector').innerHTML = getTeamInnerHTML(1);
document.getElementById('Team2Selector').innerHTML = getTeamInnerHTML(2);