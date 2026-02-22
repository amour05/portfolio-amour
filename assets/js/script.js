document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("mouseover", () => {
      card.classList.add("animate__pulse");
    });
    card.addEventListener("mouseout", () => {
      card.classList.remove("animate__pulse");
    });
  });
});
