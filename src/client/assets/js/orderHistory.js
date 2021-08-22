(() => {
    const app = {
        initialize () {
            this.cacheElements();
            this.loadCurrentUserId();
            this.loadCartItems();
        },

        cacheElements() {
            this.$currentUser = null;
            this.$orderHistory = document.querySelector(".past__orders");
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

            completeOrders = [];
            orderdata.forEach(element => {
                if ((element.user_id === this.$currentUser) && (element.completed === true)) {
                    completeOrders.push(element)
                }
            });

            filteredCompleteOrders = [];
            completeOrders.forEach(element => {
                orderproductsdata.forEach( item => {
                    if (element.order_id === item.id) {
                        filteredCompleteOrders.push(item.product_id)
                    }
                })
            })

            orderHistory = [];
            data.forEach(element => {
                filteredCompleteOrders.forEach( item => {
                    if (element.id === item) {
                        orderHistory.push(element)
                    }
                })
            })

            orderHistory.forEach(element => {

                if (element.onSale) {
                    price = element.price*0.8;
                } else {
                    price = element.price
                }

                let date = new Date();
                let newDate = date.getFullYear()+"-"+(date.getMonth() +1)+"-"+date.getDate();
                
                let newprice = Math.round(price)
                tempStr = `
                <li>
                    <a href="/details?product=${element.id}">
                        <img src="${element.image}" alt="${element.name}">
                        <div class="product__details--info">
                            <h2>${element.name}</h2>
                            <p class="oldprice"> € ${newprice}</p>
                            <p class="updated">Bought at ${newDate}</p>
                        </div>
                    </a>
                </li>
                `
                this.$orderHistory.innerHTML += tempStr;
            })
        }

    };
    app.initialize();
})();