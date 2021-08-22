
(() => {
    const app = {
        initialize () {
            this.cacheElements();
            this.loadCurrentUserId();
            this.fetchCurrentUserData();
            this.editform();
        },

        cacheElements() {
            this.$currentUser = null;
            this.$profilecontainer = document.getElementById('nav__profileContainer');
            this.$currentUserData = document.querySelector('.profile__container');
            this.$editorForm = document.querySelector('.editor-form');
        },

        async loadCurrentUserId() {
            try {
                console.log("fetching currently connected id");
                const response = await fetch("/api/currentuser");
                const data = await response.json();
                this.$currentUser = data.userid;
                if (this.$currentUser !== undefined) {
                    this.$profilecontainer.innerHTML = `
                        You are logged in
                        <a href="/profile">my profile</a>
                        <a href="/logout">log out</a>
                        `;
                } else {
                    this.$profilecontainer.innerHTML = `
                        <a href="/login">SIGN IN</a>
                        <a href="/signup">SIGN UP</a>
                    `
                }
            } catch (error) {
                console.error(error);
            };
        },

        async fetchCurrentUserData() {
            try {
                const response = await fetch("/api/profiles");
                const data = await response.json();
                let tempstr = "";
                let tempstr2 = "";
                data.forEach(element => {
                    if (element.user_id === this.$currentUser) {
                        this.$firstname = element.firstname;
                        let currentuser = element.user_id;
                        let date = Date.parse(element.createdAt);
                        let udate = Date.parse(element.updatedAt)
                        let dateObj = new Date(date);
                        let udateObj = new Date(udate)
                        let dateformat = dateObj.toLocaleString()
                        let udateformat = udateObj.toLocaleString()

                        dateObj.toLocaleString("en-US", {weekday: "long"}) // Monday
                        dateObj.toLocaleString("en-US", {month: "long"}) // December
                        dateObj.toLocaleString("en-US", {day: "numeric"}) // 9
                        dateObj.toLocaleString("en-US", {year: "numeric"}) // 2019
                        dateObj.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
                        dateObj.toLocaleString("en-US", {minute: "numeric"}) // 30
                        dateObj.toLocaleString("en-US", {second: "numeric"}) // 15

                        udateObj.toLocaleString("en-US", {weekday: "long"}) // Monday
                        udateObj.toLocaleString("en-US", {month: "long"}) // December
                        udateObj.toLocaleString("en-US", {day: "numeric"}) // 9
                        udateObj.toLocaleString("en-US", {year: "numeric"}) // 2019
                        udateObj.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
                        udateObj.toLocaleString("en-US", {minute: "numeric"}) // 30
                        udateObj.toLocaleString("en-US", {second: "numeric"}) // 15

                        let tempStr = `
                        <div class="profile__container__data">
                            <h2>Welcome ${element.firstname} ${element.lastname}</h2>
                            <a class="profile__seeorders" href="/order-history">See past orders</a>
                            <div class="profile__container__data--flex">
                                <div>
                                    <p>Your firstname:</p>
                                    <strong><p class="values">${element.firstname}</p></strong>
                                    <p>Your lastname:</p>
                                    <strong><p class="values">${element.lastname}</p></strong>
                                    <p>Your emailadress:</p>
                                    <strong><p class="values">${element.email}</p></strong>
                                </div>
                                <div>
                                    <div>
                                        <p>Account created:</p>
                                        <p class="datetime">${dateformat}</p>
                                        <p>Last updated:</p>
                                        <p class="datetime"> ${udateformat}</p>
                                    </div>
                                    <a class="edit--button" href="/profile-edit?profile=${this.$currentUser}">Edit profile</a>
                                </div>
                            </div>
                        </div>
                        <a class="backtohome--button" href="/">Continue to website!</a>
                        `
                        this.$currentUserData.innerHTML = tempStr;
                    }
                });
            } catch(error) {
                console.error(error);
            }
        },

        async editform() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const profile = urlParams.get('profile')
            
            this.$editorForm.innerHTML = `
                <label for="userid"></label>
                <input type="hidden" name="userid" id="userid" value="${profile}">
                <label for="firstname__registration">Your (new) first name*</label>
                <input type="text" name="firstname" id="firstname__registration" placeholder="firstname">
                <label for="lastname__registration">Your (new) last name*</label>
                <input type="text" name="lastname" id="lastname__registration" placeholder="lastname">
                <label for="email__registration">Your (new) e-mailadress*</label>
                <input type="text" name="email" id="email__registration" placeholder="email">
                <button type="submit" value="Submit">Edit profile</button>
            `
        }
    };
    app.initialize();
})();