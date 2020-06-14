
//"use strict";

const updatePeriod = 62.5;
let updateNumber = 0;
let noteID = 2;
const xPositionPixelMultiplier = 5;
const XPaddingLeft = 150;
window.setInterval(updateStanza, updatePeriod);

function updateStanza(){
  
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
      noteHtmlElement.style.top = element.noteYLocation;
      element.newNote = false;
    }
    
  
  })
 


 

  if(updateNumber % 128 === 0){
    wipeStanza();
  }
};

function wipeStanza(){
  notesPlaying = [];
  updateNumber = 0;
  noteID = 2;
  staffDiv = document.getElementById("staffDiv");

  while (staffDiv.firstChild) {
    //The list is LIVE so it will re-index each call
   staffDiv.removeChild(staffDiv.firstChild);
}

}

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

  function useMIDImessageToMoveNotePosition(message){
    if (message.data[2]!==0) {  // if velocity != 0, this is a note-on message
        let key = message.data[1];
        let noteDistanceFromTop = 0;
        let pixelOffset = 8.75;
        let bottomOfBaseClefDistance = 270;
        let bottomOfTrebbleClefDistance =  61;
     
        switch(key) {
          case 44:
            noteDistanceFromTop = bottomOfBaseClefDistance;
            break;
          case 46:
            noteDistanceFromTop = bottomOfBaseClefDistance- pixelOffset;
            break;
          case 48:
            noteDistanceFromTop = bottomOfBaseClefDistance- 2 * pixelOffset;
            break;
          case 49:
            noteDistanceFromTop = bottomOfBaseClefDistance - 3 * pixelOffset;
            break;
          case 51:
            noteDistanceFromTop = bottomOfBaseClefDistance - 4 * pixelOffset;
            break;
          case 53:
            noteDistanceFromTop = bottomOfBaseClefDistance- 5 * pixelOffset;
            break;
          case 54:
            noteDistanceFromTop = bottomOfBaseClefDistance- 6 * pixelOffset;
            break;
          case 56:
            noteDistanceFromTop = bottomOfBaseClefDistance - 7 * pixelOffset;
            break;
          case 58:
            noteDistanceFromTop = bottomOfBaseClefDistance - 8 * pixelOffset;
            break;
          
          case 65:
            noteDistanceFromTop = bottomOfTrebbleClefDistance;
            break;
          case 66:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - pixelOffset;
            break;
          case 68:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 2*pixelOffset;
            break;
          case 70:
            noteDistanceFromTop = bottomOfTrebbleClefDistance -3*pixelOffset;
            break;
          case 72:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 4*pixelOffset;
            break;
          case 73:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 5*pixelOffset;
            break;
          case 75:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 6* pixelOffset;
            break;
          case 77:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 7 * pixelOffset;
            break;
          case 78:
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 8 * pixelOffset;
            break;
          default:
            break;
        } 
        // turn key into note

        let topDistanceAsStyleString = noteDistanceFromTop.toString() + "px";
        let note = {key: message.data[1], 
          velocity: message.data[2], 
          date: new Date(), 
          noteYLocation: topDistanceAsStyleString, 
          newNote: true, 
          noteID: noteID+=1};

        console.log(note);
        notesPlaying.push(note);
          
        //change html note position based on note
       
        //document.getElementById("musicNote1").style.top = topDistanceAsStyleString;
        //console.log(document.getElementById("musicNote1").style.top);
        console.log(notesPlaying);
    }
    else if (message.data[2]===0) {
      // hide note  
      notesPlaying = notesPlaying.filter(note => note.key !== message.data[1]);
      console.log(notesPlaying);
    } else {
      
    }
  }

  
    
