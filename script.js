function toggleTheme() {
    const body = document.body;
    
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light-mode");
    }
}

// Load theme preference on page load
window.onload = function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    } else {
        document.body.classList.add("light-mode");
    }
    fetchUsers();
};

// Fetch users from the database and display them
function fetchUsers() {
    fetch('fetch_users.php')
        .then(response => response.json())
        .then(users => {
            const userTable = document.getElementById("userTable");
            userTable.innerHTML = ""; // Clear existing content

            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.UserID}</td>
                    <td>${user.FullName}</td>
                    <td>${user.Email}</td>
                    <td><button onclick="deleteUser(${user.UserID})">Delete</button></td>
                `;
                userTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
}
