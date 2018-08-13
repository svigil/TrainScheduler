// Create html placeholders for what needs to be displayed
// Point to correct file for js
// Point ot correct jQuery
// Start with creating global vars
// Create functions needed
//  Within functions create local vars
//  Display what needs to happen within the function

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAmfIi01GeO5IhxkcgUMBCvARNSVWFPeqU",
    authDomain: "trainscheduler-41126.firebaseapp.com",
    databaseURL: "https://trainscheduler-41126.firebaseio.com",
    projectId: "trainscheduler-41126",
    storageBucket: "trainscheduler-41126.appspot.com",
    messagingSenderId: "748222603988"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
// 2. Button for adding Employees

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#Train-Name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = $("#First-Train-input").val().trim();
    var trainFreq = $("#Frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      start: trainStart,
      freq: trainFreq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#Train-Name-input").val("");
    $("#destination-input").val("");
    $("#First-Train-input").val("");
    $("#Frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);
  
  
    // Set freq
    var tFrequency = trainFreq;
    console.log(tFrequency);
  
   // Set time
   var firstTime = "03:30";
  

    // // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    moment(nextTrain).format("hh:mm");
    
    console.log(nextTrain);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(nextTrain),
      $("<td>").text(tRemainder),
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  





//   Example Time Math
//   -----------------------------------------------------------------------------
//   Assume Employee start date of January 1, 2015
  
  
//   Assume current date is March 1, 2016
  
//   We know that this is 15 months.
//   Now we will create code in moment.js to confirm that any attempt we use meets this test case