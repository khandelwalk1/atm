
(function($) {
    $(document).ready(function() {

        /* ==========================================================================
         GENERIC
         ========================================================================== */

        /* allow only numbers on input fields  */
        $("input").on( "keyup", function() {
            $(this).val(this.value.match(/[0-9]*/));
        });

        /* preload the ad image */
        $('<img src="images/ad1.jpg" />');

        /* generic function for redirection between tabs */
        function goTo(destination, time){
            setTimeout(function(){
                $('a[href="#' + destination + '"]').tab('show');
            },time)
        }

        var trial = 0; /* set tries variable  */

        $(".canceltransaction").on('click', function() {
            goTo('canceltransaction', 0); /* when cancel button is clicked, redirect appropriately */
        });

        /* ==========================================================================
         TAB 2 - enter PIN
         ========================================================================== */

        $('a[href="#pin"]').on('shown.bs.tab', function (e) {
            $("#pinfield").focus(); /* focus on the field when shown  */
        });

        $('#pin form').submit(function(e) {
        //$('#pin form :submit').click(function(e) {
        //$('#pin').on('click','form :submit', function(e) {

            e.preventDefault(); /* dont submit form */

            if ( $('#pinfield').val() == '1234') { /* what happens when PIN is correct */
                //goTo('selectamount', 0);
                //$('a[href="#selectamount"]').tab('show');
                $('ul.nav li:eq(2) a').tab('show');
            } else { /* PIN is incorrect */

                trial ++; /* increment trial variable */

                if (trial >= 3) {
                    trial = 0; /* reset trial counter */
                    goTo('canceltransaction', 0); /* cancel transaction */
                } else {
                    /* alert error */
                    $('.alert').toggleClass('visible').html("Wrong PIN. Please try again. <br>You have " + (3 - trial) + " more tries.");
                    setTimeout(function(){ /* hide error */
                        $('.alert').toggleClass('visible');
                    },3000);
                }
            }
        });

        /* ==========================================================================
         TAB 3 - select amount
         ========================================================================== */

        /* "other amount" button is clicked - show the form */
        $('.customamount').on('click', function(){
            $('#selectamount form').show();
        });

        // "other amount" form is submitted. There could be other validators here eg. allow only 20, 40, 60, 80
        // currently it will accept any kind of number but only 5 digits.
        $('#selectamount form').submit(function(e) {
            e.preventDefault();
            if ($("#selectamount input").val()) {
                goTo('preparing', 0);
            }
        });

        /* ==========================================================================
         TAB 4 - please wait
         ========================================================================== */

        /* transaction is being processed. Please wait :) */
        //$('a[href="#preparing"]').on('shown.bs.tab', function (e) {
        //    goTo('showmethemoney', 5000);
        //});

        /* ==========================================================================
         TAB 5 - get your money and your card
         ========================================================================== */

        /* thank you for using the ATM - take your money and card and redirect to homepage */
        $('a[href="#showmethemoney"]').on('shown.bs.tab', function (e) {
            goTo('home', 5000);
        });

        /* ==========================================================================
         TAB 6 - Cancel transaction
         ========================================================================== */

        /* screen to be visible only when transaction is cancelled because user wanted to or because PIN was mistaken for 3 times  */
        $('a[href="#canceltransaction"]').on('shown.bs.tab', function (e) {
            trial = 0;
            goTo('home', 5000);
        });

    });
})(jQuery);