// themes.js
var E_ThemeController = document.getElementById("ThemeController");
const THEMES = ["bright", "dark"];

function changeTheme() {
    var currentTheme = E_ThemeController.getAttribute("href").slice(13, -4);
    let index = THEMES.lastIndexOf(currentTheme);
    let target = "";
    if (index == THEMES.length - 1) {
        target = THEMES[0]
    } else {
        target = THEMES[index + 1];
    };
    E_ThemeController.setAttribute("href", "./css/themes/" + target + ".css");
}

window.addEventListener("keydown", (e) => {
    if (e.key == "c") {
        e.preventDefault();
        changeTheme();
    }
})