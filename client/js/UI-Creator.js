function UI(url) {
  axios
    .get(url)
    .then((res) => {
      document.getElementById("main-div").innerHTML = "";
      document.getElementById("main-div").innerHTML = res.data;
    })
    .catch((err) => console.error("Error fetching HTML file:", err));
}

export default UI;
