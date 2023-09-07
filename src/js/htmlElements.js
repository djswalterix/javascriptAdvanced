export function createElement(classe, contenuto) {
  let el = document.createElement("div");
  if (classe) {
    el.className = classe;
  }
  if (contenuto) {
    el.innerHTML = contenuto;
  }
  return el;
}

export function createProgress(score, color) {
  let el = createElement("progress col-md-10 col-10");
  let bar = createElement("progress-bar");
  bar.style.width = score * 10 + "%";
  bar.style.background = color;
  el.setAttribute("aria-valuenow", score * 10);
  el.setAttribute("aria-valuemin", "0");
  el.setAttribute("aria-valuemax", "100");
  el.appendChild(bar);
  return el;
}
