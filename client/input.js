window.onclick = function(event) {

}
function addMoreOptions() {
  const addButton = document.getElementById("add");
  const amt = document.getElementsByTagName("select").length;
  console.log("addButton");
  addButton.insertAdjacentHTML("beforebegin",
  `<div id="nutrient${amt+1}">
    <select required="true">
      <option value="calories">Calories</option>
      <option value="fat">Fat</option>
      <option value="carbs">Carbs</option>
      <option value="protein">Protein</option>
      <option value="cholesterol">Cholesterol</option>
      <option value="sodium">Sodium</option>
      <option value="vitaminA">Vitamin A</option>
      <option value="vitaminC">Vitamin C</option>
      <option value="vitaminD">Vitamin D</option>
      <option value="calcium">Calcium</option>
    </select>
    <input type="text" name="" value="">
    <input type="text" name="" value="">
  </div>`);
}
function submitData() {
  const amt = document.getElementsByTagName("select").length;
  const userData = [];
  for (i = 0; i < amt; i ++) {
    const nutrient = document.getElementById(`nutrient${i+1}`).getElementsByTagName("select")[0];
    const min = document.getElementById(`nutrient${i+1}`).getElementsByTagName("input")[0];
    const max = document.getElementById(`nutrient${i+1}`).getElementsByTagName("input")[1];
    userData.push([nutrient, min, max]);
  }
  return userData;
}
