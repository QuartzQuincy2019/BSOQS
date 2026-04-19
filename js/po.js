// 5 po.js
// 换页相关

const ADJACENT_RAGE = 3; //邻近页数范围为ADJACENT_RAGE
// 决定当前页面显示哪些博客
function divideBlogs(postsInOnePage) {
    //blogs已经按照时间顺序排好序了
    //blog以一维数组形式呈现
    var totalPages = Math.ceil(blogs.length / postsInOnePage);
    var pageBlogs = [];// 二维数组，第一维是页数，第二维是该页的博客列表
    for (var i = 0; i < totalPages; i++) {
        pageBlogs.push(blogs.slice(i * postsInOnePage, (i + 1) * postsInOnePage));
    }
    return pageBlogs;
}

//生成选页按钮

//生成单个页数按钮
function generatePageButton(pageNumber) {
    let button = document.createElement("button");
    button.textContent = pageNumber;
    button.id = "pageButton_" + pageNumber;
    let listenerIn = button.addEventListener("mouseenter", (e) => {
        generatePageInfo(pageNumber);
    });
    let listenerOut = button.addEventListener("mouseleave", (e) => {
        generatePageInfo(currentPage);
    });
    let listenerClick = button.addEventListener("click", (e) => {
        currentPage = pageNumber;
        renderPage(currentPage);
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'instant'
        });
    });
    return button;
}


function renderPage(page) {
    destination.innerHTML = "";
    pageBlogs = divideBlogs(POSTS_IN_ONE_PAGE);
    pageBlogs[page - 1].forEach(blog => {
        generateFoldedPost(blog);
        if (displayStatus[blog.id]) {//如果该博客的展开状态为true，则展开该博客
            unfoldPost(blog.id);
        }
    });
}

//使用MutableObserver监听页面变化，在更新按钮显示之后，为按钮添加和移除currentPageButton类
const currentPageButtonObserver = new MutationObserver(() => {
    generatePageInfo(currentPage);
    var pageButtonArea = document.getElementById("pageButtonArea");
    var buttons = pageButtonArea.getElementsByTagName("button");
    for (const button of buttons) {
        let pageNumber = Number(button.textContent);
        if (pageNumber === currentPage) {
            button.classList.add("currentPageButton");
        } else {
            button.classList.remove("currentPageButton");
        }
    }
});
currentPageButtonObserver.observe(document.getElementById("pageButtonArea"), { childList: true });
const pageButtonRenderObserver = new MutationObserver(() => {
    regeneratePageButtons();
});
pageButtonRenderObserver.observe(document.getElementById("BlogSpace"), { childList: true });



//根据当前页数显示按钮
function regeneratePageButtons() {
    var pageButtonArea = document.getElementById("pageButtonArea");
    pageButtonArea.innerHTML = "";
    var totalPages = Math.ceil(blogs.length / POSTS_IN_ONE_PAGE);
    for (let i = 1; i <= totalPages; i++) {
        if (i >= currentPage - ADJACENT_RAGE && i <= currentPage + ADJACENT_RAGE) {
            if (i === 1 || i === totalPages) {
                let button = generatePageButton(i);
                if (i === 1) {
                    button.classList.add("left-end");
                }
                if (i === totalPages) {
                    button.classList.add("right-end");
                }
                pageButtonArea.appendChild(button);
            } else if (i === currentPage - ADJACENT_RAGE) {
                let button = generatePageButton(i);
                button.classList.add("left-border");
                pageButtonArea.appendChild(button);
            } else if (i === currentPage + ADJACENT_RAGE) {
                let button = generatePageButton(i);
                button.classList.add("right-border");
                pageButtonArea.appendChild(button);
            } else {
                pageButtonArea.appendChild(generatePageButton(i));
            }
        }
    }
    var pageButtonArea = document.getElementById("pageButtonArea");
    var buttons = pageButtonArea.getElementsByTagName("button");
    for (const button of buttons) {
        button.removeEventListener("mouseenter", () => { });
        button.removeEventListener("mouseleave", () => { });
        button.removeEventListener("click", () => { });
    }
}

function getPageTimeSpan(pageNumber) {
    var dividedBlogs = divideBlogs(POSTS_IN_ONE_PAGE);
    var endDate = dividedBlogs[pageNumber - 1][0].date;
    var startDate = dividedBlogs[pageNumber - 1][dividedBlogs[pageNumber - 1].length - 1].date;
    return (startDate + " - " + endDate);
}

function getPagePostTitles(pageNumber) {
    var dividedBlogs = divideBlogs(POSTS_IN_ONE_PAGE);
    var titles = [];
    dividedBlogs[pageNumber - 1].forEach(blog => {
        titles.push(blog.title);
    });
    return titles;
}

function generatePageInfo(pageNumber) {
    var E_PageInfo = document.getElementById("PageInfo");
    E_PageInfo.innerHTML = "";
    var totalPages = Math.ceil(blogs.length / POSTS_IN_ONE_PAGE);
    var info1 = document.createElement("p");
    info1.id = "PageInfoTimeSpan";
    info1.innerHTML = "Page " + pageNumber + " / " + totalPages + " | " + getPageTimeSpan(pageNumber);
    var info2 = document.createElement("p");
    info2.id = "PageInfoTitles";
    info2.innerHTML = getPagePostTitles(pageNumber).join(", &nbsp;&nbsp;&nbsp;");
    E_PageInfo.append(info1, info2);
}


renderPage(currentPage);


/**
 * 
 * @param {Set} _topics 
 * @returns 
 */
function filterBlogWithTopics(_topics) {
    let allBlogs = blogs;
    let filtered = [];
    filtered = allBlogs.filter(blog => {
        if (new Set(_topics).isSubsetOf(new Set(blog.topics))) {
            return true;
        } else {
            return false;
        }
    });
    return filtered;
}


// 封包换页函数，供外部调用
function switchToPage(pageNumber) {
    currentPage = pageNumber;
    generatePageInfo(currentPage);
    renderPage(currentPage);
    window.scrollTo({
        top: document.getElementById("MarqueeArea").offsetHeight + 36,
        behavior: 'smooth'
    });
}

window.addEventListener("keydown", (e) => {
    if (e.key == "]") {
        e.preventDefault();
        switchToPage(currentPage + 1);
    }
    if (e.key == "[") {
        e.preventDefault();
        switchToPage(currentPage - 1);
    }
})