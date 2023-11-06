/* Slowly scrolling back to top with the time set in milliseconds */
$('#button-footer').each(function(){
    $(this).click(function(){
        $('html,body').animate({ scrollTop: 0 }, 3000);
        return false;
    });
});
