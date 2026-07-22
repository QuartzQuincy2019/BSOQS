// themes.js
const THEMES = ["bright", "dark"];

function changeTheme() {
    let href = E_ThemeController.getAttribute("href");
    console.log(href);
    var currentTheme = "";
    E_ThemeController.classList.contains("ExternalCSSLink")
        ? (currentTheme = href.slice(14, -4))
        : (currentTheme = href.slice(13, -4));
    let index = THEMES.lastIndexOf(currentTheme);
    let target = "";
    if (index == THEMES.length - 1) {
        target = THEMES[0];
    } else {
        target = THEMES[index + 1];
    }
    E_ThemeController.classList.contains("ExternalCSSLink")
        ? E_ThemeController.setAttribute(
              "href",
              "../css/themes/" + target + ".css",
          )
        : E_ThemeController.setAttribute(
              "href",
              "./css/themes/" + target + ".css",
          );
}

window.addEventListener("keydown", (e) => {
    if (e.key == "c") {
        e.preventDefault();
        changeTheme();
    }
});
if (document.getElementById("ClockArea")) {
    document.getElementById("ClockArea").addEventListener("click", (e) => {
        e.preventDefault();
        changeTheme();
    });
}
if (document.getElementById("ExternalNotice")) {
    document.getElementById("ExternalNotice").addEventListener("click", (e) => {
        e.preventDefault();
        changeTheme();
    });
}

// 侦测用户浏览器主题偏好变化，随之更改页面主题

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// 定义一个处理变化的函数
const handleThemeChange = (event) => {
    if (event.matches) {
        console.log("主题已切换为：暗色");
        setThemeAs("dark");
    } else {
        console.log("主题已切换为：亮色");
        setThemeAs("bright");
    }
};

// 监听主题变化事件[reference:10]
darkModeMediaQuery.addEventListener("change", handleThemeChange);
