function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

var modal = document.getElementById("myModal");

function closeModal() {
    modal.style.display = "none";
    document.getElementById("detailForm").reset();
    document.getElementById("rowIndex").value = "";
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

function showContent(contentId) {
    var contents = document.querySelectorAll('.content > div');
    contents.forEach(function(content) {
        content.style.display = 'none';
    });
    document.getElementById(contentId).style.display = 'block';
}

document.getElementById("homeBtn").onclick = function() {
    showContent('homeContent');
}

document.getElementById("newBtn").onclick = function() {
    openNewModal();
    showContent('tableContent');
    setActionMode('none');
    hideActionColumn();
}

document.getElementById("updateBtn").onclick = function() {
    showContent('tableContent');
    setActionMode('update');
    showActionColumn();
}

document.getElementById("deleteBtn").onclick = function() {
    showContent('tableContent');
    setActionMode('delete');
    showActionColumn();
}

document.getElementById('exitBtn').onclick = function() {}

document.getElementById("detailForm").onsubmit = function(event) {
    event.preventDefault();

    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var rowIndex = document.getElementById("rowIndex").value;

    if (rowIndex === "") {
        var newRow = document.createElement("tr");

        var titleCell = document.createElement("td");
        titleCell.textContent = title;
        newRow.appendChild(titleCell);

        var descriptionCell = document.createElement("td");
        descriptionCell.textContent = description;
        newRow.appendChild(descriptionCell);

        var actionCell = document.createElement("td");
        actionCell.className = "action-cell hidden";

        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.className = "action-button";
        updateButton.onclick = function() {
            openUpdateModal(newRow);
        };
        actionCell.appendChild(updateButton);
        
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function() {
            deleteRow(newRow);
        };
        actionCell.appendChild(deleteButton);
        
        newRow.appendChild(actionCell);

        document.getElementById("resultTable").querySelector("tbody").appendChild(newRow);

        showContent('tableContent');
        setActionMode('none');
        hideActionColumn();
    } else {
        var row = document.getElementById("resultTable").querySelectorAll("tbody tr")[rowIndex];
        row.cells[0].textContent = title;
        row.cells[1].textContent = description;
    }

    closeModal();
}

function openNewModal() {
    document.getElementById("rowIndex").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    modal.style.display = "block";
    document.getElementById("title").focus();
}

window.addEventListener("keydown", function(event) {
    if (event.key === "F5") {
        event.preventDefault();
        openNewModal();
        showContent('tableContent');
        setActionMode('none');
    }
});

function openUpdateModal(row) {
    var rowIndex = Array.prototype.indexOf.call(row.parentNode.children, row);
    var title = row.cells[0].textContent;
    var description = row.cells[1].textContent;

    document.getElementById("rowIndex").value = rowIndex;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;

    modal.style.display = "block";
    document.getElementById("title").focus();
}

function setActionMode(mode) {
    var rows = document.querySelectorAll("#resultTable tbody tr");
    rows.forEach(function(row) {
        var updateButton = row.querySelector(".action-button");
        var deleteButton = row.querySelector(".delete-button");
        if (mode === 'update') {
            updateButton.style.display = 'inline-block';
            deleteButton.style.display = 'none';
        } else if (mode === 'delete') {
            updateButton.style.display = 'none';
            deleteButton.style.display = 'inline-block';
        } else {
            updateButton.style.display = 'none';
            deleteButton.style.display = 'none';
        }
    });
}

function deleteRow(row) {
    row.remove();
}

function hideActionColumn() {
    var actionCells = document.querySelectorAll(".action-cell, .action-header");
    actionCells.forEach(function(cell) {
        cell.classList.add("hidden");
    });
}

function showActionColumn() {
    var actionCells = document.querySelectorAll(".action-cell, .action-header");
    actionCells.forEach(function(cell) {
        cell.classList.remove("hidden");
    });
}

// Initial content display
showContent('homeContent');

// Track which button was clicked
document.getElementById("newBtn").addEventListener("click", function() {
    this.clicked = true;
    document.getElementById("updateBtn").clicked = false;
    document.getElementById("deleteBtn").clicked = false;
});

document.getElementById("updateBtn").addEventListener("click", function() {
    this.clicked = true;
    document.getElementById("newBtn").clicked = false;
    document.getElementById("deleteBtn").clicked = false;
});

document.getElementById("deleteBtn").addEventListener("click", function() {
    this.clicked = true;
    document.getElementById("newBtn").clicked = false;
    document.getElementById("updateBtn").clicked = false;
});

document.getElementById('exitBtn').addEventListener('click', function() {
    var userConfirmation = confirm('Are you sure you want to exit?');
    if (userConfirmation) {
        window.open('', '_self', ''); // Workaround to bypass browser security
        window.close();
        // As a fallback, you can redirect if the window does not close
        setTimeout(function() {
            if (!window.closed) {
                window.location.href = 'https://www.example.com/goodbye';
            }
        }, 1000);
    }
});
