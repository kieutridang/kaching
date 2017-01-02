<?php
/**
 * Template Name: Panel app
 */
?>

<?php get_header(); ?>


<!-- <div ng-include src="'<?php echo home_url(get_template_directory_uri()); ?>/assets/js/panel-module/templates.html'"></div> -->
<div ng-include src="'<?php echo home_url(get_template_directory_uri()); ?>/assets/kaching/panel-module/templates.html'"></div>
<div class="container-fluid">
    <div class="row container-full-page clearfix">
        <div class="col-sm-4 col-md-4 col-lg-2 sidebar-area">
            <div id="view-header" ui-view="header"></div>
            <?php get_footer(); ?>
        </div>
        <div class="col-sm-8 col-md-8 col-lg-10 col-lg-push-2 col-md-push-4 col-sm-push-4 content content-area">
            <div id="view-master" ui-view="main"></div>
        </div>
    </div>
</div>
