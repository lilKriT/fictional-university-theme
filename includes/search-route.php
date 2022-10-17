<?php

function universityRegisterSearch()
{
    // arguments are namepsace, route, what happens
    register_rest_route("university/v1", "search", array(
        'methods' => WP_REST_SERVER::READABLE,  // this is a fancy way of saying GET
        'callback' => "universitySearchResults"
    ));
}
add_action("rest_api_init", "universityRegisterSearch");

function universitySearchResults()
{
    // WP will automatically convert this into JSON
    // return array(
    //     "red,", "orange"
    // );

    $professors = new WP_Query(array(
        "post_type" => "professor"
    ));

    $professorResults = array();

    while ($professors->have_posts()) {
        $professors->the_post();
        array_push($professorResults, array(
            "title" => get_the_title(),
            "permalink" => get_the_permalink(),
        ));
    }

    return $professorResults;
}
