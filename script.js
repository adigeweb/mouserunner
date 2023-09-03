var time = 0;
var gameOver = false;
var createInt = null;
var moveInt = null;

document.querySelector("button#start").addEventListener("click", () => {
    document.querySelector("button#start").style.display = "none";
    document.querySelector(".perde").style.display = "none";
    document.querySelector(".warning").style.display = "block";
    setTimeout(() => {
        document.querySelector(".warning").style.display = "none";
    }, 2500);
    document.querySelector(".player").style.left = (event.clientX < screen.width && event.clientX > 0 ? `${event.clientX}px` : screen.width);
    document.querySelector(".player").style.top = event.clientY < screen.height && event.clientY < screen.height ? `${event.clientY}px` : screen.height;
    window.addEventListener("mousemove", (event) => {
        if (gameOver) return;
        document.querySelector(".player").style.left = (event.clientX < screen.width && event.clientX > 0 ? `${event.clientX}px` : screen.width);
        document.querySelector(".player").style.top = event.clientY < screen.height && event.clientY < screen.height ? `${event.clientY}px` : screen.height;
    });
    createInt = setInterval(() => {
        // Oluşturma

        const part = document.createElement("div");
        part.classList.add("particle");
        part.setAttribute("dir", Math.random() > .5 ? "left" : "right");
        part.style[part.getAttribute("dir")] = "0rem";
        part.style.top = `${Math.floor(Math.random() * screen.height)}px`;
        document.body.appendChild(part);
    }, 1000);
    moveInt = setInterval(() => {
        // Hareket

        document.querySelectorAll(".particle").forEach(item => {
            if (parseInt(item.style[item.getAttribute("dir")].replace("rem", "")) < 0) {
                item.remove();
            }
            item.style[item.getAttribute("dir")] =
                `${parseFloat(item.style[item.getAttribute("dir")].replace("rem", "")) + time / 50 - time / 75}rem`;
            
            if (touches(item, document.querySelector(".player"))) {
                stopGame();
            }
        });

        time += .01;

        document.querySelector("#ingameScore").setHTML(Math.floor(time));
    }, 10);
});

const touches = (a, b) => {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();
  
    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}

const stopGame = () => {
    gameOver = true;
    clearInterval(createInt);
    clearInterval(moveInt);
    document.querySelector(".perde").style.display = "block";
    document.querySelector("span#score").setHTML(Math.floor(time));
    document.querySelector(".over").style.display = "block";
}

document.querySelector("button#retry").addEventListener("click", () => {
    location.reload();
});