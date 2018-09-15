'use strict';
/*
** file: js/viewTabSource.js
** description: javascript code for "html/viewTabSource.html" page
*/
var j_data; /* { "tabs": [{"title":"theTitle", "url": "theUrl"}] }  */

function init_options () {
    console.log("viewTabSource.js::function::init_options() " + new Date());

    var tabNum = 0;
    if (location.search.length > 0)
    {
       if (isNaN(location.search[0]))
          tabNum = IAmWhatTab();
       else
          tabNum = location.search[0];
    }
    else
      tabNum = IAmWhatTab();
    console.log('tabNum = ' + tabNum);
    
    var workingTab = null;
    chrome.tabs.getAllInWindow(tabNum,function(tabs){workingTab = tabs[tabNum];});

    document.getElementById('main-about-text').innerText = 'Viewing Tab[' + tabNum + '] ' + workingTab.title;
    
    document.getElementById('tab_source').innerText = workingTab.document.innerHTML;

}

function IAmWhatTab()
{
    var tabNum = 0;
    chrome.tabs.getAllInWindow(null, function(tabs){
        for (var i = 0; i < tabs.length; i++) 
        {
            if (tabs[i].title == 'View Tab Source')
            {
                tabNum = i;
                break;
            }
        }
      });
    return tabNum;
}







//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_options);
console.log('viewTabSource.js eof');
