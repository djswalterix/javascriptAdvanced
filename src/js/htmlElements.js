export function createElement(classe, contenuto) {
  let el = document.createElement("div");
  if (controllaVariabile(classe)) {
    el.className = classe;
  }
  if (controllaVariabile(contenuto)) {
    el.innerHTML = contenuto;
  }
  return el;
}
function controllaVariabile(variable) {
  if (variable !== null && variable !== undefined) {
    return true;
  } else {
    return false;
  }
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
