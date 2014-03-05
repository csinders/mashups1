google.load('search', '1');

      var imageSearch;

      // function addPaginationLinks() {
      
      //   // To paginate search results, use the cursor function.
      //   var cursor = imageSearch.cursor;
      //   var curPage = cursor.currentPageIndex; // check what page the app is on
      //   var pagesDiv = document.createElement('div');
      //   for (var i = 0; i < cursor.pages.length; i++) {
      //     var page = cursor.pages[i];
      //     if (curPage == i) { 

      //     // If we are on the current page, then don't make a link.
      //       var label = document.createTextNode(' ' + page.label + ' ');
      //       pagesDiv.appendChild(label);
      //     } else {

      //       // Create links to other pages using gotoPage() on the searcher.
      //       var link = document.createElement('a');
      //       link.href="/image-search/v1/javascript:imageSearch.gotoPage("+i+');';
      //       link.innerHTML = page.label;
      //       link.style.marginRight = '2px';
      //       pagesDiv.appendChild(link);
      //     }
      //   }

      //   var contentDiv = document.getElementById('content');
      //   contentDiv.appendChild(pagesDiv);
      // }

      function onUserEntry(searchTerm) {
      
        // Create an Image Search instance.
        imageSearch = new google.search.ImageSearch();
        imageSearch.setResultSetSize(8);

        // Set searchComplete as the callback function when a search is 
        // complete.  The imageSearch object will have results in it.
        imageSearch.setSearchCompleteCallback(this, searchComplete, null);

        // Find me a beautiful car.
        imageSearch.execute(searchTerm);
        
        // Include the required Google branding
        // google.search.Search.getBranding('branding');
      }
      //google.setOnLoadCallback(OnUserEntry);


      function searchComplete() {

        // Check that we got results
        if (imageSearch.results && imageSearch.results.length > 0) {

          // Grab our content div, clear it.
          var contentDiv = document.getElementById('content');
          contentDiv.innerHTML = '';

          // Loop through our results, printing them to the page.
          var results = imageSearch.results;
          console.log("----------------");
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            // For each result write it's title and image to the screen
            var result = results[i];
            var imgContainer = document.createElement('div');
           // var title = document.createElement('div');
            
            // We use titleNoFormatting so that no HTML tags are left in the 
            // title
           // title.innerHTML = result.titleNoFormatting;
            var newImg = document.createElement('img');

            // There is also a result.url property which has the escaped version
            newImg.src = result.url;
            //imgContainer.appendChild(title);
            imgContainer.appendChild(newImg);

            // Put our title + image in the content
            contentDiv.appendChild(imgContainer);
          }

          // Now add links to additional pages of search results.
          // addPaginationLinks(imageSearch);
        }
      }

var searchWikipedia = function(searchTerm){
  var url =  "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
  $.ajax({
    url: url + searchTerm,
    type: 'GET',
    dataType: 'jsonp',
    error: function(data){
      console.log("We got problems");
      console.log(data.status);
    },
    success: function(data){
      console.log("WooHoo!");
      //Check the browser console to see the returned data
      console.log(data);

      //Use jQuery to insert the search term into the appropriate DOM element
      //The data we want is the first item in the returned JSON, hence value "0"
      $("#searchTerm").html(data[0]);

      //The data we want is the second item in the returned JSON, hence value "1"
      //Create a var to save the array of search results 
      var searchResults = data[1];
      //Loop through the array of results
      for (var i = 0; i < searchResults.length; i++){
        //Use 'replace' and a regular expression to substitue white space with '_' character
        var resultTerms = searchResults[i].replace(/\s/g, '_');
        var curURL = 'http://en.wikipedia.org/wiki/' + resultTerms;
        //Use jQuery's append() function to add the searchResults to the DOM
        //The argument for the append function will be a string of HTML
        $("#searchTerm").append(
          "<p class='wikiResults'>" +
            "<a href=" + curURL + ">" +
              searchResults[i] +
            "</a>" +
          "</p>"
        );
      }
    }
  });
};


      $(document).ready(function(){
        $('#userEntryButton').click(function(){
          
          //get input box val
          var newSearchTerm = $("#input_box").val();
          console.log(newSearchTerm);
          //pass that term into the function as an argument
          onUserEntry(newSearchTerm);
          console.log("buttonclicked");
        });

    $("#userEntryButton").click(function(){
    console.log("Clicked search");
    //Use jQuery to get the value of the 'query' input box
    var newSearchTerm = $("#input_box").val();
    console.log(newSearchTerm);
    //Execute the Wikipedia API call with the 'newSearchTerm' string as its argument 
    searchWikipedia(newSearchTerm);
  });

  //What if someone just wants to click "ENTER"?
  //Use jQuery to assign a callback function when enter is pressed 
  //This will ONLY work when the 'query' input box is active
  $("#input_box").keypress(function(e){
    //If enter key is pressed
    if (e.which == 13){
      //Use jQuery's trigger() function to execute the click event
      $("#userEntryButton").trigger('click');
    }
  });
      });
