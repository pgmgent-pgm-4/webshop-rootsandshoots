
(() => {
    const app = {
        initialize () {
            this.cacheElements();
            this.loadNewProducts();
            this.loadSaleProducts();
        },

        cacheElements() {
            this.$newItems = document.querySelector('.main__new__list');
            this.$saleItems = document.querySelector('.main__onsale__list');
        },

        async loadNewProducts() {
            try {
                console.log("fetching new products");
                const response = await fetch("/api/products");
                const data = await response.json();
                // FILTER DATA ON NEW, RETURN ALL "NEW" ELEMENTS
                let filteredData = data.filter((element) => {
                    return element.new
                })
                // SHUFFLE ARRAY (TO GET RANDOM SLICE OF DATA EACH TIME)
                let shuffledData = filteredData.sort(() => 0.5 - Math.random());
                // SLICE SHUFFLED DATA TO GET 5 RANDOM DISPLAYABLE ITEMS
                let slicedData = shuffledData.slice(0,5);
                slicedData.forEach(element => {
                    if(element.onSale){
                        let discount = element.price*0.8;
                        let newprice = Math.round(discount)
                    tempstr = `
                    <li class="home__item" ><a href="/details?product=${element.id}">
                        <img src="${element.image}" alt="${element.name}">
                        <p class="home__item__name">${element.name}</p>
                        <p class="home__item__price"> € ${element.price}</p>
                        <p class="home__item__newprice">new price: € ${newprice}</p>
                    </a></li>
                    `
                    this.$newItems.innerHTML += tempstr;
                    } else {
                        tempstr = `
                    <li class="new__item" ><a href="/details?product=${element.id}">
                        <img src="${element.image}" alt="${element.name}">
                        <p class="home__item__name">${element.name}</p>
                        <p class="home__item__newprice"> € ${element.price}</p>
                    </a></li>
                    `
                    this.$newItems.innerHTML += tempstr;
                    }
                });
            } catch (error) {
                console.error(error);
            };
        },

        async loadSaleProducts() {
            try {
                console.log("fetching sale products");
                const response = await fetch("/api/products");
                const data = await response.json();
                // FILTER DATA ON SALE, RETURN ALL "NEW" ELEMENTS
                let filteredData = data.filter((element) => {
                    return element.onSale
                })
                // SHUFFLE ARRAY (TO GET RANDOM SLICE OF DATA EACH TIME)
                let shuffledData = filteredData.sort(() => 0.5 - Math.random());
                // SLICE SHUFFLED DATA TO GET 5 RANDOM DISPLAYABLE ITEMS
                let slicedData = shuffledData.slice(0,5);
                slicedData.forEach(element => {
                    let discount = element.price*0.8;
                    let newprice = Math.round(discount)
                    tempstr = `
                    <li class="home__item" ><a href="/details?product=${element.id}">
                        <img src="${element.image}" alt="${element.name}">
                        <p class="home__item__name">${element.name}</p>
                        <p class="home__item__price">€ ${element.price}</p>
                        <p class="home__item__newprice">new price: € ${newprice}</p>
                    </a></li>
                    `
                    this.$saleItems.innerHTML += tempstr;
                });
            } catch (error) {
                console.error(error);
            };
        }
    };
    app.initialize();
})();