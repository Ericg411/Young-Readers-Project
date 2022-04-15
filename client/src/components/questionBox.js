const template = document.createElement("template");

template.innerHTML = `
    <style>

    .question-box {
        margin-top: 20px;
        border-radius: 5px;
        padding: 20px;
        box-shadow: rgba(3, 8, 20, 0.2) 0px 0.15rem 0.5rem,
            rgba(2, 8, 20, 0.2) 0px 0.075rem 0.175rem;
        background-color: #f3f3f3;
    }
    
    .question-box .question {
        border-radius: 5px;
        padding: 20px;
        background-color: #fff;
        box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
            rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    }
    
    .question-box .author,
    .likes {
        color: #777;
        font-weight: bold;
        font-size: 14px;
    }
    .question-box .author {
        margin-top: 10px;
    }
    
    .question-box .likes {
        margin-bottom: 10px;
    }
    
    .question-box .reply-box {
        margin-top: 10px;
    }
    
    .question-box input {
        padding: 5px 10px;
        margin-right: 5px;
        border-style: solid;
        border-radius: 5px;
        border-width: 1px;
        border-color: #777;
        box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
            rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    }
    
    .question-box button {
        margin-top: 5px;
        margin-right: 5px;
        padding: 5px 10px;
        border-radius: 3px;
        font-weight: 600;
        border-style: none;
        background: #fff;
        box-shadow: rgba(3, 8, 20, 0.3) 0px 0.15rem 0.5rem,
            rgba(2, 8, 20, 0.3) 0px 0.075rem 0.175rem;
        display: inline;
        transition: all 200ms;
    }
    
    .question-box button:hover {
        background: #eee;
    }
    
    .question-box button:active {
        background: #ddd;
    }

    </style>
    <div class="question-box">
        <div class="question-edit">
            <input class="question-input" type="text" />
            <button class="submit-btn">Submit</button>
        </div>
        <div class="question-display">
            <p class="question">Comment</p>
            <p class="author">Author:</p>
            <p class="likes">Likes: 0</p>
            <button class="like-btn">Like</button>
            <button class="reply-btn">Reply</button>
            <div class="reply-box"></div>
        </div>
    </div>
`;

const nestingLimit = 3;

/**
 *  Class which extends 'HTMLElement' and defines the Web Component.
 *  This class is exported as an ES Module.
 */
 export class QuestionBox extends HTMLElement {
    constructor() {
        // Calling the constructor of the base class (HTMLElement)
        super();

        // Setting the value of 'level' from the 'level' attribute in html.
        this.level = this.getAttribute("level")
            ? // If value is available, assign it to 'level'.
              parseInt(this.getAttribute("level"))
            : // Else 'level' is set as 0 by default.
              0;

        // Initializing likeCount to 0 for the question box.
        this.likeCount = 0;

        // Attach a shadow DOM tree to 'this', which is the Web Component itself.
        // 'open' mode specifies that, elements of the shadow root
        // are accessible from JavaScript outside the root
        this.attachShadow({ mode: "open" });

        // Appending a clone of the template defined above to the shadowRoot.
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Make 'questionEdit' and 'questionDisplay' variables to point to its respective HTML elements in the shadow DOM
        this.questionEdit = this.shadowRoot.querySelector(".question-edit");
        this.questionDisplay = this.shadowRoot.querySelector(".question-display");
    }
    /**
     * This method executes as soon as the Web Component is attached to the DOM.
     * We attach the event listeners for all the buttons present on the component in this method.
     */
    connectedCallback() {
        // Attaching questionSubmit() listner to click event for the Submit button.
        this.questionEdit
            .querySelector(".submit-btn")
            .addEventListener("click", () => this.questionSubmit());

        // Attaching questionLike() listner to click event for the Like button.
        this.questionDisplay
            .querySelector(".like-btn")
            .addEventListener("click", () => this.questionLike());

        // Attaching questionLike() listner to click event for the Reply button -
        // if the current level is less than nesting limit.
        if (this.level < nestingLimit) {
            this.questionDisplay
                .querySelector(".reply-btn")
                .addEventListener("click", () => this.questionReply());
        } else {
            // Disabling the Reply Button if current level is not less than nesting limit.
            this.questionDisplay.querySelector(".reply-btn").disabled = true;
        }

        // Setting the display style for the questionDisplay element to none.
        // This element will be initially hidden from view and will be displayed only when the question is submitted.
        this.questionDisplay.style.display = "none";
    }

    /**
     * This method is called when the user clicks the submit button.
     */
    questionSubmit() {
        // make the questionInput variable to point to the input box HTML element.
        const questionInput = this.questionEdit.querySelector(".question-input");

        // make the question variable to point to the div in which the question will be displayed
        const question = this.questionDisplay.querySelector(".question");

        // make the author variable to point to the author <p> tag.
        const author = this.questionDisplay.querySelector(".author");

        // Set the question submitted by the user as the content for display.
        question.innerHTML = questionInput.value;
        // Set the author name with the value of Current User from sessionStorage
        author.innerHTML = `Author: ${sessionStorage.getItem("currentUser")}`;

        // Hide questionEdit div
        this.questionEdit.style.display = "none";
        // Unhide questionDisplay div
        this.questionDisplay.style.display = "block";
    }

    /**
     * This method is called when the user clicks on the Like button present beside any question.
     */
    questionLike() {
        // make the likes variable to point to the likes <p> tag.
        const likes = this.questionDisplay.querySelector(".likes");

        // Increment like count
        this.likeCount++;

        // Set the update like count for display.
        likes.innerHTML = `Likes: ${this.likeCount}`;
    }

    /**
     * This method is called when the user clicks on the Reply button present beside any question.
     */
    questionReply() {
        // Make the replyBox variable to point to the reply-box DIV.
        const replyBox = this.questionDisplay.querySelector(".reply-box");
        // create a new question-box component as an HTML element and set its value to the newquestionBox variable.
        const newquestionBox = document.createElement("question-box");

        // Set newLevel by incrementing current level by 1.
        let newLevel = this.level + 1;
        // Set the value of level attribute as newLevel for the newquestionBox component.
        newquestionBox.setAttribute("level", newLevel);
        newquestionBox.level = newLevel;

        // If the reply box already has any child nodes,
        if (replyBox.childNodes) {
            // the newquestionBox is inserted before the first child in the reply box.
            replyBox.insertBefore(newquestionBox, replyBox.childNodes[0]);
        } else {
            // newquestionBox is appended directly as the first child.
            replyBox.appendChild(newquestionBox);
        }
    }

    /**
     * The disconnectedCallback() is executed when the component is disconnected from the DOM.
     * Here we remove all the event listeners that were attached while the component was created.
     */
    disconnectedCallback() {
        this.questionEdit.querySelector(".question-submit").removeEventListener();
        this.questionDisplay.querySelector(".reply-btn").removeEventListener();
        this.questionDisplay.querySelector(".like-btn").removeEventListener();
    }
}