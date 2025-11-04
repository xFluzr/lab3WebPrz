const form = document.querySelector("#searchForm");
const inputVal = document.querySelector("#inputValue");
const outputHolder = document.querySelector("tbody");
const selectMenu=document.querySelector("#selectValue");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = selectMenu.value.trim();
  console.log(input.value)
  if (input.length === 0) return;

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/region/${input}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        console.log("Nie ma takiej stolicy");
        outputHolder.innerHTML = `<tr><td colspan="5">Nie znaleziono kraju o takiej stolicy.</td></tr>`;
        return;
      }
      throw new Error("Błąd API");
    }
    const data = await res.json();
    console.log(data);
    const tableBodyInput = data
      .map((country) => {
        const name = country?.name?.official || "-";
        const capital = Array.isArray(country?.capital)
          ? country.capital.join(", ")
          : country?.capital || "-";
        const population = country?.population?.toLocaleString?.() || "-";
        const region = country?.subregion || "-";
        const languages = country?.languages
        let langList=''
       /* for(const language in languages){
          langList+=language+','
        }
        console.log(langList)*/
        return `
          <tr>
            <td>${name}</td>
            <td>${capital}</td>
            <td>${population}</td>
            <td>${region}</td>
           
          </tr>
        `;
      })
      .join("");

    outputHolder.innerHTML = tableBodyInput;
  } catch (error) {
    console.error(error);
    outputHolder.innerHTML = `<tr><td colspan="5">Wystąpił błąd: ${error.message}</td></tr>`;
  }
});
