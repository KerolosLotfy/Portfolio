const menu = document.getElementById("menu");
const action = document.getElementById("actions");
const h3 = document.querySelector(".container-texts h3");
let texts = ["I'm a Frontend developer"];
const links = document.querySelectorAll("#actions > li");
const sections = document.querySelectorAll("section");
const arrowUp = document.querySelector(".arrowup");

menu.addEventListener("click", () => {
  handleMenu();
});

function handleMenu() {
  menu.classList.toggle("is-active");
  action.classList.toggle("is-active");
}

links.forEach(l => {
  l.addEventListener('click', () => {
    action.classList.remove("is-active");
    menu.classList.remove("is-active");

  })
})  
// Make Typing effect
const typing = {
  letterIndex: 0,
  textIndex: 0,
  typing: function (texts, el, time = 100) {
    setInterval(() => {
      if (this.textIndex <= texts.length - 1) {
        if (this.letterIndex >= texts[this.textIndex].length) {
          this.spacing(el);
        } else if (
          texts[this.textIndex].search(/frontend|backend/gi) <=
            this.letterIndex &&
          this.letterIndex <=
            "frontend".length +
              texts[this.textIndex].search(/frontend|backend/gi) -
              1
        ) {
          el.innerHTML += `<span>${
            texts[this.textIndex][this.letterIndex]
          }</span>`;
          this.letterIndex++;
        } else {
          el.innerHTML += texts[this.textIndex][this.letterIndex];
          this.letterIndex++;
        }
      } else {
        this.letterIndex = 0;
        this.textIndex = 0;
      }
    }, time);
  },

  spacing: function (el) {
    let text = el.textContent.split("");
    if (text.length > 0) {
      el.innerHTML = "";
      text.pop();
      el.innerHTML = text.join("");
    } else {
      this.letterIndex = 0;
      this.textIndex++;
    }
  },
};

// call typing Method
typing.typing(texts, h3);

// Make active section when scrolling
document.onscroll = () => {
  sections.forEach((s, i) => {
    if (
      s.getBoundingClientRect().y <= 100 &&
      -s.getBoundingClientRect().y <= s.getBoundingClientRect().height - 200
    ) {
      s.classList.add("active");
      if (s.classList.contains("active")) {
        if (links[i].getAttribute("data-target") === s.id) {
          links[i].classList.add("active");
        }
      }
    } else {
      s.classList.remove("active");
      links[i].classList.remove("active");
    }
  });

  // show arrow button when scrolling
  if (window.scrollY > 200) {
    arrowUp.classList.add("show");
  } else {
    arrowUp.classList.remove("show");
  }
};
