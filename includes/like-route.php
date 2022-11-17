<?php

function universityLikeRoutes()
{
    register_rest_route("university/v1", "manageLike", array(
        'methods' => "POST",
        'callback' => "createLike"
    ));

    register_rest_route("university/v1", "manageLike", array(
        'methods' => "DELETE",
        'callback' => "deleteLike"
    ));
}
add_action("rest_api_init", "universityLikeRoutes");

function createLike()
{
    return "Thanks for trying";
}

function deleteLike()
{
    return "Like deleted";
}
