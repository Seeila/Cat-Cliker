(function() {
   const data = {
      allCats: [],
      numberofCats: 0,
      Cat: function(name = "", url = "", alt = "", list = "") {
         this.name = name;
         this.imageUrl = url;
         this.alt = alt;
         this.list = list;
         this.timesClicked = 0;
         this.id = data.numberofCats;
         this.section = `<img src=${this.imageUrl} alt="${
            this.alt
         }" class="cat-image"/>
                  <div class="clicked">
                     <p>Number of times you've clicked ${
                        this.name
                     }'s picture</p>
                     <p class="cat-counter">${this.timesClicked}</p>
                  </div>`;
      }
   };

   const octopus = {
      addCat: function(name, url, alt, list) {
         data.numberofCats += 1;
         const newCat = new data.Cat(name, url, alt, list);
         data.allCats.push(newCat);
      },

      listItemClickEvent: function(item) {
         document
            .getElementById(`${item.list}${item.id}`)
            .addEventListener("click", this.loadItem);
      },

      loadItem: function(event) {
         const itemName = event.target.textContent;
         const item = data.allCats.find(cat => cat.name === `${itemName}`);
         view.appendSection(item);
         octopus.addClickEvent(item);
      },

      addClickEvent: function() {
         document
            .querySelector(".main-container img")
            .addEventListener("click", octopus.clicked);
      },

      clicked: function(event) {
         const itemSrc = event.target.src;
         const item = data.allCats.find(cat => cat.imageUrl === `${itemSrc}`);
         item.timesClicked += 1;
         document.querySelector(`.cat-counter`).textContent = item.timesClicked;
      }
   };

   const view = {
      appendListItem: function(item) {
         const listSelection = document.querySelector(`#${item.list}`);
         const newItem = document.createElement("li");
         newItem.id = `${item.list}${item.id}`;
         newItem.textContent = item.name;
         listSelection.append(newItem);
      },

      appendSection: function(item) {
         const mainContainer = document.querySelector(".main-container");
         if (mainContainer) mainContainer.remove();

         const newSection = document.createElement("main");
         newSection.classList.add("main-container");
         newSection.innerHTML = item.section;
         document.querySelector(".wrapper").append(newSection);
         document.querySelector(".cat-counter").textContent = item.timesClicked;
      }
   };

   function init() {
      octopus.addCat(
         "Ginger",
         "https://images.unsplash.com/photo-1469569946320-b4f13e4b7d5e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aee9815b48e16e8bcc7923aee4e7fb10&auto=format&fit=crop&w=1350&q=80",
         "redhair cat, Photo by Simone Dalmeri on Unsplash",
         "cats-list"
      );
      octopus.addCat(
         "Crooked",
         "https://images.unsplash.com/photo-1513451713350-dee890297c4a?ixlib=rb-0.3.5&s=b6de3685935f7d1d71d5a1ee24b16246&auto=format&fit=crop&w=1350&q=80",
         "grey cat with yellow eyes and croocked ears, Photo by Mikhail Vasilyev on Unsplash",
         "cats-list"
      );
      octopus.addCat(
         "Holy",
         "https://images.unsplash.com/photo-1496522650602-5988dce09660?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=124418c3f40f8216c7f62b7f1a2434c3&auto=format&fit=crop&w=1350&q=80",
         "cat looking in the air, Photo by Erica Leong on Unsplash",
         "cats-list"
      );
      octopus.addCat(
         "Blue",
         "https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77d68759530c63e87b6a76869cd34643&auto=format&fit=crop&w=1350&q=80",
         "blue ambient photo of a cat,Photo by Taylor Grote on Unsplash",
         "cats-list"
      );
      octopus.addCat(
         "Drowsy",
         "https://images.unsplash.com/photo-1475518112798-86ae358241eb?ixlib=rb-0.3.5&s=4219c9bca53817cc0b4e19bb60bfcc02&auto=format&fit=crop&w=1350&q=80",
         "drowsy cat,Photo by Erik-Jan Leusink on Unsplash",
         "cats-list"
      );

      data.allCats.forEach(function(cat) {
         view.appendListItem(cat);
         octopus.listItemClickEvent(cat);
      });

      view.appendSection(data.allCats[0]);
      octopus.addClickEvent();
   }

   init();
})();
