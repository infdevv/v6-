document.addEventListener("DOMContentLoaded", async function() {

    setTimeout(async function() {

        if (localStorage.getItem("aboutbrowser_passwordmgr_password") !== null) {
            let attempt = prompt("What is your Password Manager password?");
            let correct_password = localStorage.getItem("aboutbrowser_passwordmgr_password");

            let hashed = await hash(attempt);
            if (correct_password !== hashed && attempt !== null) {
                alert("Incorrect password.");
                location.reload();
            }

            if (correct_password === hashed) {
                let passwords = localStorage.getItem("aboutbrowser_passwordmgr_passwords");
                let decrypted_json = JSON.parse(await decrypt(passwords, attempt));

                // Assuming .actualcontent is a div or similar container
                let container = document.getElementById("actualContent");

                decrypted_json.forEach(entry => {
                    let entryDiv = document.createElement('div');
                    entryDiv.classList.add('entry');
                    entryDiv.innerHTML = `
                        <p><strong>Domain:</strong> ${entry.domain}</p>
                        <p><strong>Email:</strong> ${entry.email}</p>
                        <p><strong>Password:</strong> ${entry.password}</p>
                        <hr/>
                    `;
                    container.appendChild(entryDiv);
                });
            }
        } else {
            let new_password = prompt("Enter a vault password");

            localStorage.setItem("aboutbrowser_passwordmgr_password", await hash(new_password));
            await addPassword("vault", "vault", new_password, new_password);
            alert("Created vault!");
            location.reload();
        }
    }, 1000);

});

async function addPassword(domain, email, password, masterPassword) {
    // Retrieve the existing encrypted passwords from localStorage
    let encryptedPasswords = localStorage.getItem("aboutbrowser_passwordmgr_passwords");

    // Decrypt the existing passwords
    let decryptedPasswords = [];
    if (encryptedPasswords) {
        decryptedPasswords = JSON.parse(await decrypt(encryptedPasswords, masterPassword));
    }

    // Add the new password entry
    decryptedPasswords.push({ domain: domain, email: email, password: password });

    // Encrypt the updated password list
    let updatedEncryptedPasswords = await encrypt(JSON.stringify(decryptedPasswords), masterPassword);

    // Store the updated encrypted passwords back into localStorage
    localStorage.setItem("aboutbrowser_passwordmgr_passwords", updatedEncryptedPasswords);
}

document.getElementById("addPasswordBtn").addEventListener("click", async function() {
    let domain = prompt("Enter the domain:");
    let email = prompt("Enter the email:");
    let password = prompt("Enter the password:");
    let masterPassword = prompt("Enter your master password:");

    // Assuming the correct password has already been verified
    await addPassword(domain, email, password, masterPassword);
    alert("Password added successfully!");
});
