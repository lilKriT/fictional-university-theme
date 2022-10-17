<?php

function universitySearchResults()
{
    return "Congrats, route";
}

function universityRegisterSearch()
{
    // arguments are namepsace, route, what happens
    register_rest_route("university/v1", "search", array(
        'methods' => WP_REST_SERVER::READABLE,  // this is a fancy way of saying GET
        'callback' => "universitySearchResults"
    ));
}
add_action("rest_api_init", "universityRegisterSearch");
