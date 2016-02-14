
(function($) {
    $(document).ready(function() {

    /* ==========================================================================
     GENERIC - insert credit card
     ========================================================================== */

    $("input").keyup(function() {
        $(this).val(this.value.match(/[0-9]*/));
    });

    /* preload the ad image */
    $('<img src="images/ad1.jpg" />');

    /* go to another tab */
    function goTo(destination, time){
        setTimeout(function(){
            $('a[href="#' + destination + '"]').tab('show');
        },time)
    }

    $('form').attr('autocomplete', 'off');

    var trial = 0;
    $(".canceltransaction").on('click', function() {
        goTo('canceltransaction', 0);
    });

    /* ==========================================================================
     TAB 2 - enter PIN
     ========================================================================== */

    $("#pinfield").focus();

    /* dont accept spaces */
    $("#pinfield").on( "blur", function() {
        var value = $( this ).val().trim();
        $(this).val(value);
    });

    $('#pin form').submit(function(e) {
    //$('#pin form :submit').click(function(e) {
    //$('#pin').on('click','form :submit', function(e) {

        e.preventDefault();

        if ( $('#pinfield').val() == '1234') {
            //goTo('selectamount', 0);
            //$('a[href="#selectamount"]').tab('show');
            $('ul.nav li:eq(2) a').tab('show');
        } else {

            trial ++;

            if (trial >= 3) {
                goTo('canceltransaction', 0);
            } else {
                $('.alert').toggleClass('visible');
                setTimeout(function(){
                    $('.alert').toggleClass('visible');
                },3000);
            }
        }
    });



    /* ==========================================================================
     TAB 3 - select amount
     ========================================================================== */

    $('.customamount').on('click', function(){
        $('#selectamount form').show();
    });

    $('#selectamount form').submit(function(e) {
        e.preventDefault();
        if ($("#selectamount input").val()) {
            console.log($("input").val());
            goTo('preparing', 0);
        }
    });

    /* ==========================================================================
     TAB 4
     ========================================================================== */

    $('a[href="#preparing"]').on('shown.bs.tab', function (e) {
        goTo('showmethemoney', 5000);
    });

    /* ==========================================================================
     TAB 5
     ========================================================================== */

    $('a[href="#showmethemoney"]').on('shown.bs.tab', function (e) {
        goTo('home', 5000);
    });

    /* ==========================================================================
     TAB 6 - Cancel transaction
     ========================================================================== */

    $('a[href="#canceltransaction"]').on('shown.bs.tab', function (e) {
        trial = 0;
        goTo('home', 5000);
    });

    });
})(jQuery);