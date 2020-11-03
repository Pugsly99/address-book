//bussiness logic

//Logic for Address Book-----------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i = 0; i < this.contacts.length; i++)  {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// AddressBook.prototype.addressCounter = function(){
//   for (i=0; i< this.address.length; i++) {
//       if (this.address[i] == [0]) {
//         return address[i];
//       } else if (this.address[i] == [1]) {
//         return address[i];
//       }
//     }
// } 

//Logic for Contacts--------
function Address(workAddress, personalAddress){
  this.workAddress = workAddress;
  this.personalAddress = personalAddress; 
}

function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.address = []; 
}


Contact.prototype.addAddress = function(address) {
  this.address.push(address);
}


Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//user interface logic
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo= "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);

  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);

  contact.address.forEach(function (address){
    $(".address-home").html(address.personalAddress);
    $(".address-work").html(address.workAddress);
  });

  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class= 'deleteButton' id=" + contact.id + ">Delete</button>");
}



function attachContactListeners() {
  $("ul#contacts").on("click", "li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function(){
  attachContactListeners();
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email").val();
    const inputtedWorkAddress = $("input#new-workAddress").val();
    const inputtedPersonalAddress = $("input#new-personalAddress").val();
    let newAddress = new Address (inputtedWorkAddress, inputtedPersonalAddress)
    let newContact = new Contact (inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, newAddress);
    newContact.addAddress(newAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});