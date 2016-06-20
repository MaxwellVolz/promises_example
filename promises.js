function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            } else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}


get('data.json').then(function(response) {

    console.log("Success!", response);

    var json = $.parseJSON(response),
        content = document.getElementById("content");

    // ------------------------------------
    // Javascript version of DOM Appending
    // ------------------------------------
    json.map(function(obj){
        var node = document.createElement("LI");
        var textnode = document.createTextNode(obj.name); 
        node.appendChild(textnode);

        content.appendChild(node);
    })

    // ------------------------------------
    // jQuery version of DOM Appending
    // ------------------------------------
    // $.each(json, function(index, value) {
    //     console.log("Name is: " + value.name);

    //     $('body').append('<h2>' + value.name + '</h2>');
    // });

    
}, function(error) {
    console.error("Failed!", error);

    var node = document.createElement("LI"),
        textnode = document.createTextNode(error); 

    node.appendChild(textnode);
    content.appendChild(node);

});
