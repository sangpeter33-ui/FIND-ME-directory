/* ========================================
   FIND-ME KENYA
   MAIN JAVASCRIPT
======================================== */


/* ========================================
   WAIT FOR PAGE TO LOAD
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("FIND-ME JavaScript loaded successfully.");


    /* ========================================
       GET HTML ELEMENTS
    ======================================== */

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");

    const searchResults =
        document.getElementById("searchResults");

    const providerForm =
        document.getElementById("providerForm");

    const businessName =
        document.getElementById("businessName");

    const businessCategory =
        document.getElementById("businessCategory");

    const businessLocation =
        document.getElementById("businessLocation");

    const businessPhone =
        document.getElementById("businessPhone");

    const getBusinessLocation =
        document.getElementById("getBusinessLocation");

    const locationStatus =
        document.getElementById("locationStatus");

    const registrationMessage =
        document.getElementById("registrationMessage");

    const serviceCards =
        document.querySelectorAll(".service-card");


    /* ========================================
       DEMO BUSINESSES
       These give FIND-ME something to search
       before real providers register.
    ======================================== */

    const demoBusinesses = [

        {
            name: "Peter Auto Garage",
            category: "Mechanics",
            location: "Nairobi",
            phone: "0700000000"
        },

        {
            name: "Nairobi Plumbing Services",
            category: "Plumbers",
            location: "Nairobi",
            phone: "0711111111"
        },

        {
            name: "Reliable Electrical Services",
            category: "Electricians",
            location: "Nairobi",
            phone: "0722222222"
        },

        {
            name: "Quick Phone Repair",
            category: "Phone Repair",
            location: "Nairobi",
            phone: "0733333333"
        },

        {
            name: "Nairobi Taxi Services",
            category: "Taxi",
            location: "Nairobi",
            phone: "0744444444"
        },

        {
            name: "Mama Fua Cleaners",
            category: "Mama Fua",
            location: "Nairobi",
            phone: "0755555555"
        },

        {
            name: "Bright Tutors Kenya",
            category: "Tutors",
            location: "Nairobi",
            phone: "0766666666"
        },

        {
            name: "Fast Delivery Kenya",
            category: "Delivery Services",
            location: "Nairobi",
            phone: "0777777777"
        },

        {
            name: "Expert Welders Nairobi",
            category: "Welders",
            location: "Nairobi",
            phone: "0788888888"
        },

        {
            name: "Clean Home Services",
            category: "Cleaning",
            location: "Nairobi",
            phone: "0799999999"
        },

        {
            name: "City Appliance Repair",
            category: "Appliance Repair",
            location: "Nairobi",
            phone: "0701234567"
        },

        {
            name: "Nairobi Restaurant",
            category: "Restaurants",
            location: "Nairobi",
            phone: "0712345678"
        },

        {
            name: "Local Shopping Centre",
            category: "Shops",
            location: "Nairobi",
            phone: "0723456789"
        },

        {
            name: "City Hospital",
            category: "Hospitals",
            location: "Nairobi",
            phone: "0734567890"
        },

        {
            name: "Nairobi Boda Boda",
            category: "Boda Boda",
            location: "Nairobi",
            phone: "0745678901"
        }

    ];


    /* ========================================
       LOAD REGISTERED BUSINESSES
       FROM PHONE STORAGE
    ======================================== */

    function getRegisteredBusinesses() {

        try {

            const saved =
                localStorage.getItem("findMeBusinesses");

            if (!saved) {
                return [];
            }

            return JSON.parse(saved);

        } catch (error) {

            console.error(
                "Could not load businesses:",
                error
            );

            return [];
        }
    }


    /* ========================================
       SAVE BUSINESSES
    ======================================== */

    function saveRegisteredBusinesses(businesses) {

        try {

            localStorage.setItem(
                "findMeBusinesses",
                JSON.stringify(businesses)
            );

        } catch (error) {

            console.error(
                "Could not save businesses:",
                error
            );
        }
    }


    /* ========================================
       GET ALL BUSINESSES
    ======================================== */

    function getAllBusinesses() {

        const registeredBusinesses =
            getRegisteredBusinesses();

        return [
            ...demoBusinesses,
            ...registeredBusinesses
        ];
    }


    /* ========================================
       SEARCH BUSINESSES
    ======================================== */

    function searchBusinesses(searchTerm) {

        if (!searchResults) {
            return;
        }

        const term =
            searchTerm.trim().toLowerCase();


        /* EMPTY SEARCH */

        if (term === "") {

            searchResults.innerHTML = `
                <div class="search-result-message">
                    <p>
                        🔎 Enter a service, business or location
                        to search FIND-ME.
                    </p>
                </div>
            `;

            return;
        }


        const businesses =
            getAllBusinesses();


        /* FIND MATCHES */

        const matches =
            businesses.filter(function (business) {

                const name =
                    String(business.name || "")
                        .toLowerCase();

                const category =
                    String(business.category || "")
                        .toLowerCase();

                const location =
                    String(business.location || "")
                        .toLowerCase();

                return (
                    name.includes(term) ||
                    category.includes(term) ||
                    location.includes(term)
                );

            });


        /* NO RESULTS */

        if (matches.length === 0) {

            searchResults.innerHTML = `
                <div class="search-result-message">
                    <h3>No results found</h3>

                    <p>
                        We could not find a provider
                        matching "<strong>${escapeHTML(searchTerm)}</strong>".
                    </p>

                    <p>
                        Try searching for:
                        Mechanic, Plumber, Electrician,
                        Taxi, Tutor, Restaurant or another service.
                    </p>
                </div>
            `;

            return;
        }


        /* SHOW RESULTS */

        displaySearchResults(matches);

    }


    /* ========================================
       DISPLAY SEARCH RESULTS
    ======================================== */

    function displaySearchResults(results) {

        if (!searchResults) {
            return;
        }


        let html = `

            <div class="results-container">

                <h3>
                    ${results.length}
                    provider${results.length === 1 ? "" : "s"}
                    found
                </h3>

        `;


        results.forEach(function (business) {

            html += `

                <div class="business-result">

                    <h4>
                        🏪 ${escapeHTML(business.name)}
                    </h4>

                    <p>
                        <strong>Service:</strong>
                        ${escapeHTML(business.category)}
                    </p>

                    <p>
                        📍
                        <strong>Location:</strong>
                        ${escapeHTML(business.location)}
                    </p>

                    <p>
                        📞
                        <strong>Phone:</strong>
                        <a href="tel:${escapeHTML(business.phone)}">
                            ${escapeHTML(business.phone)}
                        </a>
                    </p>

                    <a
                        class="call-button"
                        href="tel:${escapeHTML(business.phone)}">
                        📞 Call Provider
                    </a>

                </div>

            `;

        });


        html += `</div>`;


        searchResults.innerHTML = html;

    }


    /* ========================================
       ESCAPE HTML
       Helps prevent unwanted HTML
       from business names.
    ======================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* ========================================
       SEARCH BUTTON
    ======================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                searchBusinesses(
                    searchInput
                        ? searchInput.value
                        : ""
                );

            }
        );

    }


    /* ========================================
       SEARCH WHEN PRESSING ENTER
    ======================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchBusinesses(
                        searchInput.value
                    );

                }

            }
        );

    }


    /* ========================================
       SERVICE CARD CLICK
    ======================================== */

    serviceCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const category =
                    card.getAttribute(
                        "data-category"
                    );


                if (searchInput) {

                    searchInput.value =
                        category;

                }


                searchBusinesses(category);


                /* SCROLL TO SEARCH */

                const hero =
                    document.getElementById("home");

                if (hero) {

                    hero.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* ========================================
       BUSINESS REGISTRATION
    ======================================== */

    if (providerForm) {

        providerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* GET VALUES */

                const name =
                    businessName
                        ? businessName.value.trim()
                        : "";

                const category =
                    businessCategory
                        ? businessCategory.value
                        : "";

                const location =
                    businessLocation
                        ? businessLocation.value.trim()
                        : "";

                const phone =
                    businessPhone
                        ? businessPhone.value.trim()
                        : "";


                /* VALIDATE */

                if (
                    name === "" ||
                    category === "" ||
                    location === "" ||
                    phone === ""
                ) {

                    showRegistrationMessage(
                        "Please complete all fields.",
                        "error"
                    );

                    return;

                }


                /* CREATE BUSINESS */

                const newBusiness = {

                    id:
                        Date.now(),

                    name:
                        name,

                    category:
                        category,

                    location:
                        location,

                    phone:
                        phone

                };


                /* GET EXISTING */

                const businesses =
                    getRegisteredBusinesses();


                /* ADD NEW BUSINESS */

                businesses.push(
                    newBusiness
                );


                /* SAVE */

                saveRegisteredBusinesses(
                    businesses
                );


                /* SUCCESS MESSAGE */

                showRegistrationMessage(
                    "✅ Business registered successfully on this device!",
                    "success"
                );


                /* CLEAR FORM */

                providerForm.reset();


                /* SHOW NEW BUSINESS */

                setTimeout(function () {

                    if (searchInput) {

                        searchInput.value =
                            category;

                    }

                    searchBusinesses(
                        category
                    );

                }, 500);

            }
        );

    }


    /* ========================================
       REGISTRATION MESSAGE
    ======================================== */

    function showRegistrationMessage(
        message,
        type
    ) {

        if (!registrationMessage) {
            return;
        }


        registrationMessage.textContent =
            message;


        if (type === "success") {

            registrationMessage.style.color =
                "#15803d";

        } else {

            registrationMessage.style.color =
                "#dc2626";

        }

    }


    /* ========================================
       CURRENT LOCATION
    ======================================== */

    if (getBusinessLocation) {

        getBusinessLocation.addEventListener(
            "click",
            function () {

                getCurrentLocation();

            }
        );

    }


    /* ========================================
       GET GPS LOCATION
    ======================================== */

    function getCurrentLocation() {

        if (!navigator.geolocation) {

            showLocationStatus(
                "Location is not supported by this browser.",
                "error"
            );

            return;
        }


        showLocationStatus(
            "📍 Getting your location...",
            "loading"
        );


        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                /*
                   We don't automatically expose
                   the exact coordinates as a business
                   address.

                   Instead, we place the coordinates
                   into the location field so the user
                   knows the location was obtained.
                */

                if (businessLocation) {

                    businessLocation.value =
                        latitude.toFixed(6)
                        + ", "
                        + longitude.toFixed(6);

                }


                showLocationStatus(
                    "✅ Location detected successfully.",
                    "success"
                );

            },


            function (error) {

                let message =
                    "Unable to get your location.";


                if (error.code === 1) {

                    message =
                        "Location permission was denied.";

                } else if (error.code === 2) {

                    message =
                        "Your location could not be determined.";

                } else if (error.code === 3) {

                    message =
                        "Location request timed out.";

                }


                showLocationStatus(
                    message,
                    "error"
                );

            },


            {
                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0
            }

        );

    }


    /* ========================================
       LOCATION STATUS
    ======================================== */

    function showLocationStatus(
        message,
        type
    ) {

        if (!locationStatus) {
            return;
        }


        locationStatus.textContent =
            message;


        if (type === "success") {

            locationStatus.style.color =
                "#15803d";

        } else if (type === "error") {

            locationStatus.style.color =
                "#dc2626";

        } else {

            locationStatus.style.color =
                "#555";

        }

    }


    /* ========================================
       SHOW ALL PROVIDERS
    ======================================== */

    function showAllProviders() {

        const businesses =
            getAllBusinesses();

        displaySearchResults(
            businesses
        );

    }


    /* ========================================
       INITIAL MESSAGE
    ======================================== */

    if (searchResults) {

        searchResults.innerHTML = `

            <div class="search-result-message">

                <p>
                    🔎 Search FIND-ME for a service
                    or location.
                </p>

                <p>
                    Example:
                    <strong>Mechanics</strong>,
                    <strong>Plumbers</strong>,
                    <strong>Taxi</strong>,
                    <strong>Tutors</strong>
                    or <strong>Nairobi</strong>.
                </p>

            </div>

        `;

    }


    /* ========================================
       TEST FUNCTION
       You can type this in the browser
       console while testing:
       findMeShowAll()
    ======================================== */

    window.findMeShowAll =
        showAllProviders;


    /* ========================================
       CLEAR REGISTERED BUSINESSES
       FOR TESTING ONLY
    ======================================== */

    window.findMeClearBusinesses =
        function () {

            localStorage.removeItem(
                "findMeBusinesses"
            );

            alert(
                "Registered businesses have been cleared from this device."
            );

            location.reload();

        };


    /* ========================================
       FINISHED
    ======================================== */

    console.log(
        "FIND-ME is ready."
    );

});