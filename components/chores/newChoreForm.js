class newChoreForm {
    static _chores = [
        "Cook Dinner",
        "Clean the Bathroom",
        "Take out the Trash",
        "Do the Dishes",
        "Vacuum the House",
        "Mop the Floor",
        "Do the Laundry",
        "Mow the Lawn",
        "Water the Plants",
        "Shovel the Snow",
        "Paint the Deck Floor",
    ];
    static _formData = {
        name: "",
        description: "",
        frequency: "Weekly",
        days: [],
        duration: 0,
        deadline: "",
        numberOfPeople: 1,
        notes: "",
    };

    static form(parent, housemates) {
        newChoreForm._parent = parent;
        newChoreForm._housemates = housemates;
        this.form = document.createElement("form");
        let name = newChoreForm._nameSelect();
        let description = newChoreForm._descriptionTextArea();
        let frequency = newChoreForm._frequencySelect();
        let days = newChoreForm._daysCheckboxes();
        let duration = newChoreForm._durationInput();
        let deadline = newChoreForm._deadlineInput();
        let numberOfPeople = newChoreForm._numberOfPeopleInput();
        let notes = newChoreForm._notesTextArea();
        let action = newChoreForm._formActionButtons();
        this.form.appendChild(name);
        this.form.appendChild(frequency);
        this.form.appendChild(days);
        this.form.appendChild(duration);
        this.form.appendChild(deadline);
        this.form.appendChild(numberOfPeople);
        this.form.appendChild(description);
        this.form.appendChild(notes);
        this.form.appendChild(action);
        this.form.style.display = "none";
        this.form.addEventListener("input", (event) => {
            newChoreForm._updateData(event);
        });
        return this.form;
    }

    static _updateData(event) {
        let target = event.target;
        let name = event.target.name;
        if (target.type === "checkbox" && name === "days") {
            if (target.checked) {
                // If the checkbox is checked, add the day to the list
                newChoreForm._formData.days.push(target.value);
            } else {
                // If the checkbox is unchecked, remove the day from the list
                const index = newChoreForm._formData.days.indexOf(target.value);
                if (index !== -1) {
                    newChoreForm._formData.days.splice(index, 1);
                }
            }
        } else {
            newChoreForm._formData[name] = target.value;
        }
    }

    static _resetData() {
        newChoreForm._formData = {
            name: "",
            description: "",
            frequency: "Weekly",
            days: [],
            duration: 0,
            deadline: "",
            numberOfPeople: 1,
            notes: "",
        };
        this.form.reset();
        this.form.querySelector(
            "select[name='frequency']"
        ).children[1].selected = true;
        this.form.querySelector("input[name='numberOfPeople']").value = 1;
    }

    static _nameSelect() {
        let label = document.createElement("label");
        label.innerHTML = "<strong>Chore Name:</strong> * ";
        let select = document.createElement("select");
        select.name = "name";
        let option = document.createElement("option");
        option.value = "";
        option.selected = true;
        option.text = "Select Chore";
        select.appendChild(option);
        newChoreForm._chores.forEach((elem) => {
            let option = document.createElement("option");
            option.value = elem;
            option.text = elem;
            select.appendChild(option);
        });
        label.appendChild(select);
        let custom = document.createElement("input");
        custom.type = "button";
        custom.value = "Custom Name";
        custom.addEventListener("click", () => {
            newChoreForm._customName();
        });
        label.appendChild(custom);
        return label;
    }

    static _customName() {
        let children = this.form.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.display = "none";
        }
        let label = document.createElement("label");
        label.innerHTML = "<strong>Chore Name:</strong> * ";
        let input = document.createElement("input");
        input.type = "text";
        let submit = document.createElement("input");
        submit.type = "button";
        submit.value = "Add";
        submit.classList.add("positive-button");
        submit.addEventListener("click", () => {
            newChoreForm._addNewChore(input.value, label, children);
        });
        let cancel = document.createElement("input");
        cancel.type = "button";
        cancel.value = "Cancel";
        cancel.classList.add("negative-button");
        cancel.addEventListener("click", () => {
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = "block";
            }
            label.remove();
        });
        label.appendChild(input);
        label.appendChild(document.createElement("br"));
        label.appendChild(submit);
        label.appendChild(cancel);
        this.form.appendChild(label);
    }

    static _addNewChore(name, container, siblings) {
        if (name !== "") {
            let option = document.createElement("option");
            option.value = name;
            option.text = name;
            let select = document.querySelector("select[name='name']");
            select.appendChild(option);
            option.selected = true;
            newChoreForm._chores.push(name);
            newChoreForm._formData.name = name;
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].style.display = "block";
            }
            container.remove();
        } else {
            window.alert("Please enter a name for the chore!");
        }
    }

    static _frequencySelect() {
        let label = document.createElement("label");
        label.innerHTML = "<strong>Frequency:</strong> * ";
        let select = document.createElement("select");
        select.name = "frequency";

        chore.getFrequencies().forEach((elem) => {
            let option = document.createElement("option");
            option.value = elem;
            option.text = elem;
            if (elem === "Weekly") {
                option.selected = true;
            }
            select.appendChild(option);
        });
        label.appendChild(select);
        return label;
    }

    static _descriptionTextArea() {
        let label = document.createElement("label");
        label.innerHTML = "<strong>Description:</strong><br>";
        let textArea = document.createElement("textarea");
        textArea.name = "description";
        textArea.placeholder = "Write a short description of chore here";
        textArea.rows = 2;
        textArea.cols = 40;
        label.appendChild(textArea);
        return label;
    }

    static _notesTextArea() {
        let label = document.createElement("label");
        label.innerHTML = "<strong>Notes:</strong><br>";
        let textArea = document.createElement("textarea");
        textArea.name = "notes";
        textArea.placeholder = "Write any additional notes here";
        textArea.rows = 2;
        textArea.cols = 40;
        label.appendChild(textArea);
        return label;
    }

    static _daysCheckboxes() {
        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        let div = document.createElement("div");
        div.innerHTML = "<strong>Days:</strong> *<br>";
        days.forEach((day) => {
            let checkboxLabel = document.createElement("label");
            checkboxLabel.innerHTML = day;
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "days";
            checkbox.value = day;
            checkboxLabel.appendChild(checkbox);
            div.appendChild(checkboxLabel);
        });
        div.classList.add("checkboxes");
        return div;
    }

    static _durationInput() {
        let label = document.createElement("label");
        label.innerHTML = "<strong>Duration Estimate:</strong> * ";
        let duration = document.createElement("input");
        duration.name = "duration";
        duration.type = "number";
        duration.min = 0;
        duration.max = 24;
        duration.step = 0.25;
        duration.value = 0;
        label.appendChild(duration);
        label.innerHTML += " hours";
        return label;
    }

    static _deadlineInput() {
        let label = document.createElement("label");
        label.innerHTML = "<strong>Deadline:</strong> * ";
        let deadline = document.createElement("input");
        deadline.name = "deadline";
        deadline.type = "time";
        label.appendChild(deadline);
        return label;
    }

    static _numberOfPeopleInput() {
        let label = document.createElement("label");
        label.innerHTML = "<strong>No. of People Needed:</strong> * ";
        let numberOfPeople = document.createElement("input");
        numberOfPeople.name = "numberOfPeople";
        numberOfPeople.type = "number";
        numberOfPeople.min = 1;
        numberOfPeople.max = newChoreForm._housemates.length;
        numberOfPeople.value = 1;
        label.appendChild(numberOfPeople);
        return label;
    }

    static _formActionButtons() {
        let div = document.createElement("div");
        let submit = document.createElement("input");
        submit.type = "button";
        submit.value = "Add";
        submit.classList.add("positive-button");
        submit.addEventListener("click", () => {
            newChoreForm._addChore();
        });
        let clear = document.createElement("input");
        clear.addEventListener("click", () => {
            newChoreForm._resetData();
        });
        clear.type = "button";
        clear.value = "Clear";
        clear.classList.add("negative-button");
        div.appendChild(submit);
        div.appendChild(clear);
        return div;
    }

    static _addChore() {
        if (newChoreForm._validate()) {
            new chore(
                newChoreForm._formData.name,
                newChoreForm._formData.description,
                newChoreForm._formData.frequency,
                newChoreForm._formData.days,
                newChoreForm._formData.duration,
                newChoreForm._formData.deadline,
                newChoreForm._formData.numberOfPeople,
                newChoreForm._formData.notes,
                newChoreForm._housemates
            );
            newChoreForm.toggleNameOption(newChoreForm._formData.name, "none");
            window.alert("Chore added successfully!");
            newChoreForm._parent.newChoreFormToggle();
            newChoreForm._resetData();
        } else {
            window.alert("Please fill in all the fields with * in the label!");
        }
    }

    static _validate() {
        let valid = true;
        Object.keys(newChoreForm._formData).forEach((key) => {
            if (key !== "notes" && key !== "description") {
                if (newChoreForm._formData[key] === "") {
                    valid = false;
                }
            }
        });
        return valid;
    }

    static toggleNameOption(name, display) {
        let select = document.querySelector("select[name='name']");
        let option = select.querySelector(`option[value='${name}']`);
        option.style.display = display;
    }
}
