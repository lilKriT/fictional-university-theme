<?php
while (have_posts()) {
    the_post(); ?>
    <!-- Those two lines are actually enough -->
    <h2><?php the_title(); ?></h2>
    <p><?php the_content(); ?></p>
<?php
}
