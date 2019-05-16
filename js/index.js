const STANDINGS_URL = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2018-2019-regular/standings.json";
const STATISTICS_URL = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2018-2019-regular/player_stats_totals.json";
var leaders = [];

$(document).ready(function () {
      window.setTimeout(function(){
        $('#spinnerContainer').hide();   
          }, 2000);

    $.ajax(STANDINGS_URL, {
      type: "GET",
      url: STANDINGS_URL,
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa("e0fd2d70-d446-4f43-8535-1cc6d8" + ":" + "MYSPORTSFEEDS")
      },
      success: function (data) {
        let teams = data.teams.map(post => post);
        let ranksEast = [];
        let ranksWest = [];
  

        $('#eastStandings').append(
          "<tr><th> Rank </th>" +
          "<th> Team </th>" +
          "<th> Wins </th>" +
          "<th> Losses </th>" +
          "<th> OTL </th>" +
          "<th> Points </th></tr>");

        $('#westStandings').append(
          "<tr><th> Rank </th>" +
          "<th> Team </th>" +
          "<th> Wins </th>" +
          "<th> Losses </th>" +
          "<th> OTL </th>" +
          "<th> Points </th></tr>");

        for(i = 0; i < 31; i++)
        {
          if(teams[i].conferenceRank.conferenceName == "Western") {
            ranksWest.push([teams[i].conferenceRank.rank, 
              teams[i].team.city + " " + teams[i].team.name,
              teams[i].stats.standings.wins,
              teams[i].stats.standings.losses,
              teams[i].stats.standings.overtimeLosses,
              teams[i].stats.standings.points,
            ]);
          }

          if(teams[i].conferenceRank.conferenceName == "Eastern") {
            ranksEast.push([teams[i].conferenceRank.rank, 
              teams[i].team.city + " " + teams[i].team.name,
              teams[i].stats.standings.wins,
              teams[i].stats.standings.losses,
              teams[i].stats.standings.overtimeLosses,
              teams[i].stats.standings.points,
            ]);
          }
        }
        ranksWest = ranksWest.sort((sort_by(0, false, parseInt)));
        ranksEast = ranksEast.sort((sort_by(0, false, parseInt)));
        for (var i = 0; i < ranksEast.length; i++) {
          $('#eastStandings').append(
            "<tr><td>"+ ranksEast[i][0] +"</td>" +
            "<td>"+ ranksEast[i][1] +"</td>" +
            "<td>"+ ranksEast[i][2] +"</td>" +
            "<td>"+ ranksEast[i][3] +"</td>" +
            "<td>"+ ranksEast[i][4] +"</td>" +
            "<td>" + ranksEast[i][5] + "</td></tr>");
          }
          //$('#eastStandings').append("</table>")

          for (var i = 0; i < ranksWest.length; i++) {
            $('#westStandings').append(
              "<tr><td>"+ ranksWest[i][0] +"</td>" +
              "<td>"+ ranksWest[i][1] +"</td>" +
              "<td>"+ ranksWest[i][2] +"</td>" +
              "<td>"+ ranksWest[i][3] +"</td>" +
              "<td>"+ ranksWest[i][4] +"</td>" +
              "<td>" + ranksWest[i][5] + "</td></tr>");
            }
            $('#westStandings').append(
              "<tr><td>**</td>" +
              "<td>****************</td>" +
              "<td>**</td>" +
              "<td>**</td>" +
              "<td>**</td>" +
              "<td>***</td></tr>");
      }
    });

    $.ajax(STATISTICS_URL, {
      type: "GET",
      url: STATISTICS_URL,
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa("e0fd2d70-d446-4f43-8535-1cc6d8" + ":" + "MYSPORTSFEEDS")
      },
      success: function (data) {
        let players = data.playerStatsTotals.map(post => post);
        $('#playerStatistics').append(
          "<tr><th> Rank </th>" +
          "<th onclick='sortLeaderTeamsOrNames(0)'> Team </th>" +
          "<th onclick='sortLeaderTeamsOrNames(8)'> Player </th>" +
          "<th onclick='sortLeaderIntegers(2)'> GP </th>" +
          "<th onclick='sortLeaderIntegers(3)'> Goals </th>" +
          "<th onclick='sortLeaderIntegers(4)'> Assists </th>" +
          "<th onclick='sortLeaderIntegers(5)'> Points </th>" +
          "<th onclick='sortLeaderIntegers(6)'> +/- </th>" +
          "<th onclick='sortLeaderIntegers(7)'> PIM </th></tr>");

        for(i = 0; i < players.length; i++){
          if(players[i].stats.gamesPlayed != 0){
            if(players[i].team != null && players[i].stats.skating != null){
              leaders.push([
                players[i].team.abbreviation,
                players[i].player.firstName + " " + players[i].player.lastName,
                players[i].stats.gamesPlayed,
                players[i].stats.scoring.goals,
                players[i].stats.scoring.assists,
                players[i].stats.scoring.points,
                players[i].stats.skating.plusMinus,
                players[i].stats.penalties.penaltyMinutes,
                players[i].player.lastName
              ]);
            }
          }
        }
        console.log(leaders);

        leaders = leaders.sort((sort_by(5, true, parseInt)));

        for (var i = 0; i < 100; i++) {
          $('#playerStatistics').append(
            "<tr><td>"+ (i + 1) +"</td>" +
            "<td>"+ leaders[i][0] +"</td>" +
            "<td>"+ leaders[i][1] +"</td>" +
            "<td>"+ leaders[i][2] +"</td>" +
            "<td>"+ leaders[i][3] +"</td>" +
            "<td>"+ leaders[i][4] +"</td>" +
            "<td>"+ leaders[i][5] +"</td>" +
            "<td>"+ leaders[i][6] +"</td>" +
            "<td>" + leaders[i][7] + "</td></tr>");
          }
      }
    });
});

var sort_by = function(field, reverse, primer){
  var key = primer ? 
      function(x) {return primer(x[field])} : 
      function(x) {return x[field]};
  reverse = !reverse ? 1 : -1;
  return function (a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    } 
}

function sortLeaderIntegers(id){
  leaders = leaders.sort((sort_by(id, true, parseInt)));
  $('#playerStatistics').empty();
  $('#playerStatistics').append(
    "<tr><th> Rank </th>" +
    "<th onclick='sortLeaderTeamsOrNames(0)'> Team </th>" +
    "<th onclick='sortLeaderTeamsOrNames(8)'> Player </th>" +
    "<th onclick='sortLeaderIntegers(2)'> GP </th>" +
    "<th onclick='sortLeaderIntegers(3)'> Goals </th>" +
    "<th onclick='sortLeaderIntegers(4)'> Assists </th>" +
    "<th onclick='sortLeaderIntegers(5)'> Points </th>" +
    "<th onclick='sortLeaderIntegers(6)'> +/- </th>" +
    "<th onclick='sortLeaderIntegers(7)'> PIM </th></tr>");
  for (var i = 0; i < 100; i++) {
    $('#playerStatistics').append(
      "<tr><td>"+ (i + 1) +"</td>" +
      "<td>"+ leaders[i][0] +"</td>" +
      "<td>"+ leaders[i][1] +"</td>" +
      "<td>"+ leaders[i][2] +"</td>" +
      "<td>"+ leaders[i][3] +"</td>" +
      "<td>"+ leaders[i][4] +"</td>" +
      "<td>"+ leaders[i][5] +"</td>" +
      "<td>"+ leaders[i][6] +"</td>" +
      "<td>" + leaders[i][7] + "</td></tr>");
    }
}

function sortLeaderTeamsOrNames(id){
  leaders = leaders.sort((sort_by(id, false, function(a){return a.toUpperCase()})));
  $('#playerStatistics').empty();
  $('#playerStatistics').append(
    "<tr><th onclick='sortLeaderTeamsOrNames(0)'> Team </th>" +
    "<th onclick='sortLeaderTeamsOrNames(8)'> Player </th>" +
    "<th onclick='sortLeaderIntegers(2)'> GP </th>" +
    "<th onclick='sortLeaderIntegers(3)'> Goals </th>" +
    "<th onclick='sortLeaderIntegers(4)'> Assists </th>" +
    "<th onclick='sortLeaderIntegers(5)'> Points </th>" +
    "<th onclick='sortLeaderIntegers(6)'> +/- </th>" +
    "<th onclick='sortLeaderIntegers(7)'> PIM </th></tr>");
  for (var i = 0; i <= leaders.length; i++) {
    $('#playerStatistics').append(
      "<tr><td>"+ leaders[i][0] +"</td>" +
      "<td>"+ leaders[i][1] +"</td>" +
      "<td>"+ leaders[i][2] +"</td>" +
      "<td>"+ leaders[i][3] +"</td>" +
      "<td>"+ leaders[i][4] +"</td>" +
      "<td>"+ leaders[i][5] +"</td>" +
      "<td>"+ leaders[i][6] +"</td>" +
      "<td>" + leaders[i][7] + "</td></tr>");
    }
}
