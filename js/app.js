(function() {
   const model = {
      cats: [
         {
            name: "Ginger",
            imgSrc: "https://images.unsplash.com/photo-1469569946320-b4f13e4b7d5e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aee9815b48e16e8bcc7923aee4e7fb10&auto=format&fit=crop&w=1350&q=80",
            imgAlt: "redhair cat, Photo by Simone Dalmeri on Unsplash",
            timesClicked: 0,
            list: "cats-list"
         },
         {
            name: "Crooked",
            imgSrc: "https://images.unsplash.com/photo-1513451713350-dee890297c4a?ixlib=rb-0.3.5&s=b6de3685935f7d1d71d5a1ee24b16246&auto=format&fit=crop&w=1350&q=80",
            imgAlt: "grey cat with yellow eyes and croocked ears, Photo by Mikhail Vasilyev on Unsplash",
            timesClicked: 0,
            list: "cats-list"
         },
         {
            name: "Holy",
            imgSrc: "https://images.unsplash.com/photo-1496522650602-5988dce09660?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=124418c3f40f8216c7f62b7f1a2434c3&auto=format&fit=crop&w=1350&q=80",
            imgAlt: "cat looking in the air, Photo by Erica Leong on Unsplash",
            timesClicked: 0,
            list: "cats-list"
         },
         {
            name: "Blue",
            imgSrc: "https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77d68759530c63e87b6a76869cd34643&auto=format&fit=crop&w=1350&q=80",
            imgAlt: "blue ambient photo of a cat,Photo by Taylor Grote on Unsplash",
            timesClicked: 0,
            list: "cats-list"
         },
         {
            name: "Drowsy",
            imgSrc: "https://images.unsplash.com/photo-1475518112798-86ae358241eb?ixlib=rb-0.3.5&s=4219c9bca53817cc0b4e19bb60bfcc02&auto=format&fit=crop&w=1350&q=80",
            imgAlt: "drowsy cat,Photo by Erik-Jan Leusink on Unsplash",
            timesClicked: 0,
            list: "cats-list"
         },
      ]
   };

   const octopus = {
      init: function(){
         catListView.init();
         catView.init();
         pannelView.init();
      },

      loadItem: function(event) {
         const itemName = event.target.textContent;
         const item = model.cats.find(cat => cat.name === `${itemName}`);
         catView.render(item);
      },

      clicked: function(event) {
         const itemSrc = event.target.src;
         const item = model.cats.find(cat => cat.imgSrc === `${itemSrc}`);
         item.timesClicked += 1;
         document.querySelector(`.cat-counter`).textContent = item.timesClicked;
         pannelView.clicksInput.value = catView.catCounter.textContent;
      },

      getAllCats: function(){
         return model.cats;
      },

      adminPannelHidden: true,

      submitValues: function() {
         const item = model.cats.find(cat => cat.name === `${pannelView.currentCatName}`);
         item.imgSrc = pannelView.urlInput.value;
         item.alt = '';
         item.name = pannelView.nameInput.value;
         item.timesClicked = pannelView.clicksInput.value;
         catView.render(item);
         catListView.changeListItem(item.name);
         pannelView.togglePannel();
      }

   };

   const catListView = {
      init: function() {
         this.cats = octopus.getAllCats();

         this.cats.forEach(function(cat) {
            catListView.appendListItem(cat);
         });

         const listElements = document.querySelectorAll('#cats-list li');
         listElements.forEach(function(elem) {
            elem.addEventListener("click", octopus.loadItem);
         });
      },

      appendListItem: function(item) {
         const listSelection = document.querySelector(`#${item.list}`);
         const newItem = document.createElement("li");
         newItem.textContent = item.name;
         listSelection.append(newItem);
      },

      changeListItem: function(name){
         const listItems= document.querySelectorAll('#cats-list li');
         listItems.forEach(item => {
            if(item.innerText === `${pannelView.currentCatName}`) item.innerText = name
         });
      }
   }

   const catView = {
      init: function() {
         this.catImg = document.querySelector(".cat-image");
         this.catName = document.querySelector(".cat-name");
         this.catCounter = document.querySelector(".cat-counter");
         this.render(catListView.cats[0]);
         this.catImg.addEventListener("click", octopus.clicked);
      },

      render: function(item) {
         this.catImg.src = item.imgSrc;
         this.catImg.alt = item.alt;
         this.catName.textContent = item.name;
         this.catCounter.textContent = item.timesClicked;
      }
   }

   const pannelView = {
      init: function() {
         this.adminBtn = document.querySelector('.btn.admin');
         this.cancelBtn = document.querySelector('.btn.reset');
         this.submitBtn = document.querySelector('.btn.submit');
         this.form = document.querySelector('.cat-form');
         this.nameInput = document.querySelector('input[type=text]');
         this.urlInput = document.querySelector('input[type=url]');
         this.clicksInput= document.querySelector('input[type=number]');
         this.currentCatName = catView.catName.textContent;

         this.adminBtn.addEventListener("click", this.togglePannel);
         this.cancelBtn.addEventListener("click", this.togglePannel);
         this.submitBtn.addEventListener("click", octopus.submitValues);
      },

      togglePannel: function() {
         pannelView.form.classList.toggle('hidden');
         if(octopus.adminPannelHidden) {
            octopus.adminPannelHidden = false;

            pannelView.nameInput.value = pannelView.currentCatName;
            pannelView.urlInput.value = catView.catImg.src;
            pannelView.clicksInput.value = catView.catCounter.textContent;

         } else {
            octopus.adminPannelHidden = true;
         }
      }
   }

   octopus.init();
})();
