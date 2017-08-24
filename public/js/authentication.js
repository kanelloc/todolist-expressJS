/**
 * Function to toggle hide show the password from register form.
 */
$(function() {
    $('.hide-show span').addClass('not-show')
    $('.hide-show span').on('click', function(){
        if ($(this).hasClass('not-show')) 
            {
                $(this).removeClass('fa-eye-slash');
                $('input[name="password"]').attr('type', 'text');
                $(this).addClass('fa-eye');
                $(this).removeClass('not-show');
            } else {
                $(this).removeClass('fa-eye');
                $('input[name="password"]').attr('type', 'password');
                $(this).addClass('fa-eye-slash');
                $(this).addClass('not-show');
            }
    });
});