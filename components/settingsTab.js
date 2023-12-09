class settingsTab extends tab {
    constructor(title, id, svgPath, parent, active = false) {
        super(title, id, svgPath, parent, active);
        this.tab = document.getElementById(this.id);
        let div = document.createElement("div");
        this.notificationSettings = this._notificationSettings();
        this.displaySettings = this._displaySettings();
        div.appendChild(this.notificationSettings);
        div.appendChild(this.displaySettings);
        this.tab.appendChild(div);
        this._addClass("tab-components");
    }

    _notificationSettings() {
        let div = document.createElement("div");
        let title = document.createElement("h2");
        title.innerHTML = "Chore Reminders";
        let enableNotifications = document.createElement("div");
        enableNotifications.classList.add("setting-row");
        enableNotifications.innerHTML = "Enable Notifications";
        let enableNotificationsSwitch = document.createElement("input");
        enableNotificationsSwitch.type = "checkbox";
        enableNotificationsSwitch.name = "enableNotifications";
        enableNotificationsSwitch.checked = true;
        enableNotificationsSwitch.addEventListener("change", (event) => {
            if (event.target.checked) {
                window.alert("Notifications are enabled.");
                pushNotificationsSwitch.checked = true;
                emailNotificationsSwitch.checked = true;
                pushNotificationsSwitch.disabled = false;
                emailNotificationsSwitch.disabled = false;
            } else {
                window.alert(
                    "Notifications are disabled. You will not receive any notifications."
                );
                pushNotificationsSwitch.checked = false;
                emailNotificationsSwitch.checked = false;
                pushNotificationsSwitch.disabled = true;
                emailNotificationsSwitch.disabled = true;
            }
        });
        enableNotifications.appendChild(enableNotificationsSwitch);
        let pushNotifications = document.createElement("div");
        pushNotifications.classList.add("setting-row");
        pushNotifications.innerHTML = "Push Notifications";
        let pushNotificationsSwitch = document.createElement("input");
        pushNotificationsSwitch.type = "checkbox";
        pushNotificationsSwitch.name = "pushNotifications";
        pushNotificationsSwitch.checked = true;
        pushNotifications.appendChild(pushNotificationsSwitch);
        let emailNotifications = document.createElement("div");
        emailNotifications.classList.add("setting-row");
        emailNotifications.innerHTML = "Email Notifications";
        let emailNotificationsSwitch = document.createElement("input");
        emailNotificationsSwitch.classList.add("setting-row");
        emailNotificationsSwitch.type = "checkbox";
        emailNotificationsSwitch.name = "emailNotifications";
        emailNotificationsSwitch.checked = true;
        emailNotifications.appendChild(emailNotificationsSwitch);
        let remind = document.createElement("div");
        remind.classList.add("setting-row");
        remind.innerHTML = "Remind";
        let remindValueDiv = document.createElement("div");
        let remindValue = document.createElement("input");
        remindValue.type = "number";
        remindValue.value = 1;
        remindValueDiv.appendChild(remindValue);
        let remindUnit = document.createElement("select");
        let remindUnitOption1 = document.createElement("option");
        remindUnitOption1.text = "minutes";
        let remindUnitOption2 = document.createElement("option");
        remindUnitOption2.text = "hours";
        remindUnitOption2.selected = true;
        remindUnit.appendChild(remindUnitOption1);
        remindUnit.appendChild(remindUnitOption2);
        remindValueDiv.appendChild(remindUnit);
        remindValueDiv.appendChild(document.createTextNode("before due"));
        remind.appendChild(remindValueDiv);
        div.appendChild(title);
        div.appendChild(enableNotifications);
        div.appendChild(pushNotifications);
        div.appendChild(emailNotifications);
        div.appendChild(remind);
        let saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.classList.add("positive-button");
        div.appendChild(saveButton);
        return div;
    }

    _displaySettings() {
        let div = document.createElement("div");
        let title = document.createElement("h2");
        title.innerHTML = "Display";
        let theme = document.createElement("div");
        theme.classList.add("setting-row");
        theme.innerHTML = "Theme";
        let themeSelect = document.createElement("select");
        let lightTheme = document.createElement("option");
        lightTheme.text = "Light";
        let darkTheme = document.createElement("option");
        darkTheme.text = "Dark";
        themeSelect.appendChild(lightTheme);
        themeSelect.appendChild(darkTheme);
        theme.appendChild(themeSelect);
        let fontSize = document.createElement("div");
        fontSize.classList.add("setting-row");
        fontSize.innerHTML = "Font Size";
        let fontSizeSelect = document.createElement("select");
        let smallFont = document.createElement("option");
        smallFont.text = "Small";
        let mediumFont = document.createElement("option");
        mediumFont.text = "Medium";
        let largeFont = document.createElement("option");
        largeFont.text = "Large";
        fontSizeSelect.appendChild(smallFont);
        fontSizeSelect.appendChild(mediumFont);
        fontSizeSelect.appendChild(largeFont);
        fontSize.appendChild(fontSizeSelect);
        div.appendChild(title);
        div.appendChild(theme);
        div.appendChild(fontSize);
        let saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.classList.add("positive-button");
        div.appendChild(saveButton);
        return div;
    }

    _addClass(className) {
        this.notificationSettings.classList.add(className);
        this.displaySettings.classList.add(className);
    }
}
