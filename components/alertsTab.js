class alertsTab extends tab {
    constructor(title, id, svgPath, parent, navButtonId, active = false) {
        super(title, id, svgPath, parent, active);
        let tab = document.getElementById(id);
        let div = document.createElement("div");
        this.alert1 = this._reminder1();
        this.alert2 = this._tradeRequest();
        this.alert3 = this._reminder2();
        this.alert1.style.display = "none";
        let redDot = document.createElement("div");
        redDot.classList.add("red-dot");
        setTimeout(() => {
            this.alert1.style.display = "block";
            this._ping(navButtonId, redDot);
        }, 30000);
        this.alert1.addEventListener("click", () => {
            redDot.remove();
            this.alert1.classList.remove("new-alert");
        });
        div.appendChild(this.alert1);
        div.appendChild(this.alert2);
        div.appendChild(this.alert3);
        tab.appendChild(div);
    }

    _ping(navButtonId, redDot) {
        let navButton = document.getElementById(navButtonId);
        navButton.appendChild(redDot);
        playPing();
    }

    _reminder1() {
        let alert = document.createElement("details");
        alert.classList.add("reminder");
        alert.classList.add("new-alert");
        let summary = document.createElement("summary");
        summary.innerHTML = "<h2> Take out the Trash by 22:00</h2>";
        summary.innerHTML += "<br><strong>Reminder</strong>";
        alert.appendChild(summary);
        let div = document.createElement("div");
        div.innerHTML += `<strong>Frequency:</strong> Weekly 
        <br><strong>Days:</strong> Mon 
        <br><strong>Duration:</strong> 0.25 hours`;
        div.innerHTML += "<h3>Have you completed this chore?</h3>";
        alert.appendChild(div);
        let buttons = document.createElement("div");
        let confirm = document.createElement("button");
        confirm.innerHTML = "Confirm Completion";
        confirm.addEventListener("click", () => {
            window.alert(
                "Your housemates will be notified of your completion."
            );
            this.alert1.remove();
        });
        confirm.classList.add("positive-button");
        let extension = document.createElement("button");
        extension.innerHTML = "Request Extension";
        extension.addEventListener("click", () => {
            window.alert("Your housemates will process your request shortly.");
            this.alert1.remove();
        });
        buttons.appendChild(confirm);
        buttons.appendChild(extension);
        alert.appendChild(buttons);
        return alert;
    }

    _reminder2() {
        let alert = document.createElement("details");
        alert.classList.add("reminder");
        let summary = document.createElement("summary");
        summary.innerHTML = "<h2> Vacuum the House by 12:00</h2>";
        summary.innerHTML += "<br><strong>Reminder</strong>";
        alert.appendChild(summary);
        let div = document.createElement("div");
        div.innerHTML += `<strong>Frequency:</strong> Weekly 
        <br><strong>Days:</strong> Mon 
        <br><strong>Duration:</strong> 0.5 hours`;
        div.innerHTML += "<h3>Have you completed this chore?</h3>";
        alert.appendChild(div);
        let buttons = document.createElement("div");
        let confirm = document.createElement("button");
        confirm.innerHTML = "Confirm Completion";
        confirm.classList.add("positive-button");
        confirm.addEventListener("click", () => {
            window.alert(
                "Your housemates will be notified of your completion."
            );
            this.alert3.remove();
        });
        let extension = document.createElement("button");
        extension.innerHTML = "Request Extension";
        extension.addEventListener("click", () => {
            window.alert("Your housemates will process your request shortly.");
            this.alert3.remove();
        });
        buttons.appendChild(confirm);
        buttons.appendChild(extension);
        alert.appendChild(buttons);
        return alert;
    }

    _tradeRequest() {
        let alert = document.createElement("details");
        alert.classList.add("trade-request");
        let summary = document.createElement("summary");
        summary.innerHTML = "<h2> Request from James</h2>";
        summary.innerHTML += "<br><strong>Trade</strong>";
        alert.appendChild(summary);
        let div = document.createElement("div");
        div.innerHTML += `Swap your chore <strong>Vacuum the House</strong>
        <br>With their chore <strong>Mow the Lawn</strong>`;
        div.innerHTML += "<h3>Do you accept this trade?</h3>";
        alert.appendChild(div);
        let buttons = document.createElement("div");
        let accept = document.createElement("button");
        accept.innerHTML = "Accept";
        accept.addEventListener("click", () => {
            window.alert(
                "Your housemates will be notified of your acceptance."
            );
            this.alert2.remove();
        });
        accept.classList.add("positive-button");
        let reject = document.createElement("button");
        reject.innerHTML = "Reject";
        reject.addEventListener("click", () => {
            window.alert("Your housemates will be notified of your rejection.");
            this.alert2.remove();
        });
        reject.classList.add("negative-button");
        buttons.appendChild(accept);
        buttons.appendChild(reject);
        alert.appendChild(buttons);
        return alert;
    }
}
