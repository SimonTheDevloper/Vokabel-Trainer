// Funktion zum Mischen eines Arrays (Fisher-Yates-Algorithmus)
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]];
    }
    console.log("geshufelt")
    return array
}