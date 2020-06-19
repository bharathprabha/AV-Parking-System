import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import "./main.html";
import "./client.html";
Slot = new Mongo.Collection("parkingSlot");
ParkedHis = new Mongo.Collection("parkedHis");

Router.route("/", function () {
  this.render("Server");
});
Router.route("/client", function () {
  this.render("client");
});

var parkedHisId = "";
var slotIdStr = "";

Template.clientPanel.events({
  "click .js-req": function () {
    let data = Slot.findOne({ parkedStatus: "free" });
    // slotIdStr = data._id;
    if (data) {
      const carReg = document.getElementById("carReg").value;
      Slot.update(
        { _id: data._id },
        { $set: { parkedStatus: "wait", carName: carReg } }
      );
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      ParkedHis.insert({
        parkSlotId: data._id,
        carReg: carReg,
        reqTime: date,
        parkedTime: null,
        leaveTime: null,
      });
    } else {
      console.log("not available");
    }
  },
  "click .js-parked": function () {
    const carReg2 = document.getElementById("carReg").value;
    const data = Slot.findOne({ carName: carReg2 });
    if (data) {
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      const parkdata = ParkedHis.findOne({ carReg: carReg2 });
      Slot.update({ _id: data._id }, { $set: { parkedStatus: "parked" } });
      ParkedHis.update({ _id: parkdata._id }, { $set: { parkedTime: date } });
    } else {
      console.log("not available");
    }
  },
  "click .js-leave": function () {
    const carReg3 = document.getElementById("carReg").value;
    const data = Slot.findOne({ carName: carReg3 });
    if (data) {
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      const parkdata = ParkedHis.findOne({ carReg: carReg3 });
      Slot.update({ _id: data._id}, { $set: { parkedStatus: "free" } });
      ParkedHis.update({ _id: parkdata._id }, { $set: { leaveTime: date } });
    } else {
      console.log("not available");
    }
  },
});

Template.statusTable.helpers({
  getCarHisData: function () {
    return ParkedHis.find();
  },
});

Template.parkingSlot.helpers({
  slots: function () {
    return Slot.find();
  },
  checkSlot: function (data) {
    if (data == "free") {
      return true;
    }
    return false;
  },
  checkSlot2: function (data) {
    if (data == "wait") {
      return true;
    }
    return false;
  },
});
