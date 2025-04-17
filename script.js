document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = [
        { username: 'President', password: 'QWERTY1234567890', security: 'Full' },
        { username: 'Finance Officer', password: 'PLKM1935', security: 'Full' },
        { username: 'Livestock Officer', password: 'THGN8362', security: 'Full' },
        { username: 'Northern Officer', password: 'JQNF0295', security: 'Full' },
        { username: 'Chris', password: '2468', security: 'None' },
        { username: 'Michael', password: 'Michael', security: 'None' },
        { username: 'Elissa', password: 'Elissa', security: 'None' },
        { username: 'Mackenzie', password: 'Mackenzie', security: 'None' },
        { username: 'John', password: 'John', security: 'None' },
        { username: 'Jane', password: 'Jane', security: 'None' }
    ];

    const errorMessage = document.getElementById('error-message');

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        if (user.security === 'Full') {
            window.location.href = `Dashboard.html?username=${encodeURIComponent(username)}`;
        } else {
            window.location.href = `Home.html?username=${encodeURIComponent(username)}`;
        }
    } else {
        errorMessage.textContent = 'Invalid username or password. Please try again.';
    }
});