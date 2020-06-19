import { Meteor } from 'meteor/meteor';
Slot = new Mongo.Collection("parkingSlot");
ParkedHis = new Mongo.Collection("parkedHis");



Meteor.startup(() => {
  // code to run on server at startup
  
  if(!Slot.findOne()){
    var data ={
      carName : "",
      parkedStatus : "free",
      address : "xyz"
    }
    // const data2 ={
    //   parkSlotId : null,
    //   carReg : null,
    //   reqTime : null,
    //   parkedTime : null,
    //   leaveTime : null
    // }
    for(let i = 0; i<100 ; i++){
      Slot.insert(data);
    }
  }

});
