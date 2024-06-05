//Definierar URL:S
const apiUrl = "http://localhost:3000/api";
const url_Register = `${apiUrl}/register`;
const url_LogIn = `${apiUrl}/login`;
const url_Protected = `${apiUrl}/protected`;

//Kontroll om token finns när sidan laddas
document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");
    if(!token) {
        window.location.href = "index.html";
    } else {
        getProtectedData();
    }
})


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

        //Kontroll om token är ogiltig/saknas. Om så, dirigera användaren till startsidan
        if(response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
        }
    
        const data = await response.json();
        console.log(data);
    
        //Hämtar ID
        const protectedContent = document.getElementById("protectedContent");
        protectedContent.classList.add("protectedContent")
        protectedContent.innerHTML = `<p>Välkommen till den skyddade sidan!</p>
        <p>Mvh Gustav Brodin</p>`;
        const protectedData = document.getElementById("protectedData")
        protectedData.classList.add("protectedData")
    
    } catch (error) {
        console.error("Error fetching protected data:", error);
         // Om ett fel, omdirigera till inloggningssidan
         window.location.href = 'index.html';
    }
}

//Funktion för att logga ut
function logOut() {
    localStorage.removeItem("token");                                           //Tar bort token vid utlogg
    document.getElementById("protectedData").style.display = "none";            //Gömmer ID vid utlogg
    window.location.href = 'index.html';
}