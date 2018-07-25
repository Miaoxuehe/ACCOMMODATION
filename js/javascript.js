let differenceInDays;
let list = $("#list");
var selectAccommodation = "";
var numberOfDays = 0;
var numberOfPeople = 0;
numberOfPeople = $("#numberOfPeople").val();

function search() {
    let results = filterByDays(accommodation, numberOfDays);
    console.log(results);
    results = filterPeople(results, $("#numberOfPeople").val());
    displayAccommodation(results);
    console.log(results);
}

function init() {
    $("#search-btn").click(search);
};
/* pugins */



/* hotel search result */

function searchResult() {
    var x = document.getElementById("search-result");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    return
}







let accommodation = {
    "hotel": {
        "title": "Hotel",
        "price": "157",
        "category": "Hotel",
        "minimumStay": "1",
        "maximumStay": "5",
        "numberOfpeople": "2",
        "minimunNumberOfPeople": "1",
        "maximumNumberOfPeople": "2",

    },
    "hostel": {
        "title": "Hostel",
        "price": "30",
        "category": "Hostel",
        "minimumStay": "1",
        "maximumStay": "10",
        "numberOfpeople": "2",
        "minimunNumberOfPeople": "1",
        "maximumNumberOfPeople": "6",
    },
    "motel": {
        "title": "Motel",
        "price": "90",
        "category": "Motel",
        "minimumStay": "3",
        "maximumStay": "10",
        "numberOfpeople": "2",
        "minimunNumberOfPeople": "2",
        "maximumNumberOfPeople": "4",
    },
    "house": {
        "title": "House",
        "price": "240",
        "category": "House",
        "minimumStay": "2",
        "maximumStay": "15",
        "numberOfpeople": "2",
        "minimunNumberOfPeople": "5",
        "maximumNumberOfPeople": "15",
    },
    "house-2": {
        "title": "House",
        "price": "240",
        "category": "House",
        "minimumStay": "2",
        "maximumStay": "15",
        "numberOfpeople": "2",
        "minimunNumberOfPeople": "5",
        "maximumNumberOfPeople": "15",
    },

};
/*
var event_price = new Array();
event_price["weddingPlanning"]=399.90;
event_price["photograghyServices"]=299.90;
event_price["cateringServices"]=399.90;
event_price["DecorRentals"]=199.90;
*/
let meals = {
    "Salad": {
        "title": "FreshGreen Salad with Tenara Goats Cheese",
        "menuPrice": "9.5",
        "transportFee": "20",
        "labourFee": "40",
    },
    "Sandwiches": {
        "title": "Sandwiches",
        "menuPrice": "20",
        "transportFee": "20",
        "labourFee": "40",
    },
    "Ribs": {
        "title": "Pork Ribs",
        "menuPrice": "27",
        "transportFee": "20",
        "labourFee": "40",
    },
    
    "Seafood-Platter": {
        "title": "Seafood Platter",
        "menuPrice": "38",
        "transportFee": "20",
        "labourFee": "40",
    },

};




function filterPeople(hideAndShows, peopleRequested) {
    // Filters accommodation options by the number of people
    filteredhideAndShows = {};

    $.each(hideAndShows, function (key, value) {
        if (parseInt(value.minimunNumberOfPeople) <= parseInt(peopleRequested) && parseInt(value.maximumNumberOfPeople) >= parseInt(peopleRequested)) {
            filteredhideAndShows[key] = value;
        }
    });

    return filteredhideAndShows;
}

function filterByDays(hideAndShows, daysRequested) {
    // Filters accommodation options by the number of days
    filteredhideAndShows = {};

    $.each(hideAndShows, function (key, value) {
        if (value.minimumStay <= daysRequested && value.maximumStay >= daysRequested) {
            filteredhideAndShows[key] = value;
        }
    });

    return filteredhideAndShows;
}

function filterByCategory(hideAndShows, category) {
    filteredhideAndShows = {};

    $.each(hideAndShows, function (key, value) {
        if (value.category == category || category == "All") {
            filteredhideAndShows[key] = value;
        }
    });

    return filteredhideAndShows;
}

function calculatePriceForStay(accommodationOption) {
    if (numberOfDays == 0) {
        
        return "";
    }
    return "$" + accommodationOption.price * numberOfDays  ;
    console.log(calculatePriceForStay);
}

function displayAccommodation(accommodationToDisplay) {
    list.html("");

    Object.keys(accommodationToDisplay).forEach(function (key) {
        let fillterhideAndShow = `
            <div class="card">
            <img data-id="${key}" class="accommodation-button card-img-top" src="images/${key}.jpg" alt="Card image cap" height="200px" width="200px" data-toggle="modal" data-target="#details";>
                <div class="card-body">
                    <h3 class="card-title">${accommodation[key].title}</h3>
                    <p class="">$ ${accommodation[key].price} / Night</p>
                    <p class="">${calculatePriceForStay(accommodation[key])}</p>
                    
                </div>
            </div>`;
        list.append(fillterhideAndShow);
    });

    $(".accommodation-button").click(function (e) {
        selectAccommodation = e.target.getAttribute("data-id");
    });


}



function calculateCost(e) {
    let clickMeal = e.target.getAttribute("value");
    var menuPrice = parseFloat(meals[clickMeal].menuPrice);
    var priceForAccommodation = parseFloat(accommodation[selectAccommodation].price * numberOfDays);
    var numberOfPeople = $("#numberOfPeople").val();
    var priceForPeopleMeals = parseFloat(meals[clickMeal].menuPrice * numberOfPeople)
    //var labourFeeForSweet = parseFloat(meals[clickMeal].labourFee);
    //var transportForSweet = parseFloat(meals[clickMeal].transportFee);

    var total = priceForPeopleMeals + priceForAccommodation; 
    //+ labourFeeForSweet ;
    //+ transportForSweet;
    // 

    var totalDiv = $("#finalPrice");

    totalDiv.html("Total $" + total);

    $(".addselect").hide();
    $(".buttonDisplay").show();

    //$("#nextstep").attr("href", "payment.html");
    
}

/* <button data-id="${key}" type="button" class="accommodation-button btn btn-outline-danger" data-toggle="modal" data-target="#details">
    Order
</button> */
function nextStep() {
    let form = $("input[name=event]:checked").val();
    var shouldnextStep = true;

    if (form == undefined) {
        $(".addselect").show();
        $(".buttonDisplay").hide();

        return;
    }


}



/* validate nextForm */









var button = document.querySelector("#next");
var firstName = document.querySelector("#firstName");
var lastName = document.querySelector("#lastName")
var email = document.querySelector("#email");
var telephone = document.querySelector("#telephone");



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateTelephone(p) {
    if (p.length >= 7) {
        return true;
    }
    return false;
}

function onnext(e) {
    var firstNameError = document.querySelector("#" + firstName.id + "-error");
    var lastNameError = document.querySelector("#" + lastName.id + "-error");
    var emailError = document.querySelector("#" + email.id + "-error");
    var telephoneError = document.querySelector("#" + telephone.id + "-error");

    var shouldnext = true;

    if (firstName.value.trim() == "") {
        firstNameError.classList.remove("hidden");
        shouldnext = false;
    } else {
        firstNameError.classList.add("hidden");
    }

    if (lastName.value.trim() == "") {
        lastNameError.classList.remove("hidden");
        shouldnext = false;
    } else {
        lastNameError.classList.add("hidden");
    }

    if (!validateEmail(email.value)) {
        emailError.classList.remove("hidden");
        shouldnext = false;
    } else {
        emailError.classList.add("hidden");
    }


    if (!validateTelephone(telephone.value)) {
        telephoneError.classList.remove("hidden");
        shouldnext = false;
    } else {
        telephoneError.classList.add("hidden");
    }

    if (shouldnext == false) {
        //$("#next").prop("disabled", true);
        $(".addselect").show();
        $(".buttonDisplay").hide();


    } else {
        //$("#next").prop("disabled", false);
        $(".addselect").hide();
        $(".buttonDisplay").show();
    }
}

button.addEventListener("click", onnext);
email.addEventListener("blur", onnext);

/* End Validate */
/* End search result */





/* Start date picker */

$(function () {
    $('input[name="daterange"]').daterangepicker({
        opens: 'right'
    }, function (start, end, label) {
        differenceInDays = end.diff(start, "days");
        numberOfDays = differenceInDays;
        // console.log(differenceInDays);
        // console.log("A new date selection was made: " + start.format('MM-DD') + ' to ' + end.format('MM-DD'));
    });
});
/* End date picker*/

$("#search-ber input").each(function () {

    data[theFieldName] = theFieldValue;
    console.log(name)
});














$(document).ready(function () {

    var window_height = $(window).height();
    var window_width = $(window).width();
    var background_height = $("#background").height();
    var nav_height = $("nav").height();


    var background_margin_top = window_height - background_height - nav_height;

    if (window_height > background_height) {
        $("#background").css({ marginTop: background_margin_top });
    }

    if (window_width > window_height) {
        $(".carousel-inner").css({ "max-height": window_height - nav_height - 85 });
    }



    $(document).on('click', 'a[href^="#"]', function (event) {
        $("#menu").attr("class", "navbar-collapse bd-links navbar-collapse collapse");

        if ($.attr(this, 'href') == "#home") {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return;
        }
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - $("header").height()
        }, 500);
    });

    displayAccommodation(accommodation);
    //$("#next").prop("disabled", true);

    $('.category').click(function (e) {
        let categoryClicked = e.target.innerHTML;
        let filtered = filterByCategory(accommodation, categoryClicked);
        displayAccommodation(filtered);
    });
    //$(".select").click(selectClicked);

    $('#meals').on('shown.bs.modal', function () {
        alert("nooooooo");
        $(".event-radio").change(calculateCost);
    });
    $(".event-radio").change(calculateCost);
    $("#event input").keydown(onnext);

    $("#next").click(function () {
        $(".addselect").show();
    });
    nextStep();

    $("#search-btn").click(function () {
        let searchBtn = document.getElementById("search-result");
        searchBtn.classList.remove("hidden");
    });
    $("#hide-btn").click(function () {
        let hideBtn = document.getElementById("search-result");
        hideBtn.classList.add("hidden");
    });


    init();

});


