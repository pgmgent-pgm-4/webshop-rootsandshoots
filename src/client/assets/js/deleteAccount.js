
(() => {
    const app = {
        initialize () {
            this.cacheElements();
            this.deleteButton();
        },

        cacheElements() {
            this.$button = document.querySelector('.delete__button')
            console.log(this.$button)
        },

        deleteButton() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('profile');

            this.$button.addEventListener('click' , (e) => {
                return fetch(`/api/users/${id}`, {
                    method: 'DELETE',
                    body: id
                })
            })
        }

    };
    app.initialize();
})();