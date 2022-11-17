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

function createLike($data)
{
    $professor = sanitize_text_field($data["professorID"]);

    wp_insert_post(array(
        "post_type" => "like",
        "post_status" => "publish",
        "post_title" => "A title for a Like",
        "meta_input" => array(
            "liked_professor_id" => $professor
        )
    ));
}

function deleteLike()
{
    return "Like deleted";
}
