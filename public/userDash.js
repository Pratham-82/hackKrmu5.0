console.log(obj);
let recentCompList = document.querySelector(".recent-comp--list");

recentCompList.innerHTML = "";
for (let comp of obj.complaints) {
  console.log(comp.complaint);
  let html = `<div class="item">
                <p>${comp.complaint}</p>
                <p><a href="https://www.google.com/maps?q=${comp.location}" target='_blank'>Map Link</a></p>
                <span class="tag green">${comp.category}</span>
              </div>`;
  let div = document.createElement("div");
  div.innerHTML = html;
  recentCompList.insertAdjacentHTML("beforeend", html);
}
