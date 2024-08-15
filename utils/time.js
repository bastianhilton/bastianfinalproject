setInterval(myTimer, 1000);

function myTimer() {
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"
  ];
  const date = new Date();

  let name = month[date.getMonth()];
  const day = new Date().toLocaleString();

  document.getElementById("dateTime").innerHTML = name + " " + day;
}