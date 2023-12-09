class homeTab extends tab {
    constructor(title, id, svgPath, parent, housemates, active = false) {
        super(title, id, svgPath, parent, active);
        this.housemates = housemates;
        this.tab = document.getElementById(this.id);
        this.homeHeading = this._heading("Home Info", "Edit Home");
        this.homeInfoView = this._homeInfoView();
        this.housematesHeading = document.createElement("h2");
        this.housematesHeading.innerHTML = "Housemates";
        this.housematesView = this._housematesView();
        this._addClass("tab-components");
        this.tab.appendChild(this.homeHeading);
        this.tab.appendChild(this.homeInfoView);
        this.tab.appendChild(this.housematesHeading);
        this.tab.appendChild(this.housematesView);
    }

    _heading(title, buttonText) {
        let heading = document.createElement("div");
        let titleElement = document.createElement("h2");
        titleElement.innerHTML = title;
        let button = document.createElement("button");
        button.innerHTML = buttonText;
        heading.appendChild(titleElement);
        heading.appendChild(button);
        heading.style.display = "flex";
        heading.style.justifyContent = "space-between";
        heading.style.alignItems = "center";
        return heading;
    }

    _homeInfoView() {
        let div = document.createElement("div");
        let info = document.createElement("div");
        let name = document.createElement("h3");
        name.innerHTML = "Team A1";
        let address = document.createElement("p");
        address.innerHTML = "123 Main St.<br>Town, State 12345,<br>USA";
        info.appendChild(name);
        info.appendChild(address);
        let leaderboard = document.createElement("div");
        let leaderboardTitle = document.createElement("h3");
        leaderboardTitle.innerHTML = "Leaderboard";
        let leaderboardList = document.createElement("ol");
        let first = document.createElement("li");
        first.innerHTML = "Maher";
        let second = document.createElement("li");
        second.innerHTML = "James";
        let third = document.createElement("li");
        third.innerHTML = "Arsh and Mohammad";
        leaderboardList.appendChild(first);
        leaderboardList.appendChild(second);
        leaderboardList.appendChild(third);
        leaderboard.appendChild(leaderboardTitle);
        leaderboard.appendChild(leaderboardList);

        div.appendChild(info);
        div.appendChild(leaderboard);
        return div;
    }

    _housematesView() {
        let div = document.createElement("div");
        this.housemates.forEach((housemate) => {
            let avatar = document.createElement("img");
            avatar.src = "assets/avatars/" + housemate + ".svg";
            avatar.alt = housemate;
            avatar.classList.add("avatar");
            let housemateView = document.createElement("div");
            housemateView.classList.add("housemate");
            let housemateName = document.createElement("h3");
            housemateName.innerHTML = housemate;
            housemateView.appendChild(avatar);
            housemateView.appendChild(housemateName);
            div.appendChild(housemateView);
        });
        let imgDiv = document.createElement("div");
        let img = document.createElement("img");
        img.src = "assets/plus-icon.svg";
        img.alt = "Add Housemate";
        imgDiv.appendChild(img);
        imgDiv.classList.add("housemate");
        div.appendChild(imgDiv);
        imgDiv.style.display = "flex";
        imgDiv.style.flexDirection = "column";
        imgDiv.style.justifyContent = "center";
        imgDiv.style.alignItems = "center";
        return div;
    }

    _addClass(className) {
        this.homeHeading.classList.add(className);
        this.homeInfoView.classList.add(className);
        this.housematesHeading.classList.add(className);
        this.housematesView.classList.add(className);
    }
}
