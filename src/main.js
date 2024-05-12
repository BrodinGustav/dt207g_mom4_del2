//Definierar URL:S
const apiUrl = "http://localhost:3000/api";
const url_Register = `${apiUrl}/register`;
const url_LogIn = `${apiUrl}/login`;
const url_Protected = `${apiUrl}/protected`;

//****HÄNDELSELYSSNARE****
document.addEventListener("DOMContentLoaded", function() {
console.log("Kod körs efter DOMContent");


const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Kontrollera om formulär finns
if (!registerForm || !loginForm) {
    console.error("Kan inte hitta formulär.");
    return;
}

//Händelselyssnare för register-formulär
registerForm.addEventListener("submit", async function(event) {
    console.log("submit-händelsen har inträffat på registerForm");


    event.preventDefault();
    
    //Hämtar in input från ID:fält
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

 // Kontrollera inputfälten
 if (!username || !password) {
    console.error("Användarnamn och lösenord krävs.");
    return;
}

// Array för error
let errors = [];

if (!username) {
    errors.push("Användarnamn krävs");
}

if (!password) {
    errors.push("Lösenord krävs");
}

console.log("Errors efter kontroll:", errors);


// Om error avbryt formulär
if (errors.length > 0) {
    console.log(errors);            //Loggar error för att se om utskrift sker
    displayErrors(errors);
    return;
}
//Om godkänt skicka data till server
    await createUser(username, password);

    // Återställ input-fälten till tomma strängar
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";

    console.log("Kod efter registrering har körts");

});

//Händelselyssnare för login-forumlär
loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();
    
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    

 // Kontrollera inputfälten
 if (!username || !password) {
    console.error("Användarnamn och lösenord krävs.");
    return;
}

 // Array för error
 let errors = [];


if (!username) {
    errors.push("Användarnamn krävs");
}

if (!password) {
    errors.push("Lösenord krävs");
}

// Om error avbryt formulär
if (errors.length > 0) {
    displayErrors(errors);
    return;
}
//Om godkänt skicka data till server
    await logIn(username, password);

    // Återställ input-fälten till tomma strängar
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
});
});

//****FUNKTIONER****

//Funktion för felmeddelanden
function displayErrors(errors) {
    const errorList = document.getElementById("error_list");
    errorList.innerHTML= "";

errors.forEach(error => {
    const li = document.createElement("li");
    li.textContent = error;
    errorList.appendChild(li);
});
} 


//Funktion för att skapa användare
async function createUser(username, password) {             //Argument från servern skickas med vid fetch

    try {
        const response = await fetch(url_Register, {        //Fetchar från URL gällande registrering
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
    
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log(data);                                  //Skriver ut svar från servern

    } catch (error) {
        console.error("Error registering user:", error);
    }
}

//Funktion för att logga in 
async function logIn(username, password) {              //Argument från servern skickas med vid fetch
 
    try {
        const response = await fetch(url_LogIn, {        //Fetchar från URL gällande login
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
 
        const data = await response.json();
        console.log(data);                              //Skriver ut svar från servern
 
        if (data.token) {
            localStorage.setItem("token", data.token);      //Lagra token i localStorage om lyckad inlogg
            await getProtectedData();
        }
 
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

//Funktion för att hämta skyddad data
async function getProtectedData() {

    try {
        const token = localStorage.getItem("token");     //Hämtar token från localStorage vid fetch
        const response = await fetch(url_Protected, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        const data = await response.json();
        console.log(data);
    
        //Hämtar ID
        document.getElementById("protectedContent").textContent = JSON.stringify(data);     //Skriver ut data från ID hämtad från servern
        document.getElementById("protectedData").style.display = "block";                   //Visar ID vid hämtning av serverdata
    
    } catch (error) {
        console.error("Error fetching protected data:", error);
    }
}

//Funktion för att logga ut
function logOut() {
    localStorage.removeItem("token");                                           //Tar bort token vid utlogg
    document.getElementById("protectedData").style.display = "none";            //Gömmer ID vid utlogg
}