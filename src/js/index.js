import Parent from './parent';

// Declaration of custom element inheriting from HTMLElement
class XProduct extends HTMLElement {
    constructor() {
        super();
        this.padre = new Parent();
    }

    connectedCallback() {
        // Creating shadowroot
        this.shadow = this.attachShadow({mode: 'open'});

        // CReating an img element and assigning values
        this.div = document.createElement('div'); 
        this.div.id = 'results';
        // we append the img to  shadow root.
        this.shadow.appendChild(this.div);

           // CReating an img element and assigning values
        this.message_button = document.createElement('button'); 
        this.message_button.innerText = `Click to send msg to child iframe, ${this.padre.relation}`;
        this.message_button.id = 'message_button';
        // we append the img to  shadow root.
        this.shadow.appendChild(this.message_button);


         // CReating an img element and assigning values
        this.results = document.createElement('h2'); 
        this.results.innerText = `Waiting for iframe message, ${this.padre.relation}`;
        // we append the img to  shadow root.
        this.shadow.appendChild(this.results);

      

        // CReating an iframe
        this.iframe = document.createElement('iframe');
        this.iframe.src =  this.getAttribute('data-src');;
        this.iframe.width = '100%';
        this.iframe.height = '600';
        this.shadow.appendChild(this.iframe);

        this.setUpListeners();
    }

    bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener){
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    }

    setUpListeners () {
        // Send random messge data on every button click
        this.bindEvent(this.message_button, 'click', (e) => {
            const random = Math.random();
            const message = `<span>${this.padre.relation} iframe says: ${random}</span>`;
            this.sendMessage(message);
        });
         // Listen to message from child window
        this.bindEvent(window, 'message', (e) => {
            this.results.innerHTML = e.data;
        })
    }

    // Send a message to the child iframe
    sendMessage (msg) {
        // Make sure you are sending a string, and to stringify JSON
        this.iframe.contentWindow.postMessage(msg, '*');
    }
}

// We define the element
customElements.define('omni-iframe', XProduct);