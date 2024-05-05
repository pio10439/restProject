import fs from 'fs';
import fetch from 'node-fetch';

const oauthUrl = 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize';
const requestData = {
    grant_type: 'client_credentials',
    client_id: '478022',
    client_secret: '0d337365eb1d939d921b8cc2e946e98f'
};

fetch(oauthUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(requestData)
})
.then(async (response) => {
    if (!response.ok) {
        throw new Error('Wystąpił problem podczas autoryzacji.');
    }
    const data = await response.json();
    const accessToken = data.access_token;
    console.log('Otrzymano token OAuth: ', accessToken);
    
    // Odczytujemy istniejącą zawartość pliku, jeśli istnieje
    fs.readFile('dane.json', 'utf8', (err, fileData) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Wystąpił błąd podczas odczytu pliku: ', err);
            return;
        }

        let existingData = '';
        try {
            // Jeśli plik istnieje, ustaw existingData na jego zawartość
            existingData = fileData || '';
        } catch (parseError) {
            console.error('Błąd podczas parsowania pliku JSON:', parseError);
            return;
        }

        // Rozdzielamy istniejące obiekty JSON na osobne linie
        const lines = existingData.trim().split('\n');
        // Dodajemy nowy token do każdego obiektu JSON
        const updatedLines = lines.map((line, index) => {
            // Parsujemy każdą linię jako obiekt JSON
            let parsedObject;
            try {
                parsedObject = JSON.parse(line);
                // Dodajemy nowy token do obiektu
                parsedObject.Token = accessToken;
            } catch (parseError) {
                console.error('Błąd podczas parsowania obiektu JSON:', parseError);
                return line;
            }
            // Zwracamy zaktualizowany obiekt JSON jako string
            return JSON.stringify(parsedObject) + (index < lines.length - 1 ? ',' : '');
        });

        // Zapisujemy zaktualizowaną zawartość do pliku
        fs.writeFile('dane.json', updatedLines.join('\n'), { flag: 'w+' }, (err) => {
            if (err) {
                console.error('Wystąpił błąd podczas zapisywania tokenu do pliku: ', err);
                return;
            }
            console.log('Token został pomyślnie dodany do pliku dane.json');
        });
    });
})
.catch(function(error) {
    console.error('Wystąpił błąd podczas autoryzacji: ', error);
});
