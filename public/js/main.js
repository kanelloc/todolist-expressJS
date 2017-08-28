$(function(){
    /**
     * Post a new Todo Item.
     * POST AJAX Request.
     * Success: modal hide, empty input, append html.
     */
    $('#create-form').on('submit', function(event) {
        var todo = $('#create_input').val();
        var $ul = $('ul#todo_items');
        event.preventDefault();
        $.ajax({
            url: '/todolist',
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify({ todoItem: todo }),
            success: function(response) {
                var newItem = response.body;
                var dataId  = response._id;
                itemHTML = '<li class="list-group-item" id='+dataId+'>\
                                <div class="col-10 div-item">\
                                    <a href="#" id="item_body">' + newItem + '</a>\
                                </div>\
                                <div class="col-1">\
                                    <a class="float-right fa fa-edit edit-article" href="#" data-id="'+dataId+'" ></a>\
                                </div>\
                                <div class="col-1">\
                                    <a class="float-right fa fa-trash-o delete-article" href="#" data-id="'+dataId+'" ></a>\
                            </li>'
                $('#myModal').modal('hide');
                $('#create_input').val('');
                $('#todo_items').append(itemHTML);
            }
        });
    });

    // $('.edit-article').each(function(){
    //     $(this).click(function(event){
    //         var text = $(this).parent()
    //                           .parent()
    //                           .find('.div-item')
    //                           .children().text();
    //         $('#editModal').modal('toggle');
    //         $('#edit_input').val(text);
    //         console.log(text);
    //     });
    // })

    // $('.delete-article').on('click', function(event){
    //     $target     =   $(event.target);
    //     var itemId  =   $target.attr('data-id');
    //     $.ajax({
    //         type:'DELETE',
    //         url:'/todolist/'+itemId,
    //         success: function(response) {
    //             console.log('NEXT:'+response);
    //             $("#"+response).hide();
    //         },
    //         error: function(err){
    //             console.log(err);
    //         }
    //     })
    // });

    /**
     * Find Item's body and show it to the edit Modal
     */
    $('#todo_items').on('click', '.edit-article', function(event){
        var itemId  = $(this).attr('data-id');
        var text    = $(this).parent()
                            .parent()
                            .find('.div-item')
                            .children().text();
        $('#editModal').modal('toggle');
        $('#edit_input').val(text);
        $('#editButton').val(itemId);
    });

    /**
     * Edit Todo Items on click.
     * PUT AJAX Request.
     * Success: Change list item's <a> to the response's body.
     */
    $('#edit-form').on('submit', function(event) {
        event.preventDefault();
        var newTodo = $('#edit_input').val();
        var itemId  = $('#editButton').val();
        $.ajax({
            type:'PUT',
            url:'todolist/'+itemId,
            contentType: 'application/json',
            data: JSON.stringify({ todoItem: newTodo }),
            success: function(response) {
                console.log('PUT:'+response.body)
                var htmlItem = $('li#'+response._id).find('.div-item')
                                                    .children()
                                                    .text(response.body);
                console.log(htmlItem);
                $("#editModal").modal('hide');
            }
        });
    });

    /**
     * Delete Todo Items on click.
     * DELETE AJAX Request.
     * Success: Hide li.
     */
    // $('#todo_items').on('click', '.delete-article', function(event){
    //     $target     =   $(event.target);
    //     var itemId  =   $target.attr('data-id');
    //     $.ajax({
    //         type:'DELETE',
    //         url:'/todolist/'+itemId,
    //         success: function(response) {
    //             console.log('NEXT:'+response);
    //             $("#"+response).hide();
    //         },
    //         error: function(err){
    //             console.log(err);
    //         }
    //     })
    // });

    /**
     * Delete Todo Items on click.
     * DELETE AJAX Request.
     * Success: Hide li.
     * Sweet alert: on.
     */
    $('#todo_items').on('click', '.delete-article', function(event){
        $target     =   $(event.target);
        var itemId  =   $target.attr('data-id');

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this item.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function(){
            $.ajax({
                type:'DELETE',
                url:'/todolist/'+itemId,
                success: function(response) {
                    swal({
                        title: "",
                        text: "File deleted",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Return",
                        closeOnConfirm: true
                    }, function(){
                            console.log('Deleted: '+response);
                            $("#"+response).hide();
                    });
                },
                error: function(err){
                    console.log(err);
                }
            })
        });
    });

    $('#showTodo_list').on('click', function() {
        $("#todo_items").fadeToggle(500, 'swing');
    });
});