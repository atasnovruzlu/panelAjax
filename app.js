const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
var array = [];
var k = 0;
var tr = "<tr>";
$.ajax({
    url: baseUrl,
    type: "GET",
    success: function (api) {
        array = api;
        for (var i = 0; i < array.length; i++) {
            tr = tr +
                "<td>" + array[i].id + "</td>" +

                "<td>" + array[i].title + "</td>" +
                "<td>" + array[i].body + "</td>" +
                "<td>" + array[i].userId + "</td>" +
                "<td>" + "<i class='fas fa-eye' title='View information' data-toggle='modal' data-target='#viewInfo'></i>" +
                "<i class='far fa-edit' title='Edit information' data-toggle='modal' data-target='#editInfo'></i>" +
                "<i class='fas fa-trash-alt' title='Delete information'></i>" +
                "</tr>";
            k++;
            $("#tbody").html(tr);
        }
        // this section is view information ...
        $(".fa-eye").click(function () {
            var currentid = $(this).closest("tr").children("td").eq(0).text();
            var currentUseId = $(this).closest("tr").children("td").eq(3).text();
            var currentTitle = $(this).closest("tr").children("td").eq(1).text();
            var currentBody = $(this).closest("tr").children("td").eq(2).text();
            var paragraph = "<p>";
            paragraph = paragraph +
                "Id: " + "  " + currentid + "<br>" +
               "Title: " + "  " + currentTitle + "<br>" +
               "Body: " + "  " + currentBody + "<br>" +
                "UserId: " + "  " + currentUseId + "<br>" + 

                "</p>";
            $(".view").html(paragraph);
        });
        // closed

        //edit information section
        $(".fa-edit").click(function () {
            var val_1 = $(this).closest("tr").children("td").eq(0);
            var val_2 = $(this).closest("tr").children("td").eq(1);
            var val_3 = $(this).closest("tr").children("td").eq(2);
            var val_4 = $(this).closest("tr").children("td").eq(3);
            $(".edit-information").click(function () {
                var val1 = $("#change_one").val();
                $("#change_one").val('');
                var val2 = $("#change_two").val();
                $("#change_two").val('');
                var val3 = $("#change_three").val();
                $("#change_three").val('');
                var val4 = $("#change_four").val();
                $("#change_four").val('');
                $("p.text-success").text("Edited");
                const editUrl = baseUrl + "/1";
                editPost = {
                    newId: val1,
                    newTitle: val2,
                    newBody: val3,
                    newUserId: val4
                }
                $.ajax({
                    url: editUrl,
                    type: "PUT",
                    data: editPost,
                    success: function (post) {
                        val_1.text(post.newId).css("color", "white");
                        val_2.text(post.newTitle).css("color", "white");
                        val_3.text(post.newBody).css("color", "white");
                        val_4.text("" + post.newUserId + "").css("color", "white");
                        
                       
                    }
                });
            });
        });
        //closed
        //delete information section ...
        $(".fa-trash-alt").click(function () {
            var deleted = $(this).closest("tr");
            deleted.hide();
        });
        //closed
    }
});

//change button
$("#saveChange").click(function () {
    var UserID = $("#UserID").val();
    $("#UserID").val('');
    var Title = $("#Title").val();
    $("#Title").val('');
    var Body = $("#Body").val();
    $("#Body").val('');
    var postData = {
        UserID: UserID,
        Title: Title,
        Body: Body
    }
    $("#text").text("New Post Created !!!");
    const postUrl = baseUrl;
    $.ajax({
        url: postUrl,
        type: "POST",
        data: postData,
        success: function () {
            k = k + 1;
            var tr = "<tr>";
            tr = tr +
                "<td>" + k + ".</td>" +

                "<td>" + postData.Title + "</td>" +
                "<td>" + postData.Body + "</td>" +
                "<td>" + postData.UserID + "</td>" +
                "<td>" + "<i class='fas fa-eye icon' title='View information' data-toggle='modal' data-target='#viewInfo'></i>" +
                "<i class='far fa-edit icon_1' data-toggle='modal' data-target='#editInfo' title='Edit information'></i>" +
                "<i class='fas fa-trash-alt icon_2' title='Delete information'></i>" +
                "</tr>";
            $("#tbody tr:last-child").after(tr);
            $(".icon").click(function () { // this section is view information ...
                var currentid = $(this).closest("tr").children("td").eq(0).text();
                var currentUseId = $(this).closest("tr").children("td").eq(1).text();
                var currentTitle = $(this).closest("tr").children("td").eq(2).text();
                var currentBody = $(this).closest("tr").children("td").eq(3).text();
                var paragraph = "<p>";
                paragraph = paragraph
                
                + "Id: " + "  " + currentid + "<br>" +
                    "Title: " + "  " + currentTitle + "<br>" +
                    "Body: " + "  " + currentBody + "<br>" +
                    "UserId: " + "  " + currentUseId + "<br>" +
                    "</p>";
                $(".viewbody").html(paragraph);
            }); //closed

            //edit information section
            $(".fa-edit").click(function () {
                var val_1 = $(this).closest("tr").children("td").eq(0);
                var val_2 = $(this).closest("tr").children("td").eq(1);
                var val_3 = $(this).closest("tr").children("td").eq(2);
                var val_4 = $(this).closest("tr").children("td").eq(3);
                $(".edit-information").click(function () {
                    var val1 = $("#change_one").val();
                    $("#change_one").val('');
                    var val2 = $("#change_two").val();
                    $("#change_two").val('');
                    var val3 = $("#change_three").val();
                    $("#change_three").val('');
                    var val4 = $("#change_four").val();
                    $("#change_four").val('');
                    $("p.text-success").text("Post edited");
                    const editUrl = baseUrl + "/1";
                    editPost = {
                        newId: val1,
                        newUserId: val2,
                        newTitle: val3,
                        newBody: val4
                    }
                    $.ajax({
                        url: editUrl,
                        type: "PUT",
                        data: editPost,
                        success: function (post) {
                            val_1.text(post.newId).css("color", "green");
                            val_2.text("/" + post.newUserId + "/").css("color", "green");
                            val_3.text(post.newTitle).css("color", "green");
                            val_4.text(post.newBody).css("color", "green");
                        }
                    });
                });
            });
            //closed
            //delete information section..
            $(".icon_2").click(function () {
                var deleted = $(this).closest("tr");
                deleted.hide();
            });
        }
    });
});

