var synth;
document.querySelector('button').click();

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
let usableStanzaWidth = 770;
let usableStanzaStart = 110;
let beatsPerMinute = 120;
let BeatsPerSecond = beatsPerMinute / 60;
let wholeNoteMilliseconds = 1000 * 4 / BeatsPerSecond;
var devMode = false;
let noteID = 2;
let pixelOffset = 9;
let toSharp = true; // if false then flat
const xPositionPixelMultiplier = 5;
const XPaddingLeft = usableStanzaStart;
const xAdditionalLinePaddingLeft = -5;
let recordings = [];
const bottomOfBaseClefDistance = 270;
const bottomOfTrebbleClefDistance =  55;
const lineToNoteDistanceOffset = 53;
let sharpsAndFlatsKeyNumbers = [38,
                                40,
                                43,
                                45,
                                47,
                                50,
                                52,
                                55,
                                57,
                                59,
                                62,
                                64,
                                67,
                                69,
                                71,
                                74,
                                76,
                                79,
                                81,
                                83];
window.setInterval(updateStanza, updatePeriod);

function updateStanza(){
if(updateNumber % 128 === 0){
     //wipeStanza();
    }

 
  updateNumber += 1;

    notesPlaying.forEach(element => {

    if(element.newNote === true){
      let node = document.getElementById("staffDiv");
      node.innerHTML +='<div class="musicNoteDiv" id="musicNote'+element.noteID.toString()+'"'+'></div>';
      let noteHtmlElement = document.getElementById('musicNote'+element.noteID.toString());
      noteHtmlElement.style.display = "inline";
      noteHtmlElement.innerHTML = "&#x2669";
      //noteHtmlElement.style.fontSize = "xxx-large";
      noteHtmlElement.style.position = "absolute";
      noteHtmlElement.style.zIndex = element.noteID.toString();      
      noteHtmlElement.style.left =  (XPaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
      console.log(element.noteYLocation);
      noteHtmlElement.style.top = element.noteYLocation;
      element.newNote = false;
    
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
      // let needsTrebbleClefSecondFromTopHorizontal  = _needsTrebbleClefSecondFromTopHorizontal || false;
      // let needsTrebbleClefBottomHorizontal = _needsTrebbleClefBottomHorizontal || false;
      // let needsBaseClefTopHorizontal = _needsBaseClefTopHorizontal || false;
      // let needsBaseClefSecondFromBottonHorizontal = _needsBaseClefSecondFromBottonHorizontal || false;
      // let needsBaseClefBottomMostHorizontal 



      // <div class="trebbleclef-topmost-horizontal"></div>
      // <div class="trebbleclef-secondfromtop-horizontal"></div>
      // <div class="trebbleclef-bottom-horizontal"></div>

      // <div class="baseclef-top-horizontal"></div>
      // <div class="baseclef-secondfrombottom-horizontal"></div>
      // <div class="baseclef-bottommost-horizontal"></div>
      let leftposition = usableStanzaStart + BeatsPerSecond * usableStanzaWidth / 16 * updateNumber * updatePeriod / 1000;
      if(element.needsTrebbleClefTopMostHorizontal){
        node.innerHTML +='<div class="trebbleclef-topmost-horizontal" id="musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal"+'"'+'/>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal");
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
      
      }

      if(element.needsTrebbleClefSecondFromTopHorizontal){
        node.innerHTML +='<div class="trebbleclef-secondfromtop-horizontal" id="musicNote'+element.noteID.toString()+"TrebbleClefSecondFromTopHorizontal"+'"'+'/>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"TrebbleClefSecondFromTopHorizontal");      
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
 
      }
      console.log("adf");
      console.log(element.needsTrebbleClefBottomHorizontal);
      if(element.needsTrebbleClefBottomHorizontal){
        node.innerHTML +='<div class="trebbleclef-bottom-horizontal" id="musicNote'+element.noteID.toString()+"TrebbleClefBottomHorizontal"+'"'+'/>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"TrebbleClefBottomHorizontal");
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
         
      }

      if(element.needsBaseClefTopHorizontal ){
        node.innerHTML +='<div class="baseclef-top-horizontal" id="musicNote'+element.noteID.toString()+"BaseClefTopHorizontal"+'"'+'/>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"BaseClefTopHorizontal");
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
          
      }

      if(element.needsBaseClefSecondFromBottonHorizontal){
        node.innerHTML +='<div class="baseclef-secondfrombottom-horizontal" id="musicNote'+element.noteID.toString()+"BaseClefSecondFromBottonHorizontal"+'"'+'/>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"BaseClefSecondFromBottonHorizontal");
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
      
      }
     
      if(element.needsBaseClefBottomMostHorizontal ){
        node.innerHTML +='<div class="baseclef-bottommost-horizontal" id="musicNote'+element.noteID.toString()+"BaseClefBottomMostHorizontal"+'"'+'/>';
          let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"BaseClefBottomMostHorizontal");
          noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
          noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
        
      }
    
      // if(element.needsTrebbleClefTopMostHorizontal){
      //   node.innerHTML +='<div class="trebbleclef-topmost-horizontal" id="musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal"+'"'+'/>';
      //     let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal");
      //     noteLineThoughHTMLElement.style.position = "absolute";
      //     noteLineThoughHTMLElement.style.color = "black";
      //     noteLineThoughHTMLElement.style.borderStyle = "solid";
      //     noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
      //     noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
         
      // }

      // if(element.needsTrebbleClefTopMostHorizontal){
      //   node.innerHTML +='<div class="trebbleclef-topmost-horizontal" id="musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal"+'"'+'/>';
      //     let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal");
      //     noteLineThoughHTMLElement.style.position = "absolute";
      //     noteLineThoughHTMLElement.style.color = "black";
      //     noteLineThoughHTMLElement.style.borderStyle = "solid";
      //     noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
      //     noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
         
      // }

      // if(element.needsTrebbleClefTopMostHorizontal){
      //   node.innerHTML +='<div class="trebbleclef-topmost-horizontal" id="musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal"+'"'+'/>';
      //     let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal");
      //     noteLineThoughHTMLElement.style.position = "absolute";
      //     noteLineThoughHTMLElement.style.color = "black";
      //     noteLineThoughHTMLElement.style.borderStyle = "solid";
      //     noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
      //     noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
         
      // }

      // if(element.needsTrebbleClefTopMostHorizontal){
      //   node.innerHTML +='<div class="trebbleclef-topmost-horizontal" id="musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal"+'"'+'/>';
      //     let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal");
      //     noteLineThoughHTMLElement.style.position = "absolute";
      //     noteLineThoughHTMLElement.style.color = "black";
      //     noteLineThoughHTMLElement.style.borderStyle = "solid";
      //     noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
      //     noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
         
      // }

      //  if(element.needsTrebbleClefTopMostHorizontal){
      //   node.innerHTML +='<div class="trebbleclef-topmost-horizontal" id="musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal"+'"'+'/>';
      //     let noteLineThoughHTMLElement = document.getElementById('musicNote'+element.noteID.toString()+"TrebbleClefTopMostHorizontal");
      //     noteLineThoughHTMLElement.style.position = "absolute";
      //     noteLineThoughHTMLElement.style.color = "black";
      //     noteLineThoughHTMLElement.style.borderStyle = "solid";
      //     noteLineThoughHTMLElement.style.zIndex = element.noteID.toString();      
      //     noteLineThoughHTMLElement.style.left =  (3 + XPaddingLeft + xAdditionalLinePaddingLeft + xPositionPixelMultiplier * updateNumber).toString()  +'px';
         
      // }

 
      
 

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

      //context = new AudioContext();
      if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess({ sysex: true}).then( onMIDIInit, onMIDIReject );
      else
        alert("No MIDI support present in your browser.  You're gonna have a bad time.")

      // set up the basic oscillator chain, muted to begin with.
      /* oscillator = context.createOscillator();
      oscillator.frequency.setValueAtTime(110, 0);
      envelope = context.createGain();
      oscillator.connect(envelope);
      envelope.connect(context.destination);
      envelope.gain.value = 0.0;  // Mute the sound
      oscillator.start(0);  // Go ahead and start up the oscillator */
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
      console.log("am here");
      document.querySelector('button').click();
      // oscillator.frequency.cancelScheduledValues(0);
      // oscillator.frequency.setTargetAtTime( frequencyFromNoteNumber(noteNumber), 0, portamento );
      // envelope.gain.cancelScheduledValues(0);
      // envelope.gain.setTargetAtTime(1.0, 0, attack);
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
      synth.triggerAttackRelease("C4", "8n");
      //document.querySelector('button').click();
    }

// note = {value, velocity, starttime}    
var notesPlaying = []; 

  function useMIDImessageToMoveNotePosition(message, _isSharpOrFlat, _noteNameAsString, _alreadyManipulated, _needsTrebbleClefTopMostHorizontal,
    _needsTrebbleClefSecondFromTopHorizontal, _needsTrebbleClefBottomHorizontal, _needsBaseClefTopHorizontal,
    _needsBaseClefSecondFromBottonHorizontal,_needsBaseClefBottomMostHorizontal){
    if (message.data[2]==0){ // note off message
      let newDate = new Date();
      let noteEndTime = newDate.getTime();
      let noteThatJustFinished = notesPlaying.filter(note => note.key == message.data[1])[0];
      if(noteThatJustFinished == undefined) return console.log("note is already gone");
      let noteStartTime = noteThatJustFinished.date.getTime();
      let noteLength = noteEndTime - noteStartTime;
      console.log(noteLength);
      
      let noteId = noteThatJustFinished.noteID;
      let noteHtmlElement = document.getElementById('musicNote'+noteID.toString());
      if(noteHtmlElement == null) return ;
      

       
// 90 beats per minute -> 1.5 per second
// whole note should be 4 / (1.5) seconds = 2.67 = 2670 milliseconds
// get beats per minute -> convert to beats per second
// get time for whole note (4 / beats per second)
// then for each note find it's ratio fo whole note ie half note is whole note / 2
      
      console.log("noteLength");
      console.log(noteLength);
      console.log("wholeNotemilli")
      console.log(wholeNoteMilliseconds);
      
      if(noteLength < (wholeNoteMilliseconds * 1.5 / 64)){
        noteHtmlElement.innerHTML = "&#119139;"; // 64th note
        ;
      }
      else if((wholeNoteMilliseconds * .75 / 32 )< noteLength &&  noteLength < (wholeNoteMilliseconds * 1.5 / 32)){
        noteHtmlElement.innerHTML = "&#119138;" // 32nd note

      }
      else if(wholeNoteMilliseconds * .75 / 16 < noteLength && noteLength < wholeNoteMilliseconds * 1.5/ 16){
        noteHtmlElement.innerHTML = "&#119137;" // 16th note

      }
      else if(wholeNoteMilliseconds * .75 /8< noteLength  && noteLength < wholeNoteMilliseconds * 1.5/8){
        noteHtmlElement.innerHTML = "&#119136;" // 8th note

      }
      else if(wholeNoteMilliseconds * .75 /4 < noteLength  && noteLength < wholeNoteMilliseconds * 1.5/4){
        noteHtmlElement.innerHTML = "&#119135;" // quarter note

      }
      else if(wholeNoteMilliseconds * .75 /2< noteLength && noteLength < wholeNoteMilliseconds * 1.5/2){
        noteHtmlElement.innerHTML = "&#119134;" // half note

      }
      else if(  wholeNoteMilliseconds * .75 < noteLength && noteLength < wholeNoteMilliseconds * 1.5){
        noteHtmlElement.innerHTML = "&#119133;" // full note

      }
      else if(wholeNoteMilliseconds * .75 * 2 < noteLength && noteLength < wholeNoteMilliseconds * 1.5 *2){
        noteHtmlElement.innerHTML = "&#119132;" // double

      }
      else if(wholeNoteMilliseconds * .75 * 4 < noteLength  && noteLength < wholeNoteMilliseconds * 1.5 * 4){
        noteHtmlElement.innerHTML = "&#119131;" // quadruple

      }
      else{
        noteHtmlElement.innerHTML = "&#119130;" // 8times
      }

      

    }

    if (message.data[2]!==0) {  // if velocity != 0, this is a note-on message
        let key = message.data[1];
        let noteDistanceFromTop = 0;
      
        
        let isSharpOrFlat = _isSharpOrFlat || false;
        let noteNameAsString = _noteNameAsString || "";
        let alreadyManipulated = _alreadyManipulated || false;


        let needsTrebbleClefTopMostHorizontal = _needsTrebbleClefTopMostHorizontal || false;
        let needsTrebbleClefSecondFromTopHorizontal  = _needsTrebbleClefSecondFromTopHorizontal || false;
        let needsTrebbleClefBottomHorizontal = _needsTrebbleClefBottomHorizontal || false;
        let needsBaseClefTopHorizontal = _needsBaseClefTopHorizontal || false;
        let needsBaseClefSecondFromBottonHorizontal = _needsBaseClefSecondFromBottonHorizontal || false;
        let needsBaseClefBottomMostHorizontal = _needsBaseClefBottomMostHorizontal || false;
        
        // <div class="trebbleclef-topmost-horizontal"></div>
        // <div class="trebbleclef-secondfromtop-horizontal"></div>
        // <div class="trebbleclef-bottom-horizontal"></div>

        // <div class="baseclef-top-horizontal"></div>
        // <div class="baseclef-secondfrombottom-horizontal"></div>
        // <div class="baseclef-bottommost-horizontal"></div>
     
        if (sharpsAndFlatsKeyNumbers.includes(key-1)){
          key += toSharp? -1 : 1;
          isSharpOrFlat = true
        }
        else{
          isSharpOrFlat = false;
        }


        switch(key -1) {
          //first midi note
          case 37:
            needsBaseClefSecondFromBottonHorizontal = true;
            needsBaseClefBottomMostHorizontal = true;
            noteDistanceFromTop = bottomOfBaseClefDistance + 4*pixelOffset;
            break;

          case 38:
            isSharpOrFlat = true;
            break;

          case 39:
            needsBaseClefSecondFromBottonHorizontal = true;
            noteDistanceFromTop = bottomOfBaseClefDistance + 3*pixelOffset;
            break;

          case 40:
            isSharpOrFlat = true;
            break;

          case 41:
            needsBaseClefSecondFromBottonHorizontal= true;
            noteDistanceFromTop = bottomOfBaseClefDistance + 2*pixelOffset;
            break;

          case 42:
            needsBaseClefSecondFromBottonHorizontal = true;
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
            needsBaseClefTopHorizontal = true;
            noteDistanceFromTop = bottomOfBaseClefDistance - 9 * pixelOffset;
            break;

          case 61:
            needsTrebbleClefBottomHorizontal = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance + 2*pixelOffset;
            break;

          case 62:
            isSharpOrFlat = true;
            break;

          case 63: 
            needsTrebbleClefBottomHorizontal = true;
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
            needsTrebbleClefSecondFromTopHorizontal = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 9 * pixelOffset;
            break;

          case 81:
            isSharpOrFlat = true;
            break;

          case 82:
            needsTrebbleClefSecondFromTopHorizontal = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 10 * pixelOffset;
            break;

          case 83:
            isSharpOrFlat = true;
            break;

          case 84:
            needsTrebbleClefSecondFromTopHorizontal = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 11 * pixelOffset;
            break;

          case 85:
            needsTrebbleClefTopMostHorizontal  = true;
            needsTrebbleClefSecondFromTopHorizontal = true;
            noteDistanceFromTop = bottomOfTrebbleClefDistance - 12 * pixelOffset;
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
            noteID: noteID+=1,
            isSharpOrFlat: isSharpOrFlat,
            isOffStanza: {booleanCheck: false, extraLinesRequired: 0, landsInLine: false  },
            needsTrebbleClefTopMostHorizontal : needsTrebbleClefTopMostHorizontal || false,
            needsTrebbleClefSecondFromTopHorizontal  : needsTrebbleClefSecondFromTopHorizontal || false,
            needsTrebbleClefBottomHorizontal : needsTrebbleClefBottomHorizontal || false,
            needsBaseClefTopHorizontal : needsBaseClefTopHorizontal || false,
            needsBaseClefSecondFromBottonHorizontal : needsBaseClefSecondFromBottonHorizontal || false,
            needsBaseClefBottomMostHorizontal : needsBaseClefBottomMostHorizontal || false    };

        

  
        // console.log("hi");
        //   console.log(note.needsTrebbleClefTopMostHorizontal);
        notesPlaying.push(note);
        //   console.log(notesPlaying);
        // }
       
          
        //change html note position based on note
       
       
       
    }
    if (message.data[2]===0) {
      // hide note  
      notesPlaying = notesPlaying.filter(note => note.key !== message.data[1]);
      console.log(notesPlaying);
    } else {
      
    }
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

  function hideAllNotes(){
    wipeStanza();
  };


//   someObj.addEventListener('click', some_function(someVar));

// var some_function = function(someVar) {
//     return function curried_func(e) {
//         // do something here
//     }
// }



  
    
