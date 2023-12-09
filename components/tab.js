class tab {
    static _tabs = [];

    constructor(title, id, svgPath, parent, active = false) {
        this.id = id;
        let div = document.createElement("div");
        div.id = this.id;
        let heading = document.createElement("h1");
        let img = document.createElement("img");
        img.src = svgPath;
        img.alt = title + " tab icon";
        heading.appendChild(img);
        heading.innerHTML += title;
        div.appendChild(heading);
        if (!active) {
            div.style.display = "none";
        }
        div.classList.add("tab");
        parent.appendChild(div);
        tab._tabs.push(this);
    }

    showTab() {
        document.getElementById(this.id).style.display = "block";
        tab._tabs.forEach((tab) => {
            if (tab.id != this.id) {
                document.getElementById(tab.id).style.display = "none";
            }
        });
    }
}
