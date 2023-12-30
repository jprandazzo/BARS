
// this script sets aria-labels to form elements to make auto-complete easier
let observer;
const purchaseButton = document.querySelector('.sqs-add-to-cart-button');

if (purchaseButton) {
  purchaseButton.addEventListener('click', () => {
    //on click, check whether DOM has been mutated, if so, setAriaLabels and then disconnect the observer
    observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList.contains('form-wrapper')) {
          setAriaLabels();
          observer.disconnect(); // Disconnect the observer after it has served its purpose
        }
      }
    });

    const observerConfig = { childList: true, subtree: true };
    observer.observe(document.body, observerConfig); // only start observing on a registration page (if purchaseButton exists)
  });
}

function setAriaLabels() {
  const inputs = {};
  const formParent = document.querySelector('.field-list.clear');  //parent object of all form elements
  // Iterate through child nodes of the form, grabbing all <input> tags under each form section, and assign them to "inputs"
  for (const formSection of formParent.children) { // think of formSection as each "row" in the form (visually)
    const sectionName = formSection.querySelector('.title').firstChild.nodeValue.trim(); // the text description for the field (e.g. "Preferred Name")
    const inputElements = Array.from(formSection.querySelectorAll('input')); // array of all input tags in that "row"
    inputs[sectionName] = inputElements;
  }

  /* inputs object will look like this:
  {
    "Preferred Name": [<input tag for first name>, <input tag for last name>],
    "Birthdate": [<input for MM>, <input for DD>, <input for YYYY>],
    etc
  }
  */

  // take each key, kebab-case it
Object.keys(inputs).forEach(name => {
    const key = name
      .replace(/[^\w\s]/gi, '')   // Remove special characters
    .toLowerCase()             // Convert to lowercase
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
  
  // get that key's value array and set aria-labels based on the key-name, numbered if array length is >1, e.g. birthdate-1, birthdate-2
    const tags = Object.values(inputs[name]);
    switch (tags.length) {
        case 1:
          tags[0].setAttribute('aria-label', key);
          break;
        
        case 0:
          break;
        
        default:
          Object.values(inputs[name]).forEach( (tag,i) => {
            tag.setAttribute('aria-label', `${key}-${i+1}`);
          });
      }
  })
}
