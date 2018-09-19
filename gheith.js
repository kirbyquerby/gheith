var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        gheith: null,
        query: '',
        url: 'cs439_f18_p3a',
        highlight: function(str, query) {
            console.log("Highlighting: " + str + " : " + query);
            nonMatches = str.split(query);
            matches = str.match(new RegExp(query, "g"));
            output = ""
            var n = 0;
            var m = 0;
            console.log(matches);
            console.log(nonMatches);
            for (var i = 0; i < nonMatches.length + matches.length; i++) {
                if (str.startsWith(matches[m])) {
                    str = str.substring(matches[m].length);
                    output += "<mark>" + matches[m++] + "</mark>";
                } else {
                    str = str.substring(nonMatches[n].length);
                    output += nonMatches[n++]
                }
            }
            console.log(output);
            return output;
        }
    }
});
var data;

var req;

function updateData() {
    data = JSON.parse(req.responseText);
    console.log("Project id:" + data.projectId);
    console.log(app);
    app.gheith = data;

    submissions = {}
        // create submission list
    for (var i = 0; i < data.commitIds.length; i++) {
        var curr = data.commitIds[i];
        submissions[curr] = { commitId: curr }
    }

    // populate results
    for (var i = 0; i < data.results.length; i++) {
        var curr = data.results[i];
        submissions[curr.commitId][curr.test] = {
            outcome: curr.outcome
        }
    }
    app.submissions = submissions;


}


function fetchData() {
    req = new XMLHttpRequest();
    req.addEventListener("load", updateData);
    // req.open("GET", "http://www.cs.utexas.edu/~gheith/cs439_f18_p3a.json");
    req.open("GET", "snapshot.json");
    req.send();
}
fetchData();