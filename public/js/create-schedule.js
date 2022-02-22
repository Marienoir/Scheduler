const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// set date to start showing dates from today starts
const today = new Date().toISOString().split("T")[0];
document.getElementsByName("date")[0].setAttribute("min", today);
// set date to start showing dates from today ends

const username = urlParams.get("username");
document.getElementById(
    "goto-dashboard"
).href = `/dashboard?username=${username}`;

let submit = document.getElementById("submit");
let a =  document.getElementById("time_of_schedule").value;
let b =  document.getElementById("name_of_schedule").value;
let c =  document.getElementById("place_of_schedule").value;
let d =  document.getElementById("purpose_of_schedule").value;
console.log('hhhhh',a,b,c,d);
submit.addEventListener("submit", (e) => {
    e.preventDefault();
let name_of_schedule =  document.getElementById("name_of_schedule").value;
let time =  document.getElementById("time_of_schedule").value;
let place_of_schedule =  document.getElementById("place_of_schedule").value;
let purpose_of_schedule =  document.getElementById("purpose_of_schedule").value;
let date = document.getElementById("date-input").value;
let a = `${date}T${time}`;
let time_of_schedule = new Date(a)
const data = {
    name_of_schedule,
    place_of_schedule,
    purpose_of_schedule,
    time_of_schedule
}

const token = localStorage.getItem('token');
// console.log(data, b, typeof a, typeof b );
    fetch('http://localhost:8080/api/v1/create-schedule', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.code === 201) {
                alert(`${data.message}. An email would be sent to you at the scheduled time`);
            } else {
                alert("Error!!! " + data.message);
            }
        })
        .catch((error) => {
            alert("Error!!! " + error);
        });
});
document.getElementById("date-input").value = "";
document.getElementById("name_of_schedule").value = "";
document.getElementById("time_of_schedule").value = "";
document.getElementById("purpose_of_schedule").value = "";
document.getElementById("place_of_schedule").value = "";
