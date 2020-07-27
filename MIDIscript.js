
//"use strict";



// console.log(sharpsOrFlatsOption.length);
// for (i = 0; i < sharpsOrFlatsOption.length; i++) {
//     self =  sharpsOrFlatsOption[i];
//     sharpsOrFlatsOption[i].addEventListener('change',  () => {
//     () => {SharpsOrFlatsNow = this.value;
//             console.log(SharpsOrFlatsNow)}();      
//     })
  
//   }

var SharpsOrFlatsNow = "Sharps";
const sharpsOption = document.getElementById("radioSharps")
sharpsOption.addEventListener('change', () => {
  sharpsOption.checked == true ? SharpsOrFlatsNow = "Sharps" :  SharpsOrFlatsNow = "Flats";
  console.log(SharpsOrFlatsNow);
})
// for some reason the change event only fires when the radio goes from checked
// to unchecked. which it also fired when it went from unchecked to checked so i wouldnt
// have both of these
const flatsOption = document.getElementById("radioFlats")
flatsOption.addEventListener('change', () => {
  flatsOption.checked == true ? SharpsOrFlatsNow = "Flats" :  SharpsOrFlatsNow = "Sharps";
  console.log(SharpsOrFlatsNow);
})


const updatePeriod = 62.5;
let updateNumber = 0;
let devMode = false;
let noteID = 2;
let pixelOffset = 8.75;
let toSharp = true; // if false then flat
const xPositionPixelMultiplier = 5;
const XPaddingLeft = 150;
let recordings = [];

window.setInterval(updateStanza, updatePeriod);

function updateStanza(){
if(updateNumber % 128 === 0){
      wipeStanza();
    }

 
  updateNumber += 1;

    notesPlaying.forEach(element => {

    if(element.newNote === true){
      let node = document.getElementById("staffDiv");
      node.innerHTML +='<div class="musicNoteDiv" id="musicNote'+element.noteID.toString()+'"'+'></div>';
      let noteHtmlElement = document.getElementById('musicNote'+element.noteID.toString());
      noteHtmlElement.style.display = "inline";
      noteHtmlElement.innerHTML = "&#x2669";
      noteHtmlElement.style.fontSize = "xxx-large";
      noteHtmlElement.style.position = "absolute";
      noteHtmlElement.style.zIndex = element.noteID.toString();      
      noteHtmlElement.style.left =  (XPaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
      console.log(element.noteYLocation);
      noteHtmlElement.style.top = element.noteYLocation;
      element.newNote = false;

    //   .sharp {
    //     font-size: large;
    //     position: absolute;
    //     left: 425px;
    //     top: 288px;
    // }
    // #musicNote3{
    //     left: 429px; top: 250px;
    // }
    
    
    
    // .flat {
    //     font-size: large;
    //     position: absolute;
    //     left: 425px;
    //     top: 335px;
    // }
    // #musicNote4{
    //     left: 429px; top: 300px;
    // }
    
      if (element.isSharpOrFlat){
        if(SharpsOrFlatsNow == "Sharps"){
          node.innerHTML +='<div class="musicNoteSharpDiv" id="musicNote'+element.noteID.toString()+"sharp"+'"'+'></div>';
          let noteSharpHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"sharp");
          noteSharpHTMLElement.style.fontSize = "large";
          noteSharpHTMLElement.style.position = "absolute";
          noteSharpHTMLElement.innerHTML = "&#9839";      
          noteSharpHTMLElement.style.zIndex = element.noteID.toString();      
          noteSharpHTMLElement.style.left =  (-4 + XPaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
          noteSharpHTMLElement.style.top = (parseInt(element.noteYLocation.replace("px","")) + 38).toString() + 'px';
         
        }
        else if (SharpsOrFlatsNow == "Flats") {
          node.innerHTML +='<div class="musicNoteFlatDiv" id="musicNote'+element.noteID.toString()+"flat"+'"'+'></div>';
          let noteSharpHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"flat");
          noteSharpHTMLElement.style.fontSize = "large";
          noteSharpHTMLElement.style.position = "absolute";
          noteSharpHTMLElement.innerHTML = "&#9837";      
          noteSharpHTMLElement.style.zIndex = element.noteID.toString();      
          noteSharpHTMLElement.style.left =  (-4 + XPaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
          noteSharpHTMLElement.style.top = (parseInt(element.noteYLocation.replace("px","")) + 36).toString() + 'px';
         
        } 
         
      }

      

    //   hr{
    //     position: absolute;
    //     width: 32px;
    //     left: 432px;
    //     top: 185px;
    //     color: black;
    //     border-style: solid;
    // }
      if(element.needsLineThroughMiddle){
        node.innerHTML +='<hr class="musicNoteLineThrough" id="musicNote'+element.noteID.toString()+"horizontalRule"+'"'+'>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"horizontalRule");
          noteLineThoughHTMLElement.style.width= "32px";
          noteLineThoughHTMLElement.style.position = "absolute";
          noteLineThoughHTMLElement.style.color = "black";
          noteLineThoughHTMLElement.style.borderStyle = "solid";
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
          noteLineThoughHTMLElement.style.top = (parseInt(element.noteYLocation.replace("px","")) + 35).toString() + 'px';
         
      }

      if(element.needsLineBelow){
        node.innerHTML +='<hr class="musicNoteLineBelow" id="musicNote'+element.noteID.toString()+"horizontalRuleBelow"+'"'+'>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"horizontalRuleBelow");
          noteLineThoughHTMLElement.style.width= "32px";
          noteLineThoughHTMLElement.style.position = "absolute";
          noteLineThoughHTMLElement.style.color = "black";
          noteLineThoughHTMLElement.style.borderStyle = "solid";
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
          noteLineThoughHTMLElement.style.top = (parseInt(element.noteYLocation.replace("px","")) + 35 + 2* pixelOffset).toString() + 'px';
          if(element.needsLineThroughMiddle === false){
            noteLineThoughHTMLElement.style.top = (parseInt(element.noteYLocation.replace("px","")) + 35 + 1* pixelOffset).toString() + 'px';
          }      
      }

      if(element.needsLineAbove){
        node.innerHTML +='<hr class="musicNoteLineAbove" id="musicNote'+element.noteID.toString()+"horizontalRuleAbove"+'"'+'>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"horizontalRuleAbove");
          noteLineThoughHTMLElement.style.width= "32px";
          noteLineThoughHTMLElement.style.position = "absolute";
          noteLineThoughHTMLElement.style.color = "black";
          noteLineThoughHTMLElement.style.borderStyle = "solid";
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
          noteLineThoughHTMLElement.style.top = (parseInt(element.noteYLocation.replace("px","")) + 35 - 2* pixelOffset).toString() + 'px';
          if(element.needsLineThroughMiddle === false){
            noteLineThoughHTMLElement.style.top = (parseInt(element.noteYLocation.replace("px","")) + 35 - 1* pixelOffset).toString() + 'px';
          }
      }
      // FOR CHECKING IF SHARPS OR FLATS ARE SELECTED
      // const form = document.forms.demo;
      // const checked = form.querySelector('input[name=characters]:checked'); 
      // // log out the value from the :checked radio
      // console.log(checked.value);

    

      

      // FOR CHECKING IF SHARPS OR FLATS ARE SELECTED
      // const form = document.forms.demo;
      // const checked = form.querySelector('input[name=characters]:checked'); 
      // // log out the value from the :checked radio
      // console.log(checked.value);

    }
    
    
  
  })};
 


 




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



var context=null;   // the Web Audio "context" object
    var midiAccess=null;  // the MIDIAccess object.
    var oscillator=null;  // the single oscillator
    var envelope=null;    // the envelope for the single oscillator
    var attack=0.05;      // attack speed
    var release=0.05;   // release speed
    var portamento=0.05;  // portamento/glide speed
    var activeNotes = []; // the stack of actively-pressed keys

    window.addEventListener('load', function() {
      // patch up prefixes
      window.AudioContext=window.AudioContext||window.webkitAudioContext;

      context = new AudioContext();
      if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess({ sysex: true}).then( onMIDIInit, onMIDIReject );
      else
        alert("No MIDI support present in your browser.  You're gonna have a bad time.")

      // set up the basic oscillator chain, muted to begin with.
      oscillator = context.createOscillator();
      oscillator.frequency.setValueAtTime(110, 0);
      envelope = context.createGain();
      oscillator.connect(envelope);
      envelope.connect(context.destination);
      envelope.gain.value = 0.0;  // Mute the sound
      oscillator.start(0);  // Go ahead and start up the oscillator
    } );

    function onMIDIInit(midi) {
      midiAccess = midi;

      var haveAtLeastOneDevice=false;
      var inputs=midiAccess.inputs.values();
      for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = MIDIMessageEventHandler;

        console.log("hello midi world")
        haveAtLeastOneDevice = true;
      }
      if (!haveAtLeastOneDevice)
        alert("No MIDI input devices present.  You're gonna have a bad time.");
    }

    function onMIDIReject(err) {
      alert("The MIDI system failed to start.  You're gonna have a bad time.");
    }

    function MIDIMessageEventHandler(event) {
      // log message data
      onMIDIMessage(event);
      useMIDImessageToMoveNotePosition(event);
      

      // Mask off the lower nibble (MIDI channel, which we don't care about)
      // switch (event.data[0] & 0xf0) {
      //   case 0x90:
      //     if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
      //       noteOn(event.data[1]);
      //       return;
      //     }
      //     // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      //   case 0x80:
      //     noteOff(event.data[1]);
      //     return;
      //}

      
    }

    function frequencyFromNoteNumber( note ) {
      return 440 * Math.pow(2,(note-69)/12);
    }

    function noteOn(noteNumber) {
      activeNotes.push( noteNumber );
      oscillator.frequency.cancelScheduledValues(0);
      oscillator.frequency.setTargetAtTime( frequencyFromNoteNumber(noteNumber), 0, portamento );
      envelope.gain.cancelScheduledValues(0);
      envelope.gain.setTargetAtTime(1.0, 0, attack);
    }

    function noteOff(noteNumber) {
      var position = activeNotes.indexOf(noteNumber);
      if (position!=-1) {
        activeNotes.splice(position,1);
      }
      if (activeNotes.length==0) {  // shut off the envelope
        envelope.gain.cancelScheduledValues(0);
        envelope.gain.setTargetAtTime(0.0, 0, release );
      } else {
        oscillator.frequency.cancelScheduledValues(0);
        oscillator.frequency.setTargetAtTime( frequencyFromNoteNumber(activeNotes[activeNotes.length-1]), 0, portamento );
      }
    }

    const onMIDIAccess = (midiAccessObject) => {
      let inputs = midiAccessObject.inputs.values()
      for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage
      }  
    }
    
    const onMIDIMessage = (message) => {
      console.log(`Raw MIDI message data: ${message.data}`)
    }

// note = {value, velocity, starttime}    
var notesPlaying = []; 

  function useMIDImessageToMoveNotePosition(message, _isSharpOrFlat, _noteNameAsString, _alreadyManipulated, _needsLineThroughMiddle,
    _needsLineAbove, _needsLineBelow){
    if (message.data[2]!==0) {  // if velocity != 0, this is a note-on message
        let key = message.data[1];
        let noteDistanceFromTop = 0;
        let pixelOffset = 9.25;
        let bottomOfBaseClefDistance = 292;
        let bottomOfTrebbleClefDistance =  69;
        let isSharpOrFlat = _isSharpOrFlat || false;
        let noteNameAsString = _noteNameAsString || "";
        let alreadyManipulated = _alreadyManipulated || false;
        let needsLineThroughMiddle = _needsLineThroughMiddle || false;
        let needsLineAbove = _needsLineAbove || false;
        let needsLineBelow = _needsLineBelow || false;
     
        switch(key -1) {
          //first midi note
          case 37:
            needsLineThroughMiddle = true;
            needsLineAbove = true;
            noteDistanceFromTop = bottomOfBaseClefDistance + 4*pixelOffset;
            break;

          case 38:
            isSharpOrFlat = true;
            break;

          case 39:
            needsLineAbove = true;
            noteDistanceFromTop = bottomOfBaseClefDistance + 3*pixelOffset;
            break;

          case 40:
            isSharpOrFlat = true;
            break;

          case 41:
            needsLineThroughMiddle = true;
            noteDistanceFromTop = bottomOfBaseClefDistance + 2*pixelOffset;
            break;

          case 42:
            needsLineBelow = true;
            noteDistanceFromTop = bottomOfBaseClefDistance + 1*pixelOffset;
            break;

          case 43:
            isSharpOrFlat = true;
            break;

          case 44:
            noteDistanceFromTop = bottomOfBaseClefDistance;
            break;

          case 45:
            isSharpOrFlat = true;
            break;
          
          case 46:
            noteDistanceFromTop = bottomOfBaseClefDistance- pixelOffset;
            break;

          case 47:
            isSharpOrFlat = true;
            break;

          case 48:
            noteDistanceFromTop = bottomOfBaseClefDistance- 2 * pixelOffset;
            break;

          case 49:
            noteDistanceFromTop = bottomOfBaseClefDistance - 3 * pixelOffset;
            break;

          case 50:
            isSharpOrFlat = true;
            break;

          case 51:
            noteDistanceFromTop = bottomOfBaseClefDistance - 4 * pixelOffset;
            break;

          case 52:
            isSharpOrFlat = true;
            break;

          case 53:
            noteDistanceFromTop = bottomOfBaseClefDistance- 5 * pixelOffset;
            break;

          case 54:
            noteDistanceFromTop = bottomOfBaseClefDistance- 6 * pixelOffset;
            break;

          case 55:
            isSharpOrFlat = true;
            break;

          case 56:
            noteDistanceFromTop = bottomOfBaseClefDistance - 7 * pixelOffset;
            break;

          case 57:
            isSharpOrFlat = true;
            break;

          case 58:
            noteDistanceFromTop = bottomOfBaseClefDistance - 8 * pixelOffset;
            break;
          
          case 59:
            isSharpOrFlat = true;
            break;

          case 60:
            needsLineAbove = true;
            noteDistanceFromTop = bottomOfBaseClefDistance - 9 * pixelOffset;
            break;

          case 61:
            needsLineThroughMiddle = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance + 2*pixelOffset;
            break;

          case 62:
            isSharpOrFlat = true;
            break;

          case 63: 
            needsLineBelow = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance + pixelOffset;
            break;

          case 64:
            isSharpOrFlat = true;
            break;

          case 65:
            noteDistanceFromTop = bottomOfTrebbleClefDistance;
            break;

          case 66:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - pixelOffset;
            break;

          case 67:
            isSharpOrFlat = true;
            break;

          case 68:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 2*pixelOffset;
            break;

          case 69:
            isSharpOrFlat = true;
            break;

          case 70:
            noteDistanceFromTop = bottomOfTrebbleClefDistance -3*pixelOffset;
            break;

          case 71:
            isSharpOrFlat = true;
            break;

          case 72:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 4*pixelOffset;
            break;

          case 73:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 5*pixelOffset;
            break;
         
          case 74:
            isSharpOrFlat = true;
            break;

          case 75:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 6* pixelOffset;
            break;
         
          case 76:
            isSharpOrFlat = true;
            break;

          case 77:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 7 * pixelOffset;
            break;

          case 78:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 8 * pixelOffset;
            break;

          case 79:
            isSharpOrFlat = true;
            break;

          case 80:
            needsLineAbove = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 9 * pixelOffset;
            break;

          case 81:
            isSharpOrFlat = true;
            break;

          case 82:
            needsLineThroughMiddle = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 10 * pixelOffset;
            break;

          case 83:
            isSharpOrFlat = true;
            break;

          case 84:
            needsLineBelow = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 11 * pixelOffset;
            break;

          case 85:
            needsLineThroughMiddle = true;
            needsLineBelow = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 12 * pixelOffset;
            break;
     
          default:
            break;
        } 

        if(isSharpOrFlat && !alreadyManipulated){
           // manipulate message to add the sharp or flat but put key in non-special location
           var manipulatedMessage = message;
           manipulatedMessage.data[1] += (toSharp? -1 : 1);

           //message, _isSharpOrFlat, _noteNameAsString, _alreadyManipulated

           // _isSharpOrFlat, _noteNameAsString, _alreadyManipulated, _needsLineThroughMiddle,
    //_needsLineAbove, _needsLineBelow
           useMIDImessageToMoveNotePosition(manipulatedMessage, true, "", true, needsLineThroughMiddle, _needsLineAbove, _needsLineBelow);
        }
        // turn key into note

        else{
          let topDistanceAsStyleString = noteDistanceFromTop.toString() + "px";
          let note = {key: message.data[1], 
            velocity: message.data[2], 
            date: new Date(), 
            noteYLocation: topDistanceAsStyleString, 
            newNote: true, 
            noteID: noteID+=1,
            isSharpOrFlat: isSharpOrFlat,
            isOffStanza: {booleanCheck: false, extraLinesRequired: 0, landsInLine: false  },
            needsLineAbove: needsLineAbove,
            needsLineThroughMiddle: needsLineThroughMiddle,
            needsLineBelow: needsLineBelow,
        };

  
  
          console.log(note);
          notesPlaying.push(note);
          console.log(notesPlaying);
        }
       
          
        //change html note position based on note
       
        //document.getElementById("musicNote1").style.top = topDistanceAsStyleString;
        //console.log(document.getElementById("musicNote1").style.top);
       
    }
    else if (message.data[2]===0) {
      // hide note  
      notesPlaying = notesPlaying.filter(note => note.key !== message.data[1]);
      console.log(notesPlaying);
    } else {
      
    }
  }


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
    var button = document.createElement("button");
    button.innerHTML = "Show Recording" + String(recordings.length);

// 2. Append somewhere
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);

// 3. Add event handler
    const thisRecordingIndex = recordings.length - 1;
    button.addEventListener ("click", function() {
    console.log(thisRecordingIndex);
    showRecording(thisRecordingIndex);}
);

/* Read 

https://css-tricks.com/use-button-element/
*/
  };

  function showRecording(recordingIndex){
    
    recording = recordings[recordingIndex];
    for(var i = 0; i < recording.length; i++){
      document.getElementById("staffDiv").appendChild(recording[i]);
    }
  }

  function hideAllNotes(){
    wipeStanza();
  };


//   someObj.addEventListener('click', some_function(someVar));

// var some_function = function(someVar) {
//     return function curried_func(e) {
//         // do something here
//     }
// }



  
    
