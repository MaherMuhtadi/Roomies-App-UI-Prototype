class navButton {
    static _navButtons = [];

    constructor(text, id, svgPath, tab, parent, active = false) {
        this.tab = tab;
        this.id = id;
        let button = document.createElement("button");
        let img = document.createElement("img");
        img.src = svgPath;
        img.alt = text + " navigation button icon";
        button.appendChild(img);
        button.innerHTML += text;
        button.disabled = active;
        button.id = this.id;
        button.addEventListener("click", () => this._clickEventListener());
        parent.appendChild(button);
        navButton._navButtons.push(this);
    }

    _clickEventListener() {
        this.tab.showTab();
        document.getElementById(this.id).disabled = true;
        navButton._navButtons.forEach((button) => {
            if (button.id != this.id) {
                document.getElementById(button.id).disabled = false;
            }
        });
    }
}
