/*
const parentElement = document.getElementById('parentElement');
const openButton = document.getElementById('openButton');

function openPopup() {
  const popupElement = document.createElement('div');
  popupElement.id = 'popupElement';

  const closeButton = document.createElement('button');
  closeButton.id = 'closeButton';
  closeButton.innerHTML = '&times;';

  popupElement.appendChild(closeButton);

  parentElement.appendChild(popupElement);
}

function closePopup() {
  const popupElement = document.getElementById('popupElement');
  parentElement.removeChild(popupElement);
}

openButton.addEventListener('click', openPopup);
parentElement.addEventListener('click', function (event) {
  if (event.target.matches('#closeButton')) {
    closePopup();
  }
});
*/

let globalPopupField1 = 1;
let globalPopupField2 = 2;

class expensesTab extends tab {
    constructor(title, id, svgPath, parent, housemates, active = false) {
        super(title, id, svgPath, parent, active);
        this.housemates = housemates;
        let tab = document.getElementById(this.id);
        this.budget = 3000;
        this.expenseAssignees = [];
        this.expenses = {
            Rent: [
                2000,
                [housemates[1], housemates[2], housemates[3], housemates[4]],
                [
                    ["2023-11-01", housemates[1], 500],
                    ["2023-11-01", housemates[2], 500],
                    ["2023-11-01", housemates[3], 500],
                    ["2023-11-01", housemates[4], 500],
                ],
            ],
            Electricity: [
                200,
                [housemates[1]],
                [["2023-11-11", housemates[1], 200]],
            ],
            Internet: [
                50,
                [housemates[4]],
                [["2023-11-14", housemates[4], 50]],
            ],
            Food: [
                500,
                [housemates[3]],
                [
                    ["2023-11-04", housemates[3], 100],
                    ["2023-11-11", housemates[3], 150],
                    ["2023-11-23", housemates[3], 120],
                ],
            ],
            Toiletries: [
                200,
                [housemates[2]],
                [
                    ["2023-11-02", housemates[2], 40],
                    ["2023-11-12", housemates[2], 50],
                    ["2023-11-22", housemates[2], 50],
                ],
            ],
        };
        console.log(this.expenses);
        this.indExpenses = {
            Me: {},
            Maher: {
                Rent: 500,
                Electricity: 200,
            },
            James: {
                Rent: 500,
            },
            Arsh: {
                Rent: 500,
                Food: 200,
            },
            Mohammad: {
                Rent: 500,
                Internet: 0,
            },
        };

        console.log(this.expenses);

        this.budgetSecState = 0;
        this.summariesSecState = 0;
        this.budgetSection = document.createElement("div");
        this.expensesSection = document.createElement("div");
        this.summariesSection = document.createElement("div");

        let tableContainer = document.createElement("div");
        let table = document.createElement("table");
        tableContainer.appendChild(table);
        tableContainer.id = "tableContainer";
        table.id = "expTable";

        let addExpenseBtn = document.createElement("button");
        addExpenseBtn.innerHTML = "Add Expense";
        addExpenseBtn.id = "addExpenseButton";
        let removeExpenseBtn = document.createElement("button");
        removeExpenseBtn.innerHTML = "Remove Expense";
        removeExpenseBtn.id = "removeExpenseButton";

        this.expensesSection.append(tableContainer);
        this.expensesSection.append(addExpenseBtn);
        this.expensesSection.append(removeExpenseBtn);
        this.popupState = 0;

        this.currentSummary = null;

        this.balanceSection = this.balance();

        this.budgetSection.classList.add("tab-components");
        this.expensesSection.classList.add("tab-components");
        this.summariesSection.classList.add("tab-components");
        this.balanceSection.classList.add("tab-components");

        tab.appendChild(this.budgetSection);
        tab.appendChild(this.expensesSection);
        tab.appendChild(this.summariesSection);
        tab.appendChild(this.balanceSection);
    }

    load() {
        this.toggleBudgetSection();
        this.showTable();
        this.showExpenseSummaries();

        let addExpenseButton = document.getElementById("addExpenseButton");
        let removeExpenseButton = document.getElementById(
            "removeExpenseButton"
        );
        addExpenseButton.addEventListener("click", () => {
            this.popupState = 0;
            this.expensesSection.appendChild(this.createPopup());
        });
        removeExpenseButton.addEventListener("click", () => {
            this.popupState = 1;
            this.expensesSection.appendChild(this.createPopup());
        });
    }

    toggleBudgetSection() {
        this.budgetSection.innerHTML = "";
        if (this.budgetSecState == 0) {
            let budgetDiv = document.createElement("div");
            budgetDiv.classList.add("budget-header");
            let budgetLabel = document.createElement("div");
            let totalExpensesLabel = document.createElement("div");
            let remBudgetLabel = document.createElement("div");
            budgetLabel.innerHTML = `<h2>Current Budget: $${this.budget}</h2>`;
            budgetLabel.id = "budgetLabel";
            totalExpensesLabel.innerHTML = `<h4>Total Expenses: $${(() => {
                let sum = 0;
                for (const key in this.expenses) {
                    sum = sum + parseInt(this.expenses[key][0]);
                }
                console.log(sum);
                return sum;
            })()}</h4>`;
            remBudgetLabel.innerHTML = `<h4>Remaining Budget: $${
                this.budget - this.getTotalExpenses()
            }</h4>`;

            let budgetButton = document.createElement("button");
            budgetButton.textContent = "Modify Budget";
            budgetButton.addEventListener("click", () => {
                this.budgetSecState = 1;
                this.toggleBudgetSection();
            });
            budgetDiv.appendChild(budgetLabel);
            budgetDiv.appendChild(budgetButton);
            this.budgetSection.appendChild(budgetDiv);
            this.budgetSection.appendChild(totalExpensesLabel);
            this.budgetSection.appendChild(remBudgetLabel);
        } else if (this.budgetSecState == 1) {
            let budgetTextBox = document.createElement("input");
            budgetTextBox.setAttribute("type", "number");
            budgetTextBox.setAttribute("value", this.budget);
            let budgetButton = document.createElement("button");
            budgetButton.textContent = "Confirm";
            budgetButton.classList.add("positive-button");
            budgetButton.addEventListener("click", () => {
                this.budgetSecState = 0;
                this.budget = budgetTextBox.value;
                this.toggleBudgetSection();
            });
            this.budgetSection.appendChild(budgetTextBox);
            this.budgetSection.appendChild(budgetButton);
        }
    }

    showTable() {
        let table = document.getElementById("expTable");
        table.innerHTML = "";
        let headerRow = document.createElement("tr");
        let heading1 = document.createElement("th");
        heading1.innerHTML = "Name";
        let heading2 = document.createElement("th");
        heading2.innerHTML = "Amount";
        let heading3 = document.createElement("th");
        heading3.innerHTML = "Assigned";
        headerRow.appendChild(heading1);
        headerRow.appendChild(heading2);
        headerRow.appendChild(heading3);
        table.appendChild(headerRow);

        for (const key in this.expenses) {
            let row = document.createElement("tr");
            let tdName = document.createElement("td");
            let tdAmount = document.createElement("td");
            let tdAssigned = document.createElement("td");

            tdName.innerHTML = key;
            tdAmount.innerHTML = this.expenses[key][0];
            tdAssigned.innerHTML = this.expenses[key][1].join(", ");
            row.appendChild(tdName);
            row.appendChild(tdAmount);
            row.appendChild(tdAssigned);
            table.appendChild(row);
        }
    }

    createPopup() {
        let popup = document.createElement("div");
        popup.id = "expPupEl";
        let closeBtn = document.createElement("button");
        closeBtn.id = "expCloseBtn";
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("click", (event) => {
            let grandParent = event.target.parentNode.parentNode;
            let popup = document.getElementById("expPupEl");
            grandParent.removeChild(popup);
            this.expenseAssignees = [];
        });

        let popupContent = document.createElement("div");
        popupContent.id = "expPupContent";

        let inpfield1;
        let inpfield2;
        if (this.popupState == 0) {
            let field1 = document.createElement("div");
            let labelfield1 = document.createElement("label");
            labelfield1.innerHTML = "<strong>Expense Name</strong><br>";
            inpfield1 = document.createElement("input");
            inpfield1.setAttribute("type", "text");
            inpfield1.classList.add("expInput");
            inpfield1.style.width = "80%";
            field1.appendChild(labelfield1);
            field1.appendChild(inpfield1);
            popupContent.appendChild(field1);

            let field2 = document.createElement("div");
            let labelfield2 = document.createElement("label");
            labelfield2.innerHTML = "<strong>Expense Amount</strong>";
            inpfield2 = document.createElement("input");
            inpfield2.setAttribute("type", "number");
            inpfield2.style.width = "80%";
            inpfield2.classList.add("expInput");
            field2.appendChild(labelfield2);
            field2.appendChild(inpfield2);
            popupContent.appendChild(field2);
            popupContent.appendChild(
                this.housematesCheckboxes(this.housemates)
            );
        } else if (this.popupState == 1) {
            let field1 = document.createElement("div");
            let labelfield1 = document.createElement("label");
            labelfield1.innerHTML = "<strong>Expense to Remove</strong><br>";
            inpfield1 = document.createElement("select");
            inpfield1.style.width = "80%";
            for (const key in this.expenses) {
                let option = document.createElement("option");
                option.value = key;
                option.innerHTML = key;
                inpfield1.appendChild(option);
            }
            field1.appendChild(labelfield1);
            field1.appendChild(inpfield1);
            popupContent.appendChild(field1);
        }

        let confirmBtn = document.createElement("button");
        confirmBtn.innerHTML = this.popupState ? "Remove" : "Add";
        if (confirmBtn.classList[0] != undefined) {
            confirmBtn.classList[0] = this.popupState
                ? "negative-button"
                : "positive-button";
        } else {
            confirmBtn.classList.add(
                this.popupState ? "negative-button" : "positive-button"
            );
        }
        confirmBtn.style.margin = "1rem";
        confirmBtn.addEventListener("click", (event) => {
            if (this.popupState == 0) {
                this.expenses[inpfield1.value] = [
                    inpfield2.value,
                    this.expenseAssignees,
                    [],
                ];
            } else if (this.popupState == 1) {
                delete this.expenses[inpfield1.value];
            }
            let grandParent = event.target.parentNode.parentNode;
            let popup = document.getElementById("expPupEl");
            grandParent.removeChild(popup);
            this.toggleBudgetSection();
            this.showTable();
            this.showExpenseSummaries();
            this.expenseAssignees = [];
            this.updateSummariesTables();
        });

        popup.appendChild(closeBtn);
        popup.appendChild(popupContent);
        //popup.appendChild(this.housematesCheckboxes(this.housemates))
        popup.appendChild(confirmBtn);
        return popup;
    }

    housematesCheckboxes(housemates) {
        let div = document.createElement("div");
        div.innerHTML = "<strong>Assignees:</strong> <br>";
        housemates.forEach((hm) => {
            let checkboxLabel = document.createElement("label");
            checkboxLabel.innerHTML = hm;
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.disabled = false;
            checkbox.checked = false;
            checkbox.name = "housemates";
            checkbox.value = hm;
            checkbox.addEventListener("input", (event) => {
                if (event.target.checked) {
                    this.expenseAssignees.push(event.target.value);
                } else {
                    let updatedAssignees = [];
                    for (
                        let index = 0;
                        index < this.expenseAssignees.length;
                        index++
                    ) {
                        if (
                            event.target.value != this.expenseAssignees[index]
                        ) {
                            updatedAssignees.push(this.expenseAssignees[index]);
                        }
                    }
                    this.expenseAssignees = updatedAssignees;
                    updatedAssignees = null;
                }
                console.log(this.expenseAssignees);
            });

            checkboxLabel.appendChild(checkbox);
            div.appendChild(checkboxLabel);
        });
        div.classList.add("checkboxes");
        return div;
    }

    getTotalExpenses() {
        let sum = 0;
        for (const key in this.expenses) {
            sum = sum + parseInt(this.expenses[key][0]);
        }
        return sum;
    }

    //--- Expenses Breakdown

    showExpenseSummaries() {
        this.summariesSection.innerHTML = "";

        let sectionHeader = document.createElement("h2");
        sectionHeader.innerHTML = "Balance Sheet";

        let subSection1 = document.createElement("div");
        subSection1.style.padding = "0rem, 1rem, 1rem, 1rem";

        let subSection2 = document.createElement("div");
        subSection2.style.width = "fit-content";
        subSection2.style.margin = "auto";

        let addEntryBtn = document.createElement("button");
        addEntryBtn.innerHTML = "Record Payment";
        addEntryBtn.id = "addEntryBtn";

        this.summariesSection.appendChild(sectionHeader);

        if (this.summariesSecState == 0) {
            let selectionLabel = document.createElement("h4");
            let expenseSelection = document.createElement("select");
            let remainingBudget = document.createElement("h4");

            for (const key in this.expenses) {
                let option = document.createElement("option");
                option.value = key;
                option.innerHTML = key;
                expenseSelection.appendChild(option);
            }

            expenseSelection.selectedIndex = this.currentSummary
                ? this.currentSummary[1]
                : 0;

            remainingBudget.innerHTML = `Remaining Allocated Budget: $${this.getRemainingBudget(
                expenseSelection.value
            )}`;

            let initTable = this.getPaymentSheetTable(expenseSelection.value);
            subSection2.appendChild(initTable);

            if (this.expenses[expenseSelection.value][1].includes("Me")) {
                subSection2.appendChild(addEntryBtn);
            }

            addEntryBtn.addEventListener("click", () => {
                this.summariesSecState = 1;
                this.showExpenseSummaries();
            });

            expenseSelection.addEventListener("input", (event) => {
                this.currentSummary = [
                    event.target.value,
                    event.target.selectedIndex,
                ];

                remainingBudget.innerHTML = "";
                subSection2.innerHTML = "";
                remainingBudget.innerHTML = `Remaining Allocated Budget: $${this.getRemainingBudget(
                    event.target.value
                )}`;
                subSection2.appendChild(
                    this.getPaymentSheetTable(event.target.value)
                );
                if (this.expenses[event.target.value][1].includes("Me")) {
                    subSection2.appendChild(addEntryBtn);
                }
            });

            selectionLabel.innerHTML = "Payment History: ";

            subSection1.appendChild(selectionLabel);
            selectionLabel.appendChild(expenseSelection);
            subSection1.appendChild(remainingBudget);

            this.summariesSection.appendChild(subSection1);
            this.summariesSection.appendChild(subSection2);
        } else if (this.summariesSecState == 1) {
            let newEntryHeader = document.createElement("h4");
            newEntryHeader.innerHTML = `New Entry For ${this.currentSummary[0]}`;
            let remainingBudget = document.createElement("h4");
            remainingBudget.innerHTML = `Remaining Allocated Budget: $${this.getRemainingBudget(
                this.currentSummary[0]
            )}`;
            let inpContainer1 = document.createElement("div");
            let label1 = document.createElement("label");
            label1.innerHTML = "Amount: $";
            let inpfield1 = document.createElement("input");
            inpfield1.type = "number";

            inpContainer1.appendChild(newEntryHeader);
            inpContainer1.appendChild(remainingBudget);
            inpContainer1.appendChild(label1);
            inpContainer1.appendChild(inpfield1);

            let submitBtn = document.createElement("button");
            submitBtn.innerHTML = "Submit";
            submitBtn.classList.add("positive-button");
            let cancelBtn = document.createElement("button");
            cancelBtn.innerHTML = "Cancel";
            cancelBtn.classList.add("negative-button");

            submitBtn.addEventListener("click", () => {
                this.summariesSecState = 0;
                let curDate = new Date();
                let newEntry = [
                    curDate.toLocaleDateString(),
                    "Me",
                    parseInt(inpfield1.value),
                ];
                this.expenses[this.currentSummary[0]][2].push(newEntry);

                this.showExpenseSummaries();
                this.updateSummariesTables();
            });

            cancelBtn.addEventListener("click", () => {
                this.summariesSecState = 0;
                this.showExpenseSummaries();
            });

            subSection1.appendChild(inpContainer1);

            subSection2.appendChild(cancelBtn);
            subSection2.appendChild(submitBtn);

            this.summariesSection.appendChild(subSection1);
            this.summariesSection.appendChild(subSection2);
        }
    }

    getPaymentSheetTable(expenseName) {
        let data = this.expenses[expenseName];
        let table = document.createElement("table");
        let headerRow = document.createElement("tr");
        let heading1 = document.createElement("th");
        heading1.innerHTML = "Payment Date";
        let heading2 = document.createElement("th");
        heading2.innerHTML = "Payment Amount";
        let heading3 = document.createElement("th");
        heading3.innerHTML = "Payer";
        headerRow.appendChild(heading1);
        headerRow.appendChild(heading3);
        headerRow.appendChild(heading2);
        table.appendChild(headerRow);

        for (let index = 0; index < data[2].length; index++) {
            let row = document.createElement("tr");
            let pd = document.createElement("td");
            let p = document.createElement("td");
            let pa = document.createElement("td");

            pd.innerHTML = data[2][index][0];
            p.innerHTML = data[2][index][1];
            pa.innerHTML = data[2][index][2];

            row.appendChild(pd);
            row.appendChild(p);
            row.appendChild(pa);
            table.appendChild(row);
        }

        console.log(table);
        table.style.margin = "auto";
        return table;
    }

    getRemainingBudget(expenseName) {
        let data = this.expenses[expenseName];
        let alloc = data[0];
        let spent = 0;

        for (let i = 0; i < data[2].length; i++) {
            spent = spent + parseInt(data[2][i][2]);
        }

        return parseInt(alloc) - spent;
    }

    balance() {
        let balanceSection = document.createElement("div");
        balanceSection.id = "balanceSummarySection";
        let header = document.createElement("h2");
        header.innerHTML = "Balance Summaries";

        let label = document.createElement("div");
        label.innerHTML = "Show: ";
        label.style.marginBottom = "1rem";
        let categoryRadio = this.createRadioButton("category", "By Category");
        let housemateRadio = this.createRadioButton(
            "housemate",
            "By Housemate",
            true
        );
        label.appendChild(housemateRadio);
        label.appendChild(categoryRadio);
        label.addEventListener("change", (event) => {
            if (event.target.value === "category") {
                document.getElementById("categoryTable").style.display =
                    "table";
                document.getElementById("housemateTable").style.display =
                    "none";
            } else {
                document.getElementById("categoryTable").style.display = "none";
                document.getElementById("housemateTable").style.display =
                    "table";
            }
        });

        let categoryTotal = {};
        let housemateTotal = {};

        for (const category in this.expenses) {
            const [, assignees, contributionHistory] = this.expenses[category];

            // Total spent by category
            categoryTotal[category] = contributionHistory.reduce(
                (total, [, , amount]) => total + amount,
                0
            );

            // Total spent by housemate
            assignees.forEach((housemate) => {
                if (!housemateTotal[housemate]) {
                    housemateTotal[housemate] = 0;
                }

                const contributions = contributionHistory.filter(
                    ([, contributor]) => contributor === housemate
                );
                housemateTotal[housemate] += contributions.reduce(
                    (total, [, , amount]) => total + amount,
                    0
                );
            });
        }

        // Generate HTML tables
        let categoryTable = this.getSummaryTable(categoryTotal, "Category");
        categoryTable.id = "categoryTable";
        categoryTable.style.display = "none";
        let housemateTable = this.getSummaryTable(housemateTotal, "Housemate");
        housemateTable.id = "housemateTable";

        balanceSection.appendChild(header);
        balanceSection.appendChild(label);
        balanceSection.appendChild(categoryTable);
        balanceSection.appendChild(housemateTable);
        return balanceSection;
    }

    createRadioButton(value, labelText, checked = false) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "summaryTableView";
        radio.value = value;
        radio.checked = checked;

        let radioLabel = document.createElement("label");
        radioLabel.appendChild(radio);
        radioLabel.appendChild(document.createTextNode(labelText)); // Use createTextNode to add text content

        return radioLabel;
    }

    getSummaryTable(data, primaryColumnName) {
        let table = document.createElement("table");
        let tableHTML = `
                            <thead>
                                <tr>
                                    <th>${primaryColumnName}</th>
                                    <th>Total Amount Paid</th>
                                </tr>
                            </thead>
                            <tbody>`;

        for (const key in data) {
            tableHTML += `<tr>
                            <td>${key}</td>
                            <td>${data[key]}</td>
                          </tr>`;
        }
        tableHTML += `</tbody>`;

        table.innerHTML = tableHTML;
        return table;
    }

    updateSummariesTables() {
        const newBalanceSection = this.balance(); // Recreate the balance section
        const existingBalanceSection = document.getElementById(
            "balanceSummarySection"
        );

        // Replace the existing balance section with the updated one
        existingBalanceSection.parentNode.replaceChild(
            newBalanceSection,
            existingBalanceSection
        );
        newBalanceSection.classList.add("tab-components");
    }
}
