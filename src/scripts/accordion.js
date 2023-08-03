const accordionItems = document.getElementById("accordion-collapse");
const accordionArrow = document.getElementById("svg-arrow-accordion");
const accordionBody = document.getElementById("accordion-collapse-body");

accordionItems.addEventListener("click", () => {
  accordionArrow.classList.toggle("rotate-180");
  accordionBody.classList.toggle("hidden");
});
