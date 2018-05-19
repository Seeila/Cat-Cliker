const allCats = [];
let numberofCats = 0;

class Cat {
   constructor(name = "", url = "", alt = "") {
      this.name = name;
      this.imageUrl = url;
      this.alt = alt;
      this.timesClicked = 0;
      this.id = numberofCats;
      this.section = `<img src=${this.imageUrl} alt="${
         this.alt
      }" class="cat-image"/>
               <div class="clicked">
                  <p>Number of times you've clicked the cat picture</p>
                  <p class="cat-counter">${this.timesClicked}</p>
               </div>`;
   }

   clicked() {
      this.timesClicked += 1;
      document.querySelector(`.cat-counter`).textContent = this.timesClicked;
   }

   appendSection() {
      const mainContainer = document.querySelector(".main-container");
      if (mainContainer) mainContainer.remove();

      const newSection = document.createElement("main");
      newSection.classList.add("main-container");
      newSection.innerHTML = this.section;
      document.querySelector(".wrapper").append(newSection);
      document.querySelector(".cat-counter").textContent = this.timesClicked;
   }
   addClickEvent() {
      document
         .querySelector(".main-container img")
         .addEventListener("click", this.clicked.bind(this));
   }
}

class List {
   constructor(id = "") {
      this.id = id;
   }

   appendListItem(item) {
      const listSelection = document.querySelector(`#${this.id}`);
      const newItem = document.createElement("li");
      newItem.id = `${this.id}${item.id}`;
      newItem.textContent = item.name;
      listSelection.append(newItem);
   }

   listItemClickEvent(item) {
      document
         .getElementById(`${this.id}${item.id}`)
         .addEventListener("click", this.loadItem);
   }

   loadItem() {
      const itemName = event.target.textContent;
      const item = allCats.find(cat => cat.name === `${itemName}`);
      item.appendSection();
      item.addClickEvent();
   }
}

function addCat(name, url, alt) {
   numberofCats += 1;
   const newCat = new Cat(name, url, alt);
   allCats.push(newCat);
}

addCat(
   "Ginger",
   "https://images.unsplash.com/photo-1469569946320-b4f13e4b7d5e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aee9815b48e16e8bcc7923aee4e7fb10&auto=format&fit=crop&w=1350&q=80",
   "redhair cat, Photo by Simone Dalmeri on Unsplash"
);
addCat(
   "Crooked",
   "https://images.unsplash.com/photo-1513451713350-dee890297c4a?ixlib=rb-0.3.5&s=b6de3685935f7d1d71d5a1ee24b16246&auto=format&fit=crop&w=1350&q=80",
   "grey cat with yellow eyes and croocked ears, Photo by Mikhail Vasilyev on Unsplash"
);
addCat(
   "Holy",
   "https://images.unsplash.com/photo-1496522650602-5988dce09660?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=124418c3f40f8216c7f62b7f1a2434c3&auto=format&fit=crop&w=1350&q=80",
   "cat looking in the air, Photo by Erica Leong on Unsplash"
);
addCat(
   "Blue",
   "https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77d68759530c63e87b6a76869cd34643&auto=format&fit=crop&w=1350&q=80",
   "blue ambient photo of a cat,Photo by Taylor Grote on Unsplash"
);
addCat(
   "Drowsy",
   "https://images.unsplash.com/photo-1475518112798-86ae358241eb?ixlib=rb-0.3.5&s=4219c9bca53817cc0b4e19bb60bfcc02&auto=format&fit=crop&w=1350&q=80",
   "drowsy cat,Photo by Erik-Jan Leusink on Unsplash"
);

const catList = new List("cats-list");

allCats.forEach(function(cat) {
   catList.appendListItem(cat);
   catList.listItemClickEvent(cat);
});

allCats[0].appendSection();
allCats[0].addClickEvent();
