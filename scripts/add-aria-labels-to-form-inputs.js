
// this script sets aria-labels to form elements to make auto-complete easier
let observer;
const purchaseButton = document.querySelector('.sqs-add-to-cart-button');

if (purchaseButton) {
  purchaseButton.addEventListener('click', () => {
    // waits for Purchase to be clicked before running the observer, could remove but might slow performance, idk
    observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList.contains('form-wrapper')) {
          setAriaLabels();
          observer.disconnect(); // Disconnect the observer after it has served its purpose
        }
      }
    });

    const observerConfig = { childList: true, subtree: true };
    observer.observe(document.body, observerConfig);
  });
}

function setAriaLabels() {
  const inputs = {};
  const formParent = document.querySelector('.field-list.clear'); 
  // Iterate through child nodes of the form, grabbing all <input> tags under each form section, and assign them to "inputs"
  for (const formSection of formParent.children) {
    const sectionName = formSection.querySelector('.title').firstChild.nodeValue.trim();
    const inputElements = Array.from(formSection.querySelectorAll('input'));
    inputs[sectionName] = inputElements;
  }

  // set an aria-label for each element, which is the kebab-cased key name from the inputs object with its index (+1 since index starts at 0)
Object.keys(inputs).forEach(name => {
    const key = name
      .replace(/[^\w\s]/gi, '')   // Remove special characters
    .toLowerCase()             // Convert to lowercase
    .replace(/\s+/g, '-')      // Replace spaces with hyphens

    const tags = Object.values(inputs[name]);
    if (tags.length > 1) {
      Object.values(inputs[name]).forEach( (tag,i) => {
        tag.setAttribute('aria-label', `${key}-${i+1}`)
      })
    } else tags[0].setAttribute('aria-label', key)
  })
}
