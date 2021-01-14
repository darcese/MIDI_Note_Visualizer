var devMode = false;
var recordings = [];

function hideAllNotes(){
  wipeStanza();
};

function createRecording(){
    
  console.log("creating recording");
  recording = [];
  const musicElements = document.getElementById("staffDiv").children;
  for(var i = 0; i < musicElements.length; i++){
    recording.push(musicElements[i]);
  }
  recordings.push(recording);
  createReplayRecordingButton();
};

function createReplayRecordingButton(){
  // 1. Create the button

  if (recordings.length == 1 ){
    var option = document.createElement("option");
    option.value = "Live";
    option.innerHTML = "Live";
    var node = document.getElementById("RecordingSelecter");
    node.appendChild(option);

    node.addEventListener('change', (event) => {      
      showRecording(parseInt(event.target.value)-1);
      console.log(parseInt(event.target.value));
     
});
  }
  var option = document.createElement("option");
  option.value = String(recordings.length);
  option.innerHTML = "Show Recording " + String(recordings.length);

// 2. Append somewhere
  var node = document.getElementById("RecordingSelecter");
  node.appendChild(option);

  var recordingsContainerDiv = document.getElementById("recordingsContainerDiv");
  recordingsContainerDiv.style.visibility = "visible";
// 3. Add event handler
 


/* Read 

https://css-tricks.com/use-button-element/
*/
};

function showRecording(recordingIndex){
  
  if (recordings[recordingIndex] === undefined ){return};
  wipeStanza();
  recording = recordings[recordingIndex];
  for(var i = 0; i < recording.length; i++){
    document.getElementById("staffDiv").appendChild(recording[i]);
  }
}




function wipeStanza(){
  if(devMode===false){
    notesPlaying = [];
    updateNumber = 0;
    noteID = 2;
    staffDiv = document.getElementById("staffDiv");
  
    // uncomment to clear the stanza again
    while (staffDiv.firstChild) {
    //   //The list is LIVE so it will re-index each call
   staffDiv.removeChild(staffDiv.firstChild);
  }
  
}};