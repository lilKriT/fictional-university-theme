<?php

function university_files()
{
    // The first name doesn't matter - this is the basic css
    // wp_enqueue_style("university_main_styles", get_stylesheet_uri());
    wp_enqueue_style("font-awesome", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");
    wp_enqueue_style("university_main_styles", get_theme_file_uri("/build/style-index.css"));
    wp_enqueue_style("university_extra_styles", get_theme_file_uri("/build/index.css"));
}

add_action("wp_enqueue_scripts", "university_files");
