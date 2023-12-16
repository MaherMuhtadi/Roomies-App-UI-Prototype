class choresTab extends tab {
    static _unassignedLabel = document.createElement("div");
    static _myChoresLabel = document.createElement("div");
    static _assignedLabel = document.createElement("div");
    static _completed = document.createElement("div");

    constructor(title, id, svgPath, parent, housemates, active = false) {
        super(title, id, svgPath, parent, active);
        let tab = document.getElementById(this.id);
        this.div = document.createElement("div");
        this.heading = document.createElement("h2");
        this.heading.innerHTML = "Chores List";
        this.div.appendChild(this.heading);
        this.addChoreButton = document.createElement("button");
        this.addChoreButton.innerHTML = "Add New Chore";
        this.addChoreButton.addEventListener("click", () => {
            this.newChoreFormToggle();
        });
        this.div.appendChild(this.addChoreButton);
        this.div.style.display = "flex";
        this.div.style.justifyContent = "space-between";
        this.div.style.alignItems = "center";
        this.assigned = document.createElement("div");
        this.unassigned = document.createElement("div");
        this.choresViewDiv = this._choresView();
        this.newChoreForm = newChoreForm.form(this, housemates);
        this.choresDistribution = this._choresDistribution();
        this._addClass("tab-components");
        tab.appendChild(this.choresDistribution);
        tab.appendChild(this.div);
        tab.appendChild(this.choresViewDiv);
        tab.appendChild(this.newChoreForm);
    }

    _choresDistribution() {
        let div = document.createElement("div");
        let heading = document.createElement("h2");
        heading.innerHTML = "Chores Distribution";
        div.appendChild(heading);
        let distribution = document.createElement("div");
        distribution.id = "chores-distribution";
        div.appendChild(distribution);
        return div;
    }

    _choresView() {
        let parent = document.createElement("div");

        let label = document.createElement("label");
        label.innerHTML = "Show: ";
        let allOption = this._createRadioButton("all", "All", true);
        let assignedOption = this._createRadioButton("assigned", "Assigned");
        let unassignedOption = this._createRadioButton(
            "unassigned",
            "Unassigned"
        );
        let completedOption = this._createRadioButton("completed", "History");
        label.appendChild(allOption);
        label.appendChild(assignedOption);
        label.appendChild(unassignedOption);
        label.appendChild(completedOption);
        label.addEventListener("change", (event) => {
            this._toggleListView(event.target.value);
        });

        choresTab._unassignedLabel.innerHTML = "<h3>Unassigned Chores<h3>";
        choresTab._myChoresLabel.innerHTML = "<h3>My Chores</h3>";
        choresTab._assignedLabel.innerHTML = "<h3>Housemate Chores</h3>";
        choresTab._completed.innerHTML = "<h3>Completion History</h3>";
        choresTab._completed.style.display = "none";
        choresTab._completed.appendChild(document.createElement("div"));

        this.assigned.appendChild(choresTab._myChoresLabel);
        this.assigned.appendChild(choresTab._assignedLabel);
        this.unassigned.appendChild(choresTab._unassignedLabel);

        parent.appendChild(label);
        parent.appendChild(this.assigned);
        parent.appendChild(this.unassigned);
        parent.appendChild(choresTab._completed);
        return parent;
    }

    _createRadioButton(value, labelText, checked = false) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "filterView";
        radio.value = value;
        radio.checked = checked;

        let radioLabel = document.createElement("label");
        radioLabel.appendChild(radio);
        radioLabel.appendChild(document.createTextNode(labelText)); // Use createTextNode to add text content

        return radioLabel;
    }

    newChoreFormToggle() {
        if (this.newChoreForm.style.display === "none") {
            this.addChoreButton.innerHTML = "Back";
            this.newChoreForm.style.display = "flex";
            this.choresViewDiv.style.display = "none";
            this.choresDistribution.style.display = "none";
            this.heading.innerHTML = "New Chore";
        } else {
            this.addChoreButton.innerHTML = "Add New Chore";
            this.newChoreForm.style.display = "none";
            this.choresViewDiv.style.display = "block";
            this.choresDistribution.style.display = "block";
            this.heading.innerHTML = "Chores List";
        }
    }

    _toggleListView(value) {
        switch (value) {
            case "all":
                this.assigned.style.display = "block";
                this.unassigned.style.display = "block";
                choresTab._completed.style.display = "none";
                break;
            case "assigned":
                this.assigned.style.display = "block";
                this.unassigned.style.display = "none";
                choresTab._completed.style.display = "none";
                break;
            case "unassigned":
                this.assigned.style.display = "none";
                this.unassigned.style.display = "block";
                choresTab._completed.style.display = "none";
                break;
            case "completed":
                this.assigned.style.display = "none";
                this.unassigned.style.display = "none";
                choresTab._completed.style.display = "block";
                break;
            default:
                break;
        }
    }

    _addClass(className) {
        this.div.classList.add(className);
        this.choresViewDiv.classList.add(className);
        this.newChoreForm.classList.add(className);
        this.choresDistribution.classList.add(className);
    }

    static getUnassignedLabel() {
        return choresTab._unassignedLabel;
    }

    static getMyChoresLabel() {
        return choresTab._myChoresLabel;
    }

    static getAssignedLabel() {
        return choresTab._assignedLabel;
    }

    static addToCompletedLabel(elem) {
        let first = choresTab._completed.childNodes[1].firstChild;
        if (first) {
            choresTab._completed.childNodes[1].insertBefore(elem, first);
        } else {
            choresTab._completed.childNodes[1].appendChild(elem);
        }
    }
}
