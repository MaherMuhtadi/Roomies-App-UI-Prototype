const housemates = ["Me", "Maher", "James", "Arsh", "Mohammad"];

const playPing = () => {
    let audio = new Audio("assets/audio/alert.mp3");
    audio.currentTime = 0.05; // skip the silence at the beginning
    audio.play();
};

const main = document.createElement("main");
document.body.appendChild(main);

const home = new homeTab(
    "Roomies",
    "home-tab",
    "assets/home-icon.svg",
    main,
    housemates,
    true
);
const chores = new choresTab(
    "Chores",
    "chores-tab",
    "assets/chores-icon.svg",
    main,
    housemates
);
const expenses = new expensesTab(
    "Expenses",
    "expenses-tab",
    "assets/expenses-icon.svg",
    main,
    housemates
);
expenses.load();
console.log(expenses);

const alerts = new alertsTab(
    "Alerts",
    "alerts-tab",
    "assets/alerts-icon.svg",
    main,
    "alerts-button"
);
const settings = new settingsTab(
    "Settings",
    "settings-tab",
    "assets/settings-icon.svg",
    main
);

const navbar = document.createElement("div");
navbar.id = "nav-bar";
main.appendChild(navbar);

const homeButton = new navButton(
    "Home",
    "home-button",
    "assets/home-icon.svg",
    home,
    navbar,
    true
);
const choresButton = new navButton(
    "Chores",
    "chores-button",
    "assets/chores-icon.svg",
    chores,
    navbar
);
const expensesButton = new navButton(
    "Expenses",
    "expenses-button",
    "assets/expenses-icon.svg",
    expenses,
    navbar
);
const alertsButton = new navButton(
    "Alerts",
    "alerts-button",
    "assets/alerts-icon.svg",
    alerts,
    navbar
);
const settingsButton = new navButton(
    "Settings",
    "settings-button",
    "assets/settings-icon.svg",
    settings,
    navbar
);

dummyChores(housemates);
