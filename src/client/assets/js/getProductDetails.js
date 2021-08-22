(() => {
    const app = {
        initialize () {
            this.cacheElements();
            this.loadCurrentUserId();
            this.loadDetails();
        },

        cacheElements() {
            this.$currentUser = null;
            this.$form = document.querySelector('.product__form');
            this.$productDetails = document.querySelector('.product__details');
            this.$profilecontainer = document.getElementById('nav__profileContainer');
        },

        async loadCurrentUserId() {
            try {
                console.log("fetching currently connected id");
                const response = await fetch("/api/currentuser");
                const data = await response.json();
                this.$currentUser = data.userid;
            } catch (error) {
                console.error(error);
            };
        },

        async loadDetails() {
            try {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const product = urlParams.get('product');
                const response = await fetch("/api/products");
                const data = await response.json();
                // FILTER DATA ON SALE, RETURN ALL "NEW" ELEMENTS
                let filteredItems = null;
                data.forEach(element => {
                    if (element.id == product) {
                        filteredItems = element
                    }
                });

                console.log("fetching all categories");
                const catresponse = await fetch("/api/categories");
                const catdata = await catresponse.json();

                console.log("fetching the categories from projects");
                const catdataresponse = await fetch("/api/producthascategories");
                const catdatadata = await catdataresponse.json();

                this.showDetails(filteredItems, catdata, catdatadata);
                this.loadForms(filteredItems);
            } catch (error) {
                console.error(error);
            };
        },

        showDetails(data, catdata, catdatadata) {
            const categories = [];
            const categorynames = [];
            let tagnames = [];

            catdatadata.find((item, index) => {
                if (item.product_id == data.id) {
                    categories.push(item.category_id)
                }
            })

            categories.forEach(item => {
                catdata.forEach(element => {
                    if (item === element.id) {
                        categorynames.push(element.category_name)
                    }
                })
            })

            let uniqueCategories = categorynames.reduce(function(a,b){
                if (a.indexOf(b) < 0 ) a.push(b);
                return a
            }, []);

            let input = "";
            uniqueCategories.forEach(element => {
                input += `<p class="details__category__name">${element}</p>`
            });

            let tags = data.tags.split(" ");
            tagnames.push(tags)

            let dataTags = "";
            tags.forEach(element => {
                dataTags += `<p class="details__tag"> ${element} </p>`
            })

            if (data.onSale) {
                let discount = data.price*0.8;
                let newprice = Math.round(discount)
                let tempstr = `
                <img src="${data.image}" alt="${data.name}">
                <div class="product__details--info">
                    <p class="category__title">Categories:</p>
                    ${input}
                    <h2>${data.name}</h2>
                    <p class="price"> € ${data.price}</p>
                    <p class="newprice">new price: € ${newprice} (-20%!)</p>
                    <p class="description">${data.description}</p>
                    <p class="tags__title">Tags:</p>
                    ${dataTags}
                    <p class="size">plant height: ${data.size}cm</p>
                </div>
                `
                this.$productDetails.innerHTML = tempstr;
            } else {
                let tempstr = `
                <img src="${data.image}" alt="${data.name}">
                <div class="product__details--info">
                    <p class="category__title">Categories:</p>
                    ${input}
                    <h2>${data.name}</h2>
                    <p> € ${data.price}</p>
                    <p class="description">${data.description}</p>
                    <p class="tags__title">Tags:</p>
                    ${dataTags}
                    <p class="size">plant height: ${data.size}cm</p>
                </div>
                `
                this.$productDetails.innerHTML = tempstr;
            }
        },

        loadForms(data) {
            if (this.$currentUser === undefined) {
                tempstr = 
                `
                    <p class="product__details__login"><a href="/login">Log in to add to cart!</a></p>
                    
                `
                this.$form.innerHTML = tempstr;
                this.$profilecontainer.innerHTML = `
                        <a href="/login">SIGN IN</a>
                        <a href="/signup">SIGN UP</a>
                    `
            } else {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const product = urlParams.get('product');
                tempstr = 
                `
                    <form class="addtocart" method="POST">
                        <label for="userid"></label>
                        <input type="hidden" name="userid" id="userid" value="${this.$currentUser}">
                        <label for="productid"></label>
                        <input type="hidden" name="productid" id="productid" value="${product}">
                    
                        <button class="addtocart__button"type="submit" value="Submit">Add to cart!</button>
                    </form>
                `
                this.$form.innerHTML = tempstr;
                this.$profilecontainer.innerHTML = `
                        You are logged in
                        <a href="/profile">my profile</a>
                        <a href="/logout">log out</a>
                `;
            };
        }
    };
    app.initialize();
})();