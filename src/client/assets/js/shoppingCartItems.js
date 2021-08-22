(() => {
    const app = {
        initialize () {
            this.cacheElements();
            this.loadCurrentUserId();
            this.loadCartItems();
        },

        cacheElements() {
            this.$currentUser = null;
            this.$shoppingList = document.querySelector(".shopping__cart__list");
            this.$checkout = document.querySelector(".checkout");
            this.$orderHistory = document.querySelector(".past__orders");
            this.$totalPrice = document.querySelector(".total__price");
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
        
        async loadCartItems() {
            console.log("fetching all orders");
            const orderresponse = await fetch("/api/orders");
            const orderdata = await orderresponse.json();

            console.log("fetching the product orders");
            const response = await fetch("/api/orderhasproducts");
            const orderproductsdata = await response.json();

            console.log("fetching the products");
            const dataresponse = await fetch("/api/products");
            const data = await dataresponse.json();

            this.filterData(orderdata, orderproductsdata, data)
        },

        filterData(orderdata, orderproductsdata, data) {

            tempStrUser = `
                <label for="user"></label>
                <input type="hidden" name="user" id="user" value="${this.$currentUser}">
            `
            this.$checkout.innerHTML += tempStrUser;

            incompleteOrders = [];
            orderdata.forEach(element => {
                if ((element.user_id === this.$currentUser) && (element.completed === false)) {
                    incompleteOrders.push(element)
                }
            });

            console.log("these are the orders for this user", incompleteOrders)
            filteredIncompleteOrders = [];
            incompleteOrders.forEach(element => {
                orderproductsdata.forEach(item => {
                    if (element.order_id === item.id) {
                        filteredIncompleteOrders.push(item);
                    }
                })
            })

            currentShoppingCart = [];
            currentOrderIds = []
            data.forEach(element => {
                filteredIncompleteOrders.forEach( item => {
                    if (element.id === item.product_id) {
                        currentShoppingCart.push(element)
                        currentOrderIds.push(item.id)
                    }
                })
            })
            console.log("product id's",currentShoppingCart,"fitting order id's", currentOrderIds);

            this.totalPrice(currentShoppingCart);
            currentShoppingCart.forEach((element, index) => {
                if (element.onSale) {
                    price = element.price*0.8;
                } else {
                    price = element.price
                }
                let newprice = Math.round(price)
                let id = currentOrderIds[index]
                console.log(id)
                tempStr = `
                <li>
                    <a href="/details?product=${element.id}">
                        <img src="${element.image}" alt="${element.name}">
                        <div class="product__details--info">
                            <h2>${element.name}</h2>
                            <p class="oldprice"> € ${newprice}</p>
                        </div>
                    </a>
                    <a href="" class="delete" id=${id} >Delete</a>
                </li>
                `
                this.$shoppingList.innerHTML += tempStr;

                tempStrForm = `
                    <label for="product"></label>
                    <input type="hidden" name="product" id="product" value="${element.id}">
                `
                this.$checkout.innerHTML += tempStrForm;
            })
        },

        totalPrice(data) {
            let totalprice = data.reduce((accumulator, current) => accumulator + Math.round(current.price),0);
            this.$totalPrice.innerHTML = `<h2>Total price: ${totalprice}</h2>`
        },
    };
    app.initialize();
})();