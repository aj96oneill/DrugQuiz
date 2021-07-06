const drugData = JSON.parse(localStorage.getItem("drugData"));
var tableBody = document.getElementById('tableBody');

drugData.forEach(drug => {
    var row = tableBody.insertRow(drug['number'] - 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = drug['number'];
    cell2.innerHTML = drug['generic'];
    cell3.innerHTML = drug['brand'];
    cell4.innerHTML = drug['indication'];
    cell5.innerHTML = drug['therapeudic_class'];
    cell6.innerHTML = drug['signatura'];
});