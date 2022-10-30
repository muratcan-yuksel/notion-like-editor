//import necessary html elements
import basicBlocks from "./basicBlocks.js";

//append elements to the modal
basicBlocks.forEach((item) => {
  const block = document.createElement(item.block.type);
  block.classList.add(item.block.class);
  block.id = item.block.id;
  block.textContent = item.block.para;

  document.getElementById("basicBlocks").appendChild(block);
});

//basic blocks append logic ends

//unique id function
const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

//define helper variables

const modal_container = document.getElementById("modal_container");
const modal = document.getElementById("modal");
let modalOpen = false;
//returns a nodelist of all the elements with the class name of "listItem"
const listItems = document.querySelectorAll(".listItem");
let currentInputFieldById;
let modalItemById;

const inputWrapper = document.querySelector(".inputWrapper");

//start with focusing to the first element
document.getElementById("0").focus();

function keydownFunction(event) {
  let x = event.which;

  if (x == 111) {
    // event.preventDefault();
    console.log("You pressed the '/' key!");
    modal_container.classList.add("show");
    modalOpen = true;
    console.log(modalOpen);
  } else if (x == 8) {
    modal_container.classList.remove("show");
    console.log("back");
    deleteInputField();
  }
  //when modal is closed and enter is clicked without the shift key
  else if (modalOpen == false && event.shiftKey == false && x == 13) {
    console.log("enter");
    createInputField();
    inputField = document.querySelectorAll(".inputField");
    addKeydownFunctionToInputFields();
  }
  //what you do here, do the same with clicked version
  else if (modalOpen == true && x == 13) {
    console.log("modal open and enter");
    createNewElement();
    //ok I have no idea why but this is indispensable here
    inputField = document.querySelectorAll(".inputField");
    addKeydownFunctionToInputFields();
  }
}

const newElementAttributes = (
  elementType,
  elementClass,
  elementPlaceholder,
  elementClassTwo
) => {
  const newinputField = document.createElement(elementType);
  newinputField.classList.add(elementClass, elementClassTwo);
  newinputField.setAttribute("id", uid());
  newinputField.setAttribute("type", "text");
  newinputField.contentEditable = "true";
  newinputField.setAttribute("placeholder", elementPlaceholder);
  inputWrapper.appendChild(newinputField);
  //add focus to the newly created input field and get the id of the focused element
  newinputField.focus();
  console.log(newinputField.id);
  currentInputFieldById = newinputField.id;
};

//create a new input field and append it to the inputWrapper class
function createInputField() {
  newElementAttributes("div", "inputField");
  modal_container.classList.remove("show");
  addKeydownFunctionToInputFields();
}

function createNewElement() {
  console.log(modalItemById);
  if (modalItemById == "itemH1") {
    newElementAttributes("h1", "inputField", "Heading 1");
  } else if (modalItemById == "itemH2") {
    newElementAttributes("h2", "inputField", "Heading 2");
  } else if (modalItemById == "itemH3") {
    newElementAttributes("h3", "inputField", "Heading 3");
  } else if (modalItemById == "itemText") {
    newElementAttributes("p", "inputField", "Type '/' for commands");
  } else if (modalItemById == "itemQuote") {
    newElementAttributes("p", "inputField", "Empty quote", "quotes");
  }
  // const elementType=
  modal_container.classList.remove("show");
}

//get input fields here specifically for the keydown function to be attached
let inputField = document.querySelectorAll(".inputField");
//add the modal opening keydown function to each individual input field
function addKeydownFunctionToInputFields() {
  inputField.forEach((input) => {
    input.addEventListener("keydown", keydownFunction);
    input.addEventListener("click", getId);
    //trying to make it work for the mobile devices
    input.addEventListener("input", mobileKeydown);

    function mobileKeydown() {
      if (input.textContent.includes("/")) {
        modal_container.classList.add("show");
        modalOpen = true;
        addKeydownFunctionToInputFields;
        //the following else if doesn't work
        //because textContent isn't only "/" but also contains a break line
      } else if (input.textContent.includes("/") && input.textContent == "/") {
        modal_container.classList.add("show");
        modalOpen = true;
        input.textContent = "";
        addKeydownFunctionToInputFields;
      }
    }

    console.log(input);
    // console.log(Array.from(inputField).indexOf(input));
  });
  console.log(inputField);
}

addKeydownFunctionToInputFields();

//get the id of the clicked input field
function getId() {
  let id = this.id;
  console.log(id);
  console.log(this.className);
  currentInputFieldById = id;
  handleChosenElementPlaceholder();
}

function handleChosenElementPlaceholder() {
  let chosenElement = document.getElementById(currentInputFieldById);
  if (chosenElement.innerHTML == "Type '/' for commands") {
    chosenElement.innerHTML = "";
  } else if (chosenElement.innerHTML != "Type '/' for commands") {
    return;
  }
  chosenElement.classList.remove("inputBeforeClick");
}

//close modal if escape key is clicked
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal_container.classList.remove("show");
  }
});

//delete input field if backspace is clicked and there is no text in the input field
function deleteInputField() {
  console.log(currentInputFieldById);
  const currentNodeChild = document.getElementById(currentInputFieldById);
  let prevSibling = currentNodeChild.previousElementSibling;
  console.log(currentNodeChild);
  // //remove the current input field
  console.log(currentNodeChild.textContent.length);

  if (currentNodeChild.textContent.length == 0 && currentInputFieldById != 0) {
    console.log(currentNodeChild.previousElementSibling.id);
    prevSibling.focus();
    currentNodeChild.remove();
    currentInputFieldById = prevSibling.id;
  }
  // currentNodeChild.previousSibling.textContent = "Theeeee";
  // currentNodeChild.remove();
}

//close modal if clicked outside of modal
document.body.addEventListener("click", (e) => {
  console.log("body");
  if (e.target != modal) {
    modal_container.classList.remove("show");
    modalOpen = false;
  }
});

// item id is a global variable
let itemId;
//for each list item, add an event listener that eventually returns the id of the list item
//wherever its clicked, the function will look for the appropriate parent element to get the id
listItems.forEach((item) => {
  console.log(item);
  item.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("listItemTitle") ||
      e.target.classList.contains("listItemPara")
    ) {
      console.log(e.target.parentElement.parentElement.id);
      itemId = e.target.parentElement.parentElement.id;
    } else if (
      e.target.classList.contains("listItemDivider") ||
      e.target.classList.contains("icon")
    ) {
      console.log(e.target.parentElement.id);
      itemId = e.target.parentElement.id;
    } else {
      console.log(e.target.id);
      itemId = e.target.id;
    }
    console.log(itemId + " is item id");
    modalItemById = itemId;
    modal_container.classList.remove("show");
    createNewElement();
    inputField = document.querySelectorAll(".inputField");
    addKeydownFunctionToInputFields();
  });
});
