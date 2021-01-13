var Tone = require('tone');
var initialized = 0;

synth = new Tone.Synth().toDestination();

document.querySelector('button').addEventListener('click',  async() => {
    if(initialized === 0){
	await Tone.start();
    console.log('audio is ready');
    initialized ++;
    }else{
    //synth.triggerAttackRelease("C4", "8n");
    }
})



setTimeout(mimickClick, 1000);

function mimickClick(){
    document.querySelector('button').click();
    console.log("mimick click happened");
}

