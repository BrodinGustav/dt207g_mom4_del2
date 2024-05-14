//Definierar URL:S
const apiUrl = "http://localhost:3000/api";
const url_Register = `${apiUrl}/register`;
const url_LogIn = `${apiUrl}/login`;
const url_Protected = `${apiUrl}/protected`;

//****HÄNDELSELYSSNARE****
document.addEventListener("DOMContentLoaded", function() {

//Hämta ID för formulär
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Kontrollera om formulär finns
if (!registerForm || !loginForm) {
    console.error("Kan inte hitta formulär.");
    return;
}

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
     await logIn(username, password);

    // Återställ input-fälten till tomma strängar
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";

});


//Händelselyssnare för register-formulär
registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();
    
    //Hämtar in input från ID:fält
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

 // Kontrollera inputfälten
 if (!username || !password) {
    console.error("Användarnamn och lösenord krävs.");
    return;
}

document.getElementById("correctMessage").style.display ="block";
console.log("Utskrift");


await createUser(username, password);

    // Återställ input-fälten till tomma strängar
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";

});

});

//****FUNKTIONER****

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
            window.location.href = "protected.html";                     
 
        } else {
            // Vid felaktiga användaruppgifter, visa felmeddelande
            const errorContainer = document.getElementById("error_container");
            const errorList = document.getElementById("error_list");
            
            errorList.innerHTML = "";                       // Rensa tidigare felmeddelanden
            const li = document.createElement("li");        //Skapar li-element för error-meddelande
            
            li.textContent = "Fel användarnamn eller lösenord.";
            li.style.color = "white"; 
            li.style.listStyle = "none"; 
            li.style.textAlign = "center"; 
            
            errorList.appendChild(li);                      //Slår ihop li-element med ul-element
            errorContainer.style.display = "block";         //Visar felmeddelanden

            const register = document.getElementById("registerForm");
            const login = document.getElementById("loginForm");
            register.style.display = "none";                        //Döljer formulär för registrering vid felmeddelande
            login.style.display = "none";                           //Döljer formulär för inlogg vid felmeddelande
          
            // Knapp för att skicka användaren till startsidan
            const backButton = document.createElement("button");
            backButton.classList.add("back-button");                // Lägger till klass för CSS
            backButton.textContent = "Tillbaka till startsidan";
            backButton.addEventListener("click", () => {
            window.location.href = "/";  
        });
    
    errorContainer.appendChild(backButton);                         //Lägger till knapp till error-containern
}

    } catch (error) {
        console.error("Error logging in:", error);
    }

}


