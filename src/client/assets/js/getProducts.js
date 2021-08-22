
(() => {
    const app = {
        initialize () {
            this.cacheElements();
            this.fetchData();
        },

        cacheElements() {
            this.$plantlist = document.querySelector('.plant__list');
        },

        async fetchData() {
            try {
                console.log("fetching all categories");
                const catresponse = await fetch("/api/categories");
                const catdata = await catresponse.json();

                console.log("fetching the categories from products");
                const catdataresponse = await fetch("/api/producthascategories");
                const catdatadata = await catdataresponse.json();

                console.log("fetching all products");
                const response = await fetch("/api/products");
                const data = await response.json();

                this.filterData(catdata, catdatadata, data)

            } catch (error) {
                console.error(error);
            };
        },

        filterData(catdata, catdatadata, data) {
            const query = window.location.search;
            const urlParams = new URLSearchParams(query);
        
            const keyword = urlParams.get('keywords');
            const category = urlParams.get('category');
            const type = urlParams.get('type');
            const size = urlParams.get('size');
            const price = urlParams.get('price');

            let categoryData = "";
            let typeData = "";

            catdata.forEach(element => {
                if (category === element.category_name) {
                    categoryData = element.id;
                } else {
                    console.log("no category chosen")
                }
            })

            catdata.forEach(element => {
                if (type === element.category_name) {
                    typeData = element.id;
                } else {
                    console.log("no type chosen")
                }
            });

            this.showData(categoryData, typeData, size, price, catdatadata, data, keyword);

        },

        showData(categoryData, typeData, size, price, catdatadata, data, keyword) {

            let length ="";

            if (size === ""){
                console.log("no size chosen")
            } else if (size === "small") {
                length = 50;
            } else if (size === "medium") {
                length = 100;
            } else {
                length = 300;
            };
            
            let cost ="";

            if (price === ""){
                console.log("no price chosen")
            } else if (price === "cheap") {
                cost = 20;
            } else if (price === "normal") {
                cost = 50;
            } else {
                cost = 100;
            }

            let filteredProducts = [];
            catdatadata.forEach(element => {
                if ((element.category_id === categoryData) && (element.category_id === typeData)) {
                    filteredProducts.push(element.product_id)
                }
            })

            let uniqueProducts = filteredProducts.reduce(function(a,b){
                if (a.indexOf(b) < 0 ) a.push(b);
                return a
            }, []);
            
            allData = [];

            if (uniqueProducts.length === 0) {
                data.forEach(element => {
                    let hasKeyword = element.tags.includes(keyword)
                    if ((size === "") && (price === "") && (hasKeyword === true)) {
                        allData.push(element)
                    } else if ((length > element.size) || (cost > element.price)) {
                        allData.push(element)
                    } else if (hasKeyword === true) {
                        allData.push(element)
                    } else if ((length > element.size) || (cost > element.price)) {
                        allData.push(element)
                    }
                })
            }

            data.forEach(element => {
                uniqueProducts.forEach(item => {
                    if (element.id === item) {
                        allData.push(element)
                    }
                })
            })
            
            allData.forEach(element => {
                if (element.onSale) {
                    let discount = element.price*0.8;
                    let newprice = Math.round(discount)
                    let tempstr = `
                    <li>
                        <a href="/details?product=${element.id}">
                            <img src="${element.image}" alt="${element.name}">
                            <div class="product__details--info">
                                <h2>${element.name}</h2>
                                <p class="price" class="price"> € ${element.price}</p>
                                <p class="newprice">new price: € ${newprice}</p>
                            </div>
                        </a>
                    </li>
                    `
                    this.$plantlist.innerHTML += tempstr;
                } else {
                    let tempstr = `
                    <li>
                        <a href="/details?product=${element.id}">
                            <img src="${element.image}" alt="${element.name}">
                            <div class="product__details--info">
                                <h2>${element.name}</h2>
                                <p class="oldprice"> € ${element.price}</p>
                            </div>
                        </a>
                    </li>
                    `
                    this.$plantlist.innerHTML += tempstr;
                }
            })
            
        }
    };
    app.initialize();
})();