'use strict';
/*
** file: js/chromeTabs.js
** description: javascript code for "html/chromeTabs.html" page
*/
var j_data; /* { "tabs": [{"title":"theTitle", "url": "theUrl"}] }  */

function init_options () {
    console.log("chromeTabs.js::function: init_options. " + new Date());
    toggleTab(0);

    //var stored_tabs = localStorage['stored_tabs'];
    // if (stored_tabs)
    // {
        var ul = document.createElement("ul");
        ul.setAttribute("id", "tabList");
        var json = "{ \"tabs\": ["; 
        chrome.tabs.getAllInWindow(null, function(tabs){
            for (var i = 0; i < tabs.length; i++) {
              console.log(tabs[i].title);

              var li = document.createElement('li');
              li.appendChild(document.createTextNode(tabs[i].title + " - "));
              var a = document.createElement('a');
              a.setAttribute('href', tabs[i].url);
              a.appendChild(document.createTextNode(tabs[i].url));
              li.appendChild(a);
              ul.appendChild(li);

              json += "\"title\": \"" + tabs[i].title + "\", " +
                      "\"url\": \"" + tabs[i].url + "\"}" +
                      ((i < tabs.length-1) ? ", ": " ");

            };
        });

        json += "]}";
console.log('3');
        console.log("json = " + json);
        document.getElementById('cDiv').appendChild(ul);
        var span = document.createElement('span');
        span.setAttribute("style", "display:none");
        span.appendChild(document.createTextNode(json));
        document.getElementById('cDiv').appendChild(span);
    //}
    
console.log('2');
}
console.log('1');

function display_tabs_from_json(elementID, json)
{
;
}

function save_options () {
    console.log("function: save_options");

    //favorite-movie-dropdown
    // var stored_tabs = document.getElementById('favorite-movie-dropdown').children[document.getElementById('favorite-movie-dropdown').selectedIndex].value;
    var stored_tabs = '';
    localStorage['stored_tabs'] = stored_tabs;
    console.log("stored_tabs = " + stored_tabs);
}

function restore_options() {
    console.log("function: restore_options");
}

function toggleTab(tabnum) {
    console.log("tabnum = " + tabnum);
    document.getElementById('CurrentTabsDiv').style.display = (tabnum==1?"none": "");
    document.getElementById('StoredTabsDiv').style.display = (tabnum==0?"none": "");
    document.getElementById('CurrentTabsBtn').className = (tabnum==1?"controls": "controls active");
    document.getElementById('StoredTabsBtn').className = (tabnum==0?"controls": "controls active");
}


//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_options);
document.querySelector('#save-options-button').addEventListener('click', save_options);
document.querySelector('#restore-options-button').addEventListener('click', restore_options);
document.getElementById('CurrentTabsBtn').addEventListener('click', function(){toggleTab(0);});
document.getElementById('StoredTabsBtn').addEventListener('click', function(){toggleTab(1);});
console.log('eof');
