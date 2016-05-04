//Initialize some variables we shall be using
var shopUrl;
var itemsId;
var addItemButtons = new Array(100);
var cartItems;
var cosulMeu;
var cartUrl;
var pasulUrmator;
var loginPage;


shopUrl = "https://www.metro.ro/shop/ro/office/category/vic_lichidari/Lichidari";
cosulMeu = 'a.button.button-green.Xright.mini-cart-button.linkSubmit';
cartUrl = "https://www.metro.ro/shop/ro/office/cart.html?";
itemsId = [ "703837001001", "703278001001"];
pasulUrmator = 'div.button.button-green-double.right';
loginPage = 'https://login.metro-group.com/auth/UI/Login?';

for (i = 0; i < itemsId.length; i++) {
    addItemButtons[i] = "a.pluscart.ta-" + itemsId[i];
}

//var casper = require('casper').create();

phantom.casperTest = true;
casper.options.viewportSize = {
    width: 1680,
    height: 910
};

casper.options.waitTimeout = 5000;

//function setUpTest(url, idArray) {
//casper.echo("function was called");

//} //initiate shop url and items to be added to cart

function shopForItems() {
    casper.then(function() {
        this.echo("\n==========================================");
        this.echo("shopForItems");
        this.echo("==========================================\n");
    })

    casper.then(function() {
        casper.open(shopUrl).waitForUrl(shopUrl, function pass() {
                this.test.pass("The shop was opened, the used url was: " + shopUrl);
            }, function fail() {
                this.test.fail("The shop page has no loaded, the url used was: " + shopUrl);
            })
            //PROBLEM WITH LOOP/ 
        casper.then(function() {
            for (n = 0; n < itemsId.length; n++) {

                casper.test.assertExists(addItemButtons[n], ' Asserting the item nr ' + n + 'exists');
                casper.click(addItemButtons[n]);
                casper.echo("The button " + addItemButtons[n] + " was clicked and the item added to the cart");

            }

            casper.then(function() {
                this.test.assertExists(cosulMeu, 'Assering that the button "Cosul Meu" exists');
                this.click(cosulMeu);
                casper.wait(3000, function() {
                    this.echo("WAITING FOR PAGE TO LOAD");
                });
                casper.then(function() {
                    this.test.assertUrlMatch(cartUrl, 'Asserting that the button CosulMeu led us to the shopping cart page');
                });
            });




        });

    });
}

function checkOut() {
    casper.then(function() {
        this.echo("\n==========================================");
        this.echo("checkOut");
        this.echo("==========================================\n");
    });
    casper.then(function() {
        this.open(cartUrl).waitForUrl(cartUrl, function pass() {
            this.test.pass("The user was led to the correct URL: " + this.getCurrentUrl());
        }, function fail() { this.test.fail("The user was not led to the correct URL, instead he was led to" + this.getCurrentUrl()); })
    });

    casper.wait(5000, function() {
        this.echo("WAITING FOR PAGE TO LOAD");
    });

    /*casper.then(function() {
        for (n = 0; n < itemsId.length; n++) {

            casper.wait(3000, function() {
                this.echo("WAITING FOR PAGE TO LOAD");
            });
            casper.test.assertExists("#prod-" + itemsId[n] + " > td:nth-child(2) > p > span:nth-child(2)", 'Assering the right items were added to the cart by checking the IDs' + itemsId[n]);

        }
    }); //No clue why this isn't working*/

    casper.then(function() {
        this.test.assertExists(pasulUrmator, 'Assering that the button "Pasul Urmator" exists');
        casper.wait(5000, function() {
            this.echo("WAITING FOR PAGE TO LOAD");
        });
        this.click(pasulUrmator);

        casper.wait(5000, function() {
            this.echo("WAITING FOR PAGE TO LOAD");
        });
        casper.then(function() {
            this.test.assertUrlMatch(loginPage, 'Asserting that the button Cosul urmator led to the login page');
        });
    });
}


//SHOULD REALLY BE casper.tester.begin but I don't understand the tester module apparently
casper.test.begin('Test de cumparare din Lichidare de stoc', 14, function suite(test) {
    //setUpTest("https://www.metro.ro/shop/ro/office/category/vic_lichidari/Lichidari", ["31252", "421523", "745745"]);
    //this.echo("Test suite was initialized");
    casper.start();
    casper.echo("casper was started");
    shopForItems();
    checkOut();

});




casper.run(function() {
    this.test.done();
});
