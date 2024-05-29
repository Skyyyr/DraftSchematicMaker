let ingredientTemplateValue = "";
let ingredientTypeValue = "";
let ingredientSlotTypeValue = "";
let toolTypeValue = "";
let factoryCrateValue = "";
let xpTypeValue = "";
let assemblyValue = "";
let experimentationValue = "";
let customizationValue = "";
const maxSuggestions = 25;


//On load
window.onload = startUp();

function startUp() {
    populateToolTypes();
    populateFactoryTypes();
    populateXpTypes();
    populateAssemblyTypes();
    populateExperimentationTypes();
    populateCustomizationTypes();
    populateIngredientTemplateTypes();
    populateSlotTypes();
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('resourceInput');
    const objectInput = document.getElementById('createdObjectInput');
    const autocompleteList = document.getElementById('autocomplete-list');
    const autocompleteObjectList = document.getElementById('autocomplete-object-list');
    let displayedSuggestions = 0;

    input.addEventListener('input', function() {
        const query = input.value.toLowerCase();
        autocompleteList.innerHTML = ''; // Clear previous suggestions
        displayedSuggestions = 0; // Reset the displayed suggestions count

        if (!query) {
            return;
        }

        resources.forEach(resource => {
            if (displayedSuggestions >= maxSuggestions) {
                return; // Stop adding suggestions if the limit is reached
            }

            if (resource.toLowerCase().startsWith(query)) {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = resource;
                suggestionItem.addEventListener('click', function() {
                    input.value = resource;
                    autocompleteList.innerHTML = '';
                });
                autocompleteList.appendChild(suggestionItem);
                displayedSuggestions++; // Increment the displayed suggestions count
            }
        });
    });

    input.addEventListener('keydown', function(e) {
        const items = autocompleteList.getElementsByTagName('div');
        let activeIndex = Array.from(items).findIndex(item => item.classList.contains('autocomplete-active'));

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (activeIndex < items.length - 1) {
                if (activeIndex >= 0) {
                    items[activeIndex].classList.remove('autocomplete-active');
                }
                items[++activeIndex].classList.add('autocomplete-active');
                input.value = items[activeIndex].textContent;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeIndex > 0) {
                items[activeIndex].classList.remove('autocomplete-active');
                items[--activeIndex].classList.add('autocomplete-active');
                input.value = items[activeIndex].textContent;
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0) {
                input.value = items[activeIndex].textContent;
                autocompleteList.innerHTML = '';
            }
        }
    });

    objectInput.addEventListener('input', function() {
        const query = objectInput.value.toLowerCase();
        autocompleteObjectList.innerHTML = ''; // Clear previous suggestions
        displayedSuggestions = 0; // Reset the displayed suggestions count
    
        if (!query) {
            return;
        }
    
        craftedObjects.forEach(craftedObject => {
            if (displayedSuggestions >= maxSuggestions) {
                return; // Stop adding suggestions if the limit is reached
            }

            if (craftedObject.toLowerCase().startsWith(query)) {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = craftedObject;
                suggestionItem.addEventListener('click', function() {
                    objectInput.value = craftedObject;
                    autocompleteObjectList.innerHTML = '';
                });
                autocompleteObjectList.appendChild(suggestionItem);
                displayedSuggestions++; // Increment the displayed suggestions count
            }
        });
    });

    objectInput.addEventListener('keydown', function(e) {
        const items = autocompleteObjectList.getElementsByTagName('div');
        let activeIndex = Array.from(items).findIndex(item => item.classList.contains('autocomplete-active'));

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (activeIndex < items.length - 1) {
                if (activeIndex >= 0) {
                    items[activeIndex].classList.remove('autocomplete-active');
                }
                items[++activeIndex].classList.add('autocomplete-active');
                objectInput.value = items[activeIndex].textContent;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeIndex > 0) {
                items[activeIndex].classList.remove('autocomplete-active');
                items[--activeIndex].classList.add('autocomplete-active');
                objectInput.value = items[activeIndex].textContent;
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0) {
                objectInput.value = items[activeIndex].textContent;
                autocompleteObjectList.innerHTML = '';
            }
        }
    });

    // Drop down Menus
    const dropdownTool = document.getElementById('toolTypesMenu');

    dropdownTool.addEventListener('click', function(event) {
        if (event.target.classList.contains('dropdown-item')) {
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateToolTypeDisplay(selectedValue);
            toolTypeValue = selectedKey;
        }
    });

    const dropdownFactory = document.getElementById('factoryTypesMenu');

    // Add a click event listener to the dropdown
    dropdownFactory.addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown item
        if (event.target.classList.contains('dropdown-item')) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateFactoryTypeDisplay(selectedValue);
            factoryCrateValue = selectedKey;
        }
    });

    const dropdownXp = document.getElementById('xpTypesMenu');

    // Add a click event listener to the dropdown
    dropdownXp.addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown item
        if (event.target.classList.contains('dropdown-item')) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateXpTypeDisplay(selectedValue);
            xpTypeValue = selectedKey;
        }
    });

    const dropdownAssembly = document.getElementById('assemblyTypesMenu');

    // Add a click event listener to the dropdown
    dropdownAssembly.addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown item
        if (event.target.classList.contains('dropdown-item')) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateAssemblyTypeDisplay(selectedValue);
            assemblyValue = selectedKey;
        }
    });

    const dropdownExperimentation = document.getElementById('experimentationTypesMenu');

    // Add a click event listener to the dropdown
    dropdownExperimentation.addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown item
        if (event.target.classList.contains('dropdown-item')) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateExperimentationTypeDisplay(selectedValue);
            experimentationValue = selectedKey;
        }
    });

    const dropdownCustomization = document.getElementById('customizationTypesMenu');

    // Add a click event listener to the dropdown
    dropdownCustomization.addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown item
        if (event.target.classList.contains('dropdown-item')) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateCustomizationTypeDisplay(selectedValue);
            customizationValue = selectedKey;
        }
    });

    const dropdownIngredientTemplate = document.getElementById('ingredientTemplateTypesMenu');

    // Add a click event listener to the dropdown
    dropdownIngredientTemplate.addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown item
        if (event.target.classList.contains('dropdown-item')) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateIngredientTemplateTypeDisplay(selectedValue);
            ingredientTemplateValue = selectedKey;
        }
    });

    const dropdownIngredient = document.getElementById('ingredientTypesMenu');

    // Add a click event listener to the dropdown
    dropdownIngredient.addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown item
        if (event.target.classList.contains('dropdown-item')) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateIngredientTypeDisplay(selectedValue);
            ingredientTypeValue = selectedKey;
        }
    });

    const dropdownSlot = document.getElementById('slotTypesMenu');

    // Add a click event listener to the dropdown
    dropdownSlot.addEventListener('click', function(event) {
        // Check if the clicked element is a dropdown item
        if (event.target.classList.contains('dropdown-item')) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the selected dropdown item
            const selectedValue = event.target.textContent.trim();
            const selectedKey = event.target.getAttribute('data-value');

            // Call your function to process the click event
            updateSlotTypeDisplay(selectedValue);
            ingredientSlotTypeValue = selectedKey;
        }
    });
});

function populateToolTypes() {
    const dropdownMenu = document.getElementById('toolTypesMenu');
    for (let key in craftingToolTab) {
        const value = craftingToolTab[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function populateFactoryTypes() {
    const dropdownMenu = document.getElementById('factoryTypesMenu');
    for (let key in factoryCrateTypes) {
        const value = factoryCrateTypes[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function populateXpTypes() {
    const dropdownMenu = document.getElementById('xpTypesMenu');
    for (let key in xpTypes) {
        const value = xpTypes[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function populateAssemblyTypes() {
    const dropdownMenu = document.getElementById('assemblyTypesMenu');
    for (let key in assemblyTypes) {
        const value = assemblyTypes[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function populateExperimentationTypes() {
    const dropdownMenu = document.getElementById('experimentationTypesMenu');
    for (let key in experimentationTypes) {
        const value = experimentationTypes[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function populateCustomizationTypes() {
    const dropdownMenu = document.getElementById('customizationTypesMenu');
    for (let key in customizationTypes) {
        const value = customizationTypes[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function populateIngredientTemplateTypes() {
    const dropdownMenu = document.getElementById('ingredientTemplateTypesMenu');
    for (let key in IngredientType) {
        const value = IngredientType[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function populateIngredientTypes(IngredType) {
    const dropdownMenu = document.getElementById('ingredientTypesMenu');
    itLength = Object.keys(IngredType).length;
    if (itLength <= 1) {
        // Remove the children
        while (dropdownMenu.firstChild) {
            dropdownMenu.removeChild(dropdownMenu.firstChild);
        }
        return;
    }
    for (let key in IngredType) {
        const value = IngredType[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function populateSlotTypes() {
    const dropdownMenu = document.getElementById('slotTypesMenu');
    for (let key in resourceSlotType) {
        const value = resourceSlotType[key];
        const option = document.createElement('a');
        option.className = "dropdown-item";
        option.textContent = value;
        option.setAttribute('data-value', key);
        dropdownMenu.appendChild(option);
    }
}

function updateToolTypeDisplay(value) {
    const display = document.getElementById('selectedToolTypes');
    display.value = value;
}

function updateFactoryTypeDisplay(value) {
    const display = document.getElementById('selectedFactoryTypes');
    display.value = value;
}

function updateXpTypeDisplay(value) {
    const display = document.getElementById('selectedXpTypes');
    display.value = value;
}

function updateAssemblyTypeDisplay(value) {
    const display = document.getElementById('selectedAssemblyTypes');
    display.value = value;
}

function updateExperimentationTypeDisplay(value) {
    const display = document.getElementById('selectedExperimentationTypes');
    display.value = value;
}

function updateCustomizationTypeDisplay(value) {
    const display = document.getElementById('selectedCustomizationTypes');
    display.value = value;
}

function updateIngredientTemplateTypeDisplay(value) {
    const display = document.getElementById('selectedIngredientTemplateTypes');
    display.value = value;
    let ingredType;
    //Clears the menu for a new entry incase of swapping from one to another
    populateIngredientTypes({"":""});

    switch (value) {
        case "Armor":
            ingredType = armorIngredients;
            break;
        case "Chemical":
            ingredType = chemicalIngredients;
            break;
        case "Clothing":
            ingredType = clothingIngredients;
            break;
        case "Creature":
            ingredType = creatureIngredients;
            break;
        case "Droid":
            ingredType = droidIngredints;
            break;
        case "Food":
            ingredType = foodIngredients;
            break;
        case "Furniture":
            ingredType = furnitureIngredients;
            break;
        case "Item":
            ingredType = itemIngredients;
            break;
        case "Jewelry":
            ingredType = jewelryIngredients;
            break;
        case "Munition":
            ingredType = munitionIngredients;
            break;
        case "Space":
            ingredType = spaceIngredients;
            break;
        case "Structure":
            ingredType = structureIngredients;
            break;
        case "Tissue":
            ingredType = tissueIngredients;
            break;
        case "Vehicle":
            ingredType = vehicleIngredients;
            break;
        case "Weapon":
            ingredType = weaponIngredients;
            break;
        default:
            ingredType = {"":""};
    }

    populateIngredientTypes(ingredType);
}

function updateIngredientTypeDisplay(value) {
    const display = document.getElementById('selectedIngredientTypes');
    display.value = value;
}

function updateSlotTypeDisplay(value) {
    const display = document.getElementById('selectedSlotTypes');
    display.value = value;
}

// Function to add resource and value to the table
function addResource() {
    const resourceInput = document.getElementById('resourceInput');
    const valueInput = document.getElementById('valueInput');
    const tableBody = document.getElementById('resourcesTable').getElementsByTagName('tbody')[0];

    const resource = resourceInput.value.trim();
    const value = valueInput.value.trim();

    if (resource && value && ingredientTemplateValue != "" && ingredientTypeValue != "" && ingredientSlotTypeValue != "") {
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);

        cell1.textContent = resource;
        cell2.textContent = value;
        cell3.textContent = ingredientTemplateValue;
        cell4.textContent = ingredientTypeValue;
        cell5.textContent = ingredientSlotTypeValue;

        // Add a delete button to each row
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.onclick = function() {
            tableBody.deleteRow(newRow.rowIndex - 1);
        };
        cell6.appendChild(deleteBtn);

        // Clear input fields after adding the row
        resourceInput.value = '';
        valueInput.value = '';

        // Clear temp vars for next entry
        ingredientTemplateValue = "";
        ingredientTypeValue = "";
        ingredientSlotTypeValue = "";

        // Update displays
        updateIngredientTemplateTypeDisplay("");
        updateIngredientTypeDisplay("");
        updateSlotTypeDisplay("");
    } else {
        alert('Please enter all values: resource, value, ingredient template, ingredient type, ingredient slot type.');
    }
}

function addObject() {
    const objectInput = document.getElementById('createdObjectInput');
    const tableBody = document.getElementById('additionalObjectsTable').getElementsByTagName('tbody')[0];

    const object = objectInput.value.trim();

    if (object) {
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        cell1.textContent = object;
        
        // Add a delete button to each row
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.onclick = function() {
            tableBody.deleteRow(newRow.rowIndex - 1);
        };
        cell2.appendChild(deleteBtn);

        // Clear input fields after adding the row
        objectInput.value = '';
    } else {
        alert('Please enter an object.');
    }
}

function formatResourceTableData() {
    const tableBody = document.getElementById('resourcesTable').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');

    let ingredientTemplateNames = [];
    let ingredientTitleNames = [];
    let ingredientSlotTypes = [];
    let resourceTypes = [];
    let resourceQuantities = [];
    let contributions = [];

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        ingredientTemplateNames.push(cells[2].textContent);
        ingredientTitleNames.push(cells[3].textContent);
        ingredientSlotTypes.push(cells[4].textContent);
        resourceTypes.push(cells[0].textContent);
        resourceQuantities.push(cells[1].textContent);
        contributions.push(100); // Fixed contribution value
    }

    const formattedData = `
    ingredientTemplateNames = {${ingredientTemplateNames.map(name => `"${name}"`).join(', ')}},
    \tingredientTitleNames = {${ingredientTitleNames.map(name => `"${name}"`).join(', ')}},
    \tingredientSlotType = {${ingredientSlotTypes.join(', ')}},
    \tresourceTypes = {${resourceTypes.map(type => `"${type}"`).join(', ')}},
    \tresourceQuantities = {${resourceQuantities.join(', ')}},
    \tcontribution = {${contributions.join(', ')}},
    `.trim();

    return formattedData;
}

function formatObjectTableData() {
    const tableBody = document.getElementById('additionalObjectsTable').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');

    if (rows.length <= 0) { return ""; }

    let objectTemplateNames = [];

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        objectTemplateNames.push(cells[0].textContent);
    }

    const formattedData = `\t"${objectTemplateNames.map(name => `${name}`)}",`.trim();

    return formattedData;
}

function generateSchematic() {
    const output = document.getElementById('generatedSchematic');
    const customNameValue = document.getElementById('customName').value;
    const complexityValue = document.getElementById('complexity').value;
    const factoryCrateSizeValue = document.getElementById('factoryCrateSize').value;
    const xpValue = document.getElementById('xpAmount').value;
    const resourceTable = formatResourceTableData();
    const objectValue = document.getElementById('createdObjectInput').value;
    const objectsTable = formatObjectTableData();
    
    let script = "\ttemplateType = DRAFTSCHEMATIC,\n\n";
    script += '\tcustomObjectName = "' + customNameValue + '",\n\n';
    script += `\tcraftingToolTab = ` + toolTypeValue + `,\n`;
    script += `\tcomplexity = ` + complexityValue + `,\n`;
    script += `\tsize = 1,\n`;
    script += `\tfactoryCrateType = "` + factoryCrateValue + `",\n\n`;
    script += `\txpType = "` + xpTypeValue + `",\n`;
    script += `\txp = ` + xpValue + `,\n\n`;
    script += `\tassemblySkill = "` + assemblyValue + `",\n`;
    script += `\texperimentingSkill = "` + experimentationValue + `",\n`;
    script += `\tcustomizationSkill = "` + customizationValue + `",\n`;
    script += `\tfactoryCrateSize = ` + factoryCrateSizeValue + `,\n\n`;
    script += `\tcustomizationOptions = {},\n`;
    script += `\tcustomizationStringNames = {},\n`;
    script += `\tcustomizationDefaults = {},\n\n`;
    script += `\t` + resourceTable + `\n\n`;
    script += `\ttargetTemplate = "` + objectValue + `",\n\n`;
    script += `\tadditionalTemplates = {\n`;
    script += `\t` + objectsTable + `\n`;
    script += `\t}`

    output.value = script;
}
