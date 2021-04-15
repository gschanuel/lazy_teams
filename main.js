// set

const interval = 290 //in seconds

// don't change after this line

const {powerMonitor} = require('electron'); 

var ks = require('node-key-sender');

function getIdle(){
  return powerMonitor.getSystemIdleTime();
};

function resetTime(){
  ks.sendKey('shift');
}

function getTimeout() {
  idle = getIdle();
  //console.log('System Idle for',idle,'seconds');
  if ( idle >= interval ) {
    resetTime();
    console.log('System Idle for',idle,'seconds. Reseting..');
    timeOut = interval + 5;
  }else{
    //console.log('... Not enough time to reset..');
    timeOut = (interval + 5 - idle);
    //console.log('Will set next check to',timeOut,'seconds');
  }
  //console.log('Next check in',timeOut,'seconds');
  setTimeout(getTimeout, timeOut*1000);
}

console.log('Started');
getTimeout();

