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

$(function(){
    /**
     * Post a new User.
     * POST AJAX Request.
     * Success:
     */
    $('#registerForm').on('submit', function(event) {
       var email                    = $('#register_email').val();
       var username                 = $('#register_username').val();
       var password                 = $('#register_password').val();
       var password_confirmation    = $('#register_password_confirmation').val();
       event.preventDefault();
       // console.log("Email: "+email+ " Username: " + username + " Password: " + password);
       $.ajax({
            url:'/auth/register',
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email: email, username: username, password: password, password_confirmation: password_confirmation  }),
            success: function(response){
                if ($.isArray(response)) {
                    // console.log(response);
                    $.each(response, function(index, value){
                        $.notify(value.msg);
                    });
                } else if (response == 'unique-error'){
                    $.notify('Email already in use. Please try another.')
                } else {
                    $('#register-modal').modal('hide');
                    console.log(response);
                    swal("", "Account succeessfully created", "success");
                }
            }
       });
    });

    $('#signinForm').on('submit', function(event){
        var email       = $('#login_email').val();;
        var password    = $('#login_password').val();
        event.preventDefault();
        // console.log("Email: "+email+ " Password: " + password);
        $.ajax({
            url:'/auth/login',
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username: email, password: password }),
            success: function(response){
                if (response === 'logedIn') {
                    window.location.href = '/';
                } else{
                    $.notify(response.message);
                }
                // console.log(response);
            }
        });
    });
});