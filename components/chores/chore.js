class chore {
    static _chores = [];

    // Static variable to store the frequency and its corresponding effort value
    // 7/2 is used to account for the fact that the number of days selected could be any from 1 to 7
    static _frequencies = {
        "One Time Only": 1,
        Weekly: 52 * (7 / 2),
        "Bi-weekly": 26 * (7 / 2),
        "Semi-monthly": 24 * (7 / 2),
        Monthly: 12 * (7 / 2),
        Yearly: 1 * (7 / 2),
    };

    constructor(
        name,
        description,
        frequency,
        days,
        duration,
        deadline,
        numberOfPeople,
        notes,
        housemates,
        assignees = []
    ) {
        this.name = name;
        this.description = description;
        this.frequency = frequency;
        this.days = days;
        this.duration = duration;
        this.deadline = deadline;
        this.numberOfPeople = numberOfPeople;
        this.notes = notes;
        this.housemates = [...housemates];
        this.assignees = assignees;
        this.effort = this._calculateEffort(housemates.length);
        this.checkboxName = "assignees-" + this.name.replace(/\s/g, "-");

        this.component = document.createElement("details");
        let summary = this._summary();
        this.descriptionView = this._descriptionView();
        this.assignmentForm = this._assignmentForm();
        this.editForm = this._editForm();
        this.component.appendChild(summary);
        this.component.appendChild(this.descriptionView);
        this.component.appendChild(this.assignmentForm);
        this.component.appendChild(this.editForm);
        chore._chores.push(this);
        this._placeComponent();
    }

    _calculateEffort(numberOfHousemates) {
        let max = 24 * 365 * numberOfHousemates;
        let frequencyValue = chore._frequencies[this.frequency];
        let effort =
            ((this.duration * frequencyValue * this.numberOfPeople) / max) *
            100;
        return effort;
    }

    _summary() {
        let summary = document.createElement("summary");
        summary.innerHTML = `<h4> ${this.name}</h4>`;

        let avatarDiv = document.createElement("div");
        this.assignees.forEach((assignee) => {
            let avatar = document.createElement("img");
            avatar.src = `assets/avatars/${assignee}.svg`;
            avatar.alt = assignee;
            avatar.classList.add("avatar");
            avatarDiv.appendChild(avatar);
        });
        summary.appendChild(avatarDiv);
        if (this.assignees.length == 0) {
            this.component.classList.add("unassigned-chore");
        }
        return summary;
    }

    _descriptionView() {
        let descriptionView = document.createElement("div");
        descriptionView.innerHTML = `<strong>Description:</strong> ${
            this.description
        }<br>
            <strong>Notes:</strong> ${this.notes}<br><br>
            <strong>Frequency:</strong> ${this.frequency}<br>
            <strong>Days:</strong> ${this.days.join(", ")}<br><br>
            <strong>Duration:</strong> ${this.duration} hours<br>
            <strong>Deadline:</strong> ${this.deadline}<br><br>
            <strong>Effort:</strong> ${this.effort.toFixed(2)}%<br>
            <strong>Number of People:</strong> ${this.numberOfPeople}`;

        let assigneesLabel = document.createElement("label");
        let strong = document.createElement("strong");
        strong.innerHTML = "Assignees:";
        assigneesLabel.appendChild(strong);
        let assignmentButtons = document.createElement("div");
        let assignButton = document.createElement("button");
        assignButton.innerHTML = "Edit Assignment";
        assignButton.addEventListener("click", () => {
            this._toggleAssignmentForm();
        });
        assignButton.classList.add(
            `modify-buttons-${this.name.replace(/\s/g, "-")}`
        );
        assignmentButtons.appendChild(assignButton);
        let unassignButton = document.createElement("button");
        unassignButton.innerHTML = "Unassign";
        unassignButton.addEventListener("click", () => {
            this._clearAssignment();
        });
        if (this.assignees.length == 0) {
            assignButton.innerHTML = "Assign";
            unassignButton.style.display = "none";
        }
        unassignButton.classList.add(
            `modify-buttons-${this.name.replace(/\s/g, "-")}`
        );
        assignmentButtons.appendChild(unassignButton);
        assigneesLabel.appendChild(assignmentButtons);
        assigneesLabel.style.display = "flex";
        assigneesLabel.style.justifyContent = "space-between";
        descriptionView.appendChild(assigneesLabel);
        let avatarDiv = document.createElement("div");
        this.assignees.forEach((assignee) => {
            let figure = document.createElement("figure");
            let avatar = document.createElement("img");
            avatar.src = `assets/avatars/${assignee}.svg`;
            avatar.alt = assignee;
            avatar.classList.add("avatar");
            let caption = document.createElement("figcaption");
            caption.innerHTML = assignee;
            figure.appendChild(avatar);
            figure.appendChild(caption);
            avatarDiv.appendChild(figure);
        });
        avatarDiv.classList.add("assignees-list");
        descriptionView.appendChild(avatarDiv);
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit Chore";
        editButton.addEventListener("click", () => {
            this._toggleEditForm();
        });
        editButton.classList.add(
            `modify-buttons-${this.name.replace(/\s/g, "-")}`
        );
        descriptionView.appendChild(editButton);
        let completeButton = document.createElement("button");
        completeButton.innerHTML = "Complete";
        completeButton.classList.add("positive-button");
        completeButton.addEventListener("click", (event) => {
            this._completeChore(event.target);
        });
        if (!this.assignees.includes("Me")) {
            completeButton.style.display = "none";
        }
        descriptionView.appendChild(completeButton);
        let excuseButton = document.createElement("button");
        if (this.housemates.includes("Me")) {
            excuseButton.innerHTML = "Avoid";
        } else {
            excuseButton.innerHTML = "Unavoid";
        }
        excuseButton.addEventListener("click", (event) => {
            this._excuse(event.target);
        });
        if (this.assignees.includes("Me")) {
            excuseButton.style.display = "none";
        }
        descriptionView.appendChild(excuseButton);
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Remove";
        deleteButton.classList.add("negative-button");
        deleteButton.addEventListener("click", () => {
            this._delete();
        });
        descriptionView.appendChild(deleteButton);
        return descriptionView;
    }

    _renderDistribution() {
        let totalChores = chore._chores.length;
        let assignedChores = 0;
        let housematesAssignments = {};
        this.housemates.forEach((housemate) => {
            housematesAssignments[housemate] = 0;
        });
        chore._chores.forEach((chore) => {
            chore.assignees.forEach((assignee) => {
                housematesAssignments[assignee]++;
            });
            if (chore.assignees.length > 0) {
                assignedChores++;
            }
        });

        let distribution = document.getElementById("chores-distribution");
        distribution.innerHTML = "";
        let heading = document.createElement("div");
        heading.innerHTML = `<h4>Total Chores: ${totalChores}, Assigned Chores: ${assignedChores}</h4>`;
        heading.style.textAlign = "center";
        distribution.appendChild(heading);
        for (let housemate in housematesAssignments) {
            let distributionItem = document.createElement("div");
            distributionItem.style.width = "100%";
            let bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.width = `${
                (housematesAssignments[housemate] / totalChores) * 100
            }%`;
            distributionItem.innerHTML = `<strong>${housemate}:</strong> ${housematesAssignments[housemate]} Chores<br>`;
            distributionItem.appendChild(bar);
            distribution.appendChild(distributionItem);
        }
    }

    _editForm() {
        let form = document.createElement("form");

        let descriptionLabel = document.createElement("label");
        descriptionLabel.innerHTML = "<strong>Description:</strong><br>";
        let description = document.createElement("textarea");
        description.rows = 2;
        description.cols = 40;
        description.value = this.description;
        this.descriptionEdit = description;
        descriptionLabel.appendChild(description);

        let frequencyLabel = document.createElement("label");
        frequencyLabel.innerHTML = "<strong>Frequency:</strong> * ";
        let frequency = document.createElement("select");
        chore.getFrequencies().forEach((frequencyOption) => {
            let option = document.createElement("option");
            option.value = frequencyOption;
            option.innerHTML = frequencyOption;
            if (frequencyOption == this.frequency) {
                option.selected = true;
            }
            frequency.appendChild(option);
        });
        this.frequencyEdit = frequency;
        frequencyLabel.appendChild(frequency);

        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        let daysLabel = document.createElement("div");
        daysLabel.innerHTML = "<strong>Days:</strong> *<br>";
        days.forEach((day) => {
            let checkboxLabel = document.createElement("label");
            checkboxLabel.innerHTML = day;
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = day;
            if (this.days.includes(day)) {
                checkbox.checked = true;
            }
            checkboxLabel.appendChild(checkbox);
            daysLabel.appendChild(checkboxLabel);
        });
        this.daysEdit = daysLabel;
        daysLabel.classList.add("checkboxes");

        let durationLabel = document.createElement("label");
        durationLabel.innerHTML = "<strong>Duration:</strong> * ";
        let duration = document.createElement("input");
        duration.type = "number";
        duration.min = 0;
        duration.max = 24;
        duration.step = 0.25;
        duration.value = this.duration;
        this.durationEdit = duration;
        durationLabel.appendChild(duration);

        let deadlineLabel = document.createElement("label");
        deadlineLabel.innerHTML = "<strong>Deadline:</strong> * ";
        let deadline = document.createElement("input");
        deadline.type = "time";
        deadline.value = this.deadline;
        this.deadlineEdit = deadline;
        deadlineLabel.appendChild(deadline);

        let numberOfPeopleLabel = document.createElement("label");
        numberOfPeopleLabel.innerHTML = "<strong>Number of People:</strong> * ";
        let numberOfPeople = document.createElement("input");
        numberOfPeople.type = "number";
        numberOfPeople.min = 1;
        numberOfPeople.max = this.housemates.length;
        numberOfPeople.value = this.numberOfPeople;
        this.numberOfPeopleEdit = numberOfPeople;
        numberOfPeopleLabel.appendChild(numberOfPeople);

        let notesLabel = document.createElement("label");
        notesLabel.innerHTML = "<strong>Notes:</strong><br>";
        let notes = document.createElement("textarea");
        notes.rows = 2;
        notes.cols = 40;
        notes.value = this.notes;
        this.notesEdit = notes;
        notesLabel.appendChild(notes);

        let buttonDiv = document.createElement("div");
        let submit = document.createElement("input");
        submit.type = "button";
        submit.value = "Submit";
        submit.classList.add("positive-button");
        submit.addEventListener("click", () => {
            this._editDetails();
        });
        let cancel = document.createElement("input");
        cancel.type = "button";
        cancel.value = "Cancel";
        cancel.classList.add("negative-button");
        cancel.addEventListener("click", () => {
            this._resetEditForm();
            this._toggleEditForm();
        });
        buttonDiv.appendChild(submit);
        buttonDiv.appendChild(cancel);

        form.appendChild(descriptionLabel);
        form.appendChild(notesLabel);
        form.appendChild(frequencyLabel);
        form.appendChild(daysLabel);
        form.appendChild(durationLabel);
        form.appendChild(deadlineLabel);
        form.appendChild(numberOfPeopleLabel);
        form.appendChild(buttonDiv);
        form.style.display = "none";
        return form;
    }

    _resetEditForm() {
        this.descriptionEdit.value = this.description;
        this.frequencyEdit.value = this.frequency;
        this.daysEdit.querySelectorAll("input").forEach((checkbox) => {
            if (this.days.includes(checkbox.value)) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
        this.durationEdit.value = this.duration;
        this.deadlineEdit.value = this.deadline;
        this.numberOfPeopleEdit.value = this.numberOfPeople;
        this.notesEdit.value = this.notes;
    }

    _editDetails() {
        if (!this._validateEdit()) {
            window.alert("Please fill in all the required fields.");
            return;
        }
        let confirmation = window.confirm(
            "Are you sure you want to make these changes?"
        );
        if (confirmation) {
            this.description = this.descriptionEdit.value;
            this.frequency = this.frequencyEdit.value;
            this.days = [];
            this.daysEdit.querySelectorAll("input").forEach((checkbox) => {
                if (checkbox.checked) {
                    this.days.push(checkbox.value);
                }
            });
            this.duration = this.durationEdit.value;
            this.deadline = this.deadlineEdit.value;
            this.numberOfPeople = this.numberOfPeopleEdit.value;
            this.notes = this.notesEdit.value;
            this.effort = this._calculateEffort(this.housemates.length);
            if (this.assignees.length != this.numberOfPeople) {
                window.alert(
                    "Please re-assign this chore as the number of people assigned has changed."
                );
                this.assignees = [];
            }
            this._updateComponent();
        }
    }

    _validateEdit() {
        let valid = true;
        let daysCount = 0;
        this.daysEdit.querySelectorAll("input").forEach((checkbox) => {
            if (checkbox.checked) {
                daysCount++;
            }
        });
        if (daysCount == 0) {
            valid = false;
        } else if (this.numberOfPeopleEdit.value <= 0) {
            valid = false;
        } else if (this.durationEdit.value <= 0) {
            valid = false;
        } else if (this.deadlineEdit.value == "") {
            valid = false;
        }
        return valid;
    }

    _excuse(button) {
        if (button.innerHTML == "Avoid") {
            let confirmation1 = window.confirm(
                "Are you sure you want to avoid this chore?"
            );
            if (confirmation1) {
                let indexOfMe = this.housemates.indexOf("Me");
                if (indexOfMe !== -1) {
                    this.housemates.splice(indexOfMe, 1);
                }
                this._updateComponent();
            }
        } else {
            let confirmation2 = window.confirm(
                "Are you sure you want to un-avoid this chore?"
            );
            if (confirmation2) {
                this.housemates.push("Me");
                this._updateComponent();
            }
        }
    }

    _updateComponent() {
        this.component.remove();
        this.component = document.createElement("details");
        let summary = this._summary();
        this.descriptionView = this._descriptionView();
        this.assignmentForm = this._assignmentForm();
        this.editForm = this._editForm();
        this.component.appendChild(summary);
        this.component.appendChild(this.descriptionView);
        this.component.appendChild(this.assignmentForm);
        this.component.appendChild(this.editForm);
        this._placeComponent();
    }

    _placeComponent() {
        if (this.assignees.includes("Me")) {
            choresTab.getMyChoresLabel().appendChild(this.component);
        } else if (this.assignees.length > 0) {
            choresTab.getAssignedLabel().appendChild(this.component);
        } else {
            choresTab.getUnassignedLabel().appendChild(this.component);
        }
        this._renderDistribution();
    }

    _delete() {
        let confirmation = window.confirm(
            `Are you sure you want to delete '${this.name}'?`
        );
        if (confirmation) {
            this.component.remove();
            chore._chores.splice(chore._chores.indexOf(this), 1);
            this._renderDistribution();
            newChoreForm.toggleNameOption(this.name, "block");
        }
    }

    _completeChore(button) {
        let confirmation = window.confirm(
            `Are you sure you want to mark '${this.name}' as completed?`
        );
        if (confirmation) {
            this.component.classList.add("completed-chore");
            button.disabled = true;
            document
                .querySelectorAll(
                    `.modify-buttons-${this.name.replace(/\s/g, "-")}`
                )
                .forEach((button) => {
                    button.disabled = true;
                });
            let choreDetails = document.createElement("details");
            let summary = document.createElement("summary");
            summary.innerHTML = `<h4> ${this.name}</h4>`;
            let currentDateAndTime = new Date();
            let year = currentDateAndTime.getFullYear();
            let month = currentDateAndTime.getMonth() + 1; // Months are zero-based, so add 1
            let day = currentDateAndTime.getDate();
            let hours = currentDateAndTime.getHours();
            let minutes = currentDateAndTime.getMinutes();
            let stringDate = `<div>${day}-${month}-${year} ${hours}:${minutes}</div>`;
            summary.innerHTML += stringDate;
            choreDetails.appendChild(summary);
            let description = document.createElement("div");
            description.innerHTML = `<strong>Completed by:</strong> ${this.assignees.join(
                ", "
            )}<br><br>
                <strong>Description:</strong> ${this.description}<br>
                <strong>Notes:</strong> ${this.notes}<br><br>
                <strong>Frequency:</strong> ${this.frequency}<br>
                <strong>Days:</strong> ${this.days.join(", ")}<br>
                <strong>Duration:</strong> ${this.duration} hours<br>
                <strong>Deadline:</strong> ${this.deadline}<br>`;
            choreDetails.appendChild(description);
            choreDetails.classList.add("completed-chore");
            choresTab.addToCompletedLabel(choreDetails);
        }
    }

    _assignmentForm() {
        let form = document.createElement("form");
        let div = document.createElement("div");
        div.innerHTML = `<strong>Assignees:</strong> (${this.numberOfPeople} Housemates)<br>`;
        this.housemates.forEach((housemate) => {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = this.checkboxName;
            checkbox.value = housemate;
            if (this.assignees.includes(housemate)) {
                checkbox.checked = true;
            }
            let checkboxLabel = document.createElement("label");
            checkboxLabel.innerHTML = housemate;
            checkboxLabel.appendChild(checkbox);
            div.appendChild(checkboxLabel);
        });
        div.classList.add("checkboxes");
        div.style.marginBottom = "10px";
        let randomize = document.createElement("input");
        randomize.type = "button";
        randomize.value = "Randomize";
        randomize.addEventListener("click", () => {
            this._randomizeAssignment();
        });
        let submit = document.createElement("input");
        submit.type = "button";
        submit.value = "Assign";
        submit.addEventListener("click", () => {
            this._assignment();
        });
        submit.classList.add("positive-button");
        let cancel = document.createElement("input");
        cancel.type = "reset";
        cancel.value = "Cancel";
        cancel.addEventListener("click", () => {
            this._toggleAssignmentForm();
        });
        cancel.classList.add("negative-button");
        form.appendChild(div);
        form.appendChild(randomize);
        form.appendChild(submit);
        form.appendChild(cancel);
        form.style.display = "none";
        return form;
    }

    _randomizeAssignment() {
        let checkboxes = document.getElementsByName(this.checkboxName);
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        for (let i = 0; i < this.numberOfPeople; i++) {
            let randomIndex = Math.floor(Math.random() * checkboxes.length);
            if (checkboxes[randomIndex].checked) {
                i--;
                continue;
            } else {
                checkboxes[randomIndex].checked = true;
            }
        }
    }

    _assignment() {
        let checkboxes = document.getElementsByName(this.checkboxName);
        let assignees = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                assignees.push(checkbox.value);
            }
        });
        if (assignees.length == this.numberOfPeople) {
            this.assignees = assignees;
            this._toggleAssignmentForm();
            this._updateComponent();
        } else {
            window.alert(
                `Please select ${this.numberOfPeople} housemates to assign this chore to.`
            );
        }
    }

    _clearAssignment() {
        let confirmation = window.confirm(
            "Are you sure you want to unassign everyone from this chore?"
        );
        if (confirmation) {
            this.assignees = [];
            this._updateComponent();
        }
    }

    _toggleAssignmentForm() {
        if (this.assignmentForm.style.display == "none") {
            this.assignmentForm.style.display = "block";
            this.descriptionView.style.display = "none";
        } else {
            this.assignmentForm.style.display = "none";
            this.descriptionView.style.display = "block";
        }
    }

    _toggleEditForm() {
        if (this.editForm.style.display == "none") {
            this.editForm.style.display = "flex";
            this.descriptionView.style.display = "none";
        } else {
            this.editForm.style.display = "none";
            this.descriptionView.style.display = "block";
        }
    }

    static getFrequencies() {
        return Object.keys(chore._frequencies);
    }
}

function dummyChores(housemates) {
    new chore(
        "Paint the Deck Floor",
        "The deck floor in the backyard needs to be painted after every winter",
        "One Time Only",
        ["Sun"],
        "3",
        "16:00",
        5,
        "Use the paint stored in the garage",
        housemates
    );
    new chore(
        "Water the Plants",
        "Water all the garden plants in the backyard",
        "Weekly",
        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "0.25",
        "17:00",
        1,
        "Do not water the plants on days it rains",
        housemates
    );
    new chore(
        "Mop the Floor",
        "Mop the floor of the house",
        "Weekly",
        ["Mon"],
        "0.5",
        "15:00",
        2,
        "Use the cleaning supplies under the sink",
        housemates
    );
    new chore(
        "Take out the Trash",
        "Take the garbage bags out to the curb for collection",
        "Weekly",
        ["Mon"],
        "0.25",
        "22:00",
        2,
        "Check the weekly garbage collection schedule for correct type of garbage to be collected",
        housemates,
        ["Me", "Maher"]
    );
    new chore(
        "Mow the Lawn",
        "Mow the lawn in the backyard and front yard",
        "Monthly",
        ["Sat"],
        "0.75",
        "16:00",
        2,
        "Recharge battery of the lawn mower after use",
        housemates,
        ["James", "Arsh"]
    );
    new chore(
        "Vacuum the House",
        "Vacuum the floors of the house",
        "Weekly",
        ["Mon"],
        "0.5",
        "12:00",
        1,
        "Vacuum the carpets and tiles",
        housemates,
        ["Me"]
    );
    new chore(
        "Clean the Bathroom",
        "Clean the bathroom and toilet",
        "Weekly",
        ["Sat"],
        "0.5",
        "11:00",
        1,
        "Use the cleaning supplies under the sink",
        housemates,
        ["Mohammad"]
    );
    newChoreForm.toggleNameOption("Paint the Deck Floor", "none");
    newChoreForm.toggleNameOption("Water the Plants", "none");
    newChoreForm.toggleNameOption("Mop the Floor", "none");
    newChoreForm.toggleNameOption("Take out the Trash", "none");
    newChoreForm.toggleNameOption("Mow the Lawn", "none");
    newChoreForm.toggleNameOption("Vacuum the House", "none");
    newChoreForm.toggleNameOption("Clean the Bathroom", "none");

    let choreDetails = document.createElement("details");
    let summary = document.createElement("summary");
    summary.innerHTML = "<h4> Do the Laundry</h4><div>18-11-2023 15:13</div>";
    choreDetails.appendChild(summary);
    let description = document.createElement("div");
    description.innerHTML = `<strong>Completed by:</strong> Mohammad<br><br>
        <strong>Description:</strong> Put all dirty clothes to wash and hang them for drying once done<br>
        <strong>Notes:</strong> Wash white clothes separately<br><br>
        <strong>Frequency:</strong> Weekly<br>
        <strong>Days:</strong> Sat<br>
        <strong>Duration:</strong> 1 hours<br>
        <strong>Deadline:</strong> 15:00<br>`;
    choreDetails.appendChild(description);
    choreDetails.classList.add("completed-chore");
    choresTab.addToCompletedLabel(choreDetails);
}
