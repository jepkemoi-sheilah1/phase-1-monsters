//wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    
    
    fetchMonsters();  // Fetch and display monsters
    createMonsterForm(); // Add the form
  });
  
  // update DOM
  const monsterContainer = document.getElementById("monster-container");
  const createMonsterDiv = document.getElementById("create-monster");
  
  
  // Fetch and display first 50 monsters
  function fetchMonsters() {
    fetch("http://localhost:3000/monsters?_limit=50")
      .then(response => response.json())
      .then(monsters => {
        console.log("Monsters fetched:", monsters); 
        monsterContainer.innerHTML = ""; // Clear existing content
        monsters.forEach(monster => displayMonster(monster));
      })
      .catch(error => console.error("Error fetching monsters:", error));
  }
  
  // Display a monster on the page
  function displayMonster(monster) {
    const monsterDiv = document.createElement("div");
    monsterDiv.innerHTML = `
      <h3>${monster.name}</h3>
      <p>Age: ${monster.age}</p>
      <p>${monster.description}</p>`;
    monsterContainer.appendChild(monsterDiv);
  }
  
  // Create the monster form
  function createMonsterForm() {
    const form = document.createElement("form");
    form.innerHTML = `
      <input id="name" type="text" placeholder="Name" required />
      <input id="age" type="number" placeholder="Age" required />
      <input id="description" type="text" placeholder="Description" required />
      <button type="submit">Create Monster</button>`;
  
    createMonsterDiv.appendChild(form);
    form.addEventListener("submit", handleFormSubmit);
  }
  
  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = event.target.name.value;
    const age = parseFloat(event.target.age.value); // Convert to number
    const description = event.target.description.value;
    
    console.log("Submitting Monster:", { name, age, description });
  
    // Send POST request
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, age, description }),
    })
      .then(response => response.json())
      .then(monster => {
        console.log("Monster added:", monster);
        displayMonster(monster); // Show new monster on the page
      })
      .catch(error => console.error("Error adding monster:", error));
  
    event.target.reset(); // Clears form inputs
  }
 