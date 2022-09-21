<?php

function university_files()
{
    // The first name doesn't matter - this is the basic css
    // wp_enqueue_style("university_main_styles", get_stylesheet_uri());
    wp_enqueue_style("university_main_styles", get_theme_file_uri("/build/style-index.css"));
    wp_enqueue_style("university_extra_styles", get_theme_file_uri("/build/index.css"));
    wp_enqueue_style("font-awesome", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");
    wp_enqueue_style("google-fonts", "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,400;1,700");

    wp_enqueue_script("university_js", get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
}

add_action("wp_enqueue_scripts", "university_files");
