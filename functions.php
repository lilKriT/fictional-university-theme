<?php

require get_theme_file_path("/includes/search-route.php");

function university_files()
{
    // The first name doesn't matter - this is the basic css
    // wp_enqueue_style("university_main_styles", get_stylesheet_uri());
    wp_enqueue_style("university_main_styles", get_theme_file_uri("/build/style-index.css"));
    wp_enqueue_style("university_extra_styles", get_theme_file_uri("/build/index.css"));
    wp_enqueue_style("font-awesome", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");
    wp_enqueue_style("google-fonts", "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,400;1,700");

    wp_enqueue_script("university_js", get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    // Not using google maps but the code is here:
    wp_enqueue_script("googleMap", "//maps.googleapis.com/maps/api/js?key=KEYGOESHERE", NULL, '1.0', true);

    // Localizes the file. Name of file (from lines above), variable name (make it up), array of data you want available
    wp_localize_script("university_js", "universityData", array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce("wp_rest"),
    ));
}

add_action("wp_enqueue_scripts", "university_files");

function university_features()
{
    add_theme_support("title-tag");
    // Personally I would add it to a different function but that's how the course does it:
    register_nav_menu('headerMenuLocation', 'Header Menu Location');
    register_nav_menu('footerMenuLocationOne', 'Footer Menu Location One');
    register_nav_menu('footerMenuLocationTwo', 'Footer Menu Location Two');

    // Featured image
    add_theme_support("post-thumbnails");
    add_image_size("professorLandscape", 400, 260, true);
    add_image_size("professorPortrait", 480, 650, true);
    add_image_size("pageBanner", 1500, 350, true);
}
add_action("after_setup_theme", "university_features");

function university_adjust_queries($query)
{
    if (!is_admin() && is_post_type_archive("event") && $query->is_main_query()) {
        $today = date('Ymd');
        $query->set("meta_key", "event_date");
        $query->set("orderby", "meta_value_num");
        $query->set("order", "ASC");
        $query->set("meta_query", array(
            array(
                'key' => 'event_date',
                'compare' => ">=",
                'value' => $today,
                'type' => 'numeric'
            )
        ));
    }

    if (!is_admin() && is_post_type_archive("program") && $query->is_main_query()) {
        $query->set("orderby", "title");
        $query->set("order", "ASC");
        $query->set("posts_per_page", -1);
    }

    if (!is_admin() && is_post_type_archive("campus") && $query->is_main_query()) {
        $query->set("posts_per_page", -1);
    }
}
add_action("pre_get_posts", "university_adjust_queries");

function pageBanner($args = NULL)
{
    if (!$args['title']) {
        $args['title'] = get_the_title();
    }

    if (!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }

    if (!$args['photo']) {
        if (get_field('page_banner_background_image') && !is_archive() && !is_home()) {
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(
            <?php
            echo $args['photo'];
            ?>)">
        </div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php echo $args['title']; ?></h1>
            <div class="page-banner__intro">
                <p><?php echo $args['subtitle']; ?></p>
            </div>
        </div>
    </div>
<?php
}

// I'm not using google maps, but the code is here:
function universityMapKey($api)
{
    $api['key'] = "KEYGOESHERE";
    return $api;
}
add_filter('acf/field/google_map/api', 'universityMapKey');

function university_custom_rest()
{
    register_rest_field("post", "authorName", array(
        "get_callback" => function () {
            return get_the_author();
        }
    ));
}
add_action("rest_api_init", "university_custom_rest");

// Redirect subscriber accounts to homepage
function redirectSubsToFrontend()
{
    $currentUser = wp_get_current_user();

    if (count($currentUser->roles) == 1 && $currentUser->roles[0] == "subscriber") {
        wp_redirect(site_url("/"));
        exit;
    }
}
add_action("admin_init", "redirectSubsToFrontend");

function noSubsAdminBar()
{
    $currentUser = wp_get_current_user();

    if (count($currentUser->roles) == 1 && $currentUser->roles[0] == "subscriber") {
        show_admin_bar(false);
    }
}
add_action("wp_loaded", "noSubsAdminBar");

// Customize login screen
function ourHeaderUrl()
{
    return esc_url(site_url("/"));
}
add_filter("login_headerurl", "ourHeaderUrl");

function ourLoginTitle()
{
    return get_bloginfo('name');
}
add_filter('login_headertext', 'ourLoginTitle');

function ourLoginCSS()
{
    wp_enqueue_style("university_main_styles", get_theme_file_uri("/build/style-index.css"));
    wp_enqueue_style("university_extra_styles", get_theme_file_uri("/build/index.css"));
    wp_enqueue_style("font-awesome", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");
    wp_enqueue_style("google-fonts", "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,400;1,700");
}
add_action("login_enqueue_scripts", "ourLoginCSS");
