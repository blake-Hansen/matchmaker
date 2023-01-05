
$("#formdata").on("submit", function (event) {
  event.preventDefault();
  const formD = document.getElementById("formdata");
  const data1 = new FormData(formD);
  const newPicks = [...data1.values()]  
        
fetch('/surveyResult', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newPicks),
})
.then(response => response.json())
.then(data => {
  $("#replaceWithResult").html(`
    <div class="text-center">
      <h1>Congratulations! You matched up with ${data.name}</h1>
      <img id="imgSize"src=${data.photo}></img>
    </div>
 ` )
 console.log(data)
})
.catch((error) => {
  console.error('Error:', error);
});

});