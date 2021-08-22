
(() => {
    const app = {
        initialize () {
            this.cacheElements();
            this.loadReviews();
        },

        cacheElements() {
            this.$reviewList = document.querySelector('.product__reviews')
        },

        async loadReviews() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const product = urlParams.get('product');

            console.log("fetching the categories from products");
            const response = await fetch("/api/reviews");
            const reviewData = await response.json();

            reviewData.forEach(element => {
                if (element.product_id == product) {
                        let date = Date.parse(element.createdAt);
                        let dateObj = new Date(date);
                        let dateformat = dateObj.toLocaleString()

                        dateObj.toLocaleString("en-US", {weekday: "long"}) // Monday
                        dateObj.toLocaleString("en-US", {month: "long"}) // December
                        dateObj.toLocaleString("en-US", {day: "numeric"}) // 9
                        dateObj.toLocaleString("en-US", {year: "numeric"}) // 2019
                        dateObj.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
                        dateObj.toLocaleString("en-US", {minute: "numeric"}) // 30
                        dateObj.toLocaleString("en-US", {second: "numeric"}) // 15

                    tempStr = `
                        <li class="review__item">
                            <h3> by: ${element.author}</h3>
                            <p class="review__score__title">Rating:</p>
                            <p class="review__score">${element.stars}</p>
                            <p class="review__text__title">Review:</p>
                            <p class="review__text">${element.review}</p>
                            <p class="review__created">posted at: ${dateformat}</p>
                        </li>
                    `
                    this.$reviewList.innerHTML += tempStr;
                } 
            });

            if (this.$reviewList.innerHTML.length < 10) {
                    tempStr = `
                        <li class="no__reviews__yet">
                            <h4>No reviews yet</h4>
                        </li>
                    `
                    this.$reviewList.innerHTML = tempStr;
            }
        },
    };
    app.initialize();
})();