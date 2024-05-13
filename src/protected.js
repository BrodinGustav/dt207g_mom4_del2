//Definierar URL:S
const apiUrl = "http://localhost:3000/api";
const url_Register = `${apiUrl}/register`;
const url_LogIn = `${apiUrl}/login`;
const url_Protected = `${apiUrl}/protected`;

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
        const protectedContent = document.getElementById("protectedContent");
        protectedContent.classList.add("protectedContent")
        protectedContent.innerHTML = `<p>Skyddad route</p><p>Här var ett forum tänkt att finnas. Men problem uppstod vid applicering av serverkod 
        med errorn "Error: Route.post() requires a callback function but got a [object Undefined]". Flertalet försök gjordes experimentering av kod utan framgång varpå
        tidspressen gjorde sig påtaglig närvarande. Därav endast denna enkla text som läses ut via skyddad route.</p>
        <p>Mvh Gustav Brodin</p>`;
        const protectedData = document.getElementById("protectedData")
        protectedData.classList.add("protectedData")
    
    } catch (error) {
        console.error("Error fetching protected data:", error);
    }
}

//Funktion för att logga ut
function logOut() {
    localStorage.removeItem("token");                                           //Tar bort token vid utlogg
    document.getElementById("protectedData").style.display = "none";            //Gömmer ID vid utlogg
    window.location.href = 'index.html';
}