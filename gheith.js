var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        gheith: null,
        query: '',
        url: 'cs439_f18_p3a',
        showBad: 'true',
        highlight: function(str, query) {
            // console.log("Highlighting: " + str + " : " + query);
            nonMatches = str.split(query);
            matches = str.match(new RegExp(query, "g"));
            output = ""
            var n = 0;
            var m = 0;
            if (matches == null) {
                matches = []
            }
            if (nonMatches == null) {
                nonMatches = []
            }
            // console.log(matches);
            // console.log(nonMatches);
            for (var i = 0; i < nonMatches.length + matches.length; i++) {
                if (str.startsWith(matches[m])) {
                    if (matches[m] == "") {
                        m++;
                    } else {
                        str = str.substring(matches[m].length);
                        output += "<mark>" + matches[m++] + "</mark>";
                    }
                } else {
                    str = str.substring(nonMatches[n].length);
                    output += nonMatches[n++]
                }
            }
            // console.log(output);

            return output;
        }
    }
});
var data;

var req;

function activateCollapsibles() {
    setTimeout(() => {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
        console.log(instances);
    }, 500);
}

function updateData() {
    data = JSON.parse(req.responseText);
    data.commitIds.splice(data.commitIds.indexOf(data.myCommitId), 1);
    data.commitIds.unshift(data.myCommitId);

    // console.log("Project id:" + data.projectId);
    // console.log(app);
    app.gheith = data;

    submissions = {}
        // create submission list
    for (var i = 0; i < data.commitIds.length; i++) {
        var curr = data.commitIds[i];
        submissions[curr] = { commitId: curr, numPass: 0, numFail: 0, numCleanFail: 0 }
    }

    app.bad = {};
    app.showBad = true;
    for (var i = 0; i < data.testIds.length; i++) {
        app.bad[data.testIds[i]] = { id: data.testIds[i], isBad: true };
    }

    for (var i = 0; i < data.results.length; i++) {
        var curr = data.results[i];
        if (curr.outcome) {
            app.bad[curr.test].isBad = false;
        }
    }
    console.log(app.bad);

    // populate results
    for (var i = 0; i < data.results.length; i++) {
        var curr = data.results[i];
        var sub = submissions[curr.commitId];
        sub[curr.test] = {
            outcome: curr.outcome
        }
        if (curr.outcome) {
            sub.numPass++;
        } else {
            sub.numFail++;
            if (!app.bad[curr.test].isBad) {
                sub.numCleanFail++;
            }
        }
    }
    app.submissions = submissions;
    activateCollapsibles();


}


function fetchData() {
    req = new XMLHttpRequest();
    req.addEventListener("load", updateData);
    // req.open("GET", "http://www.cs.utexas.edu/~gheith/cs439_f18_p3a.json");
    req.open("GET", "snapshot.json");
    req.send();
}
fetchData();