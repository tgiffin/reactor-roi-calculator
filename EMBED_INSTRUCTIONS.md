
# Reactor Calculator - WordPress Embedding Instructions

## Building for Embedding

1. Run the build command to create the embeddable distribution:
   ```
   npm run build
   ```

2. The build will create a `dist` folder with the file `reactor-calculator.js`

3. Upload this file to your web server or WordPress media library

## Embedding in WordPress

### Method 1: Using Custom HTML Block

1. Create a new page or post in WordPress
2. Add a Custom HTML block
3. Paste the following code:

```html
<div id="reactor-calculator-container"></div>
<script src="https://your-domain.com/path/to/reactor-calculator.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (window.ReactorCalculator) {
      new ReactorCalculator('#reactor-calculator-container');
    }
  });
</script>
```

4. Replace `https://your-domain.com/path/to/reactor-calculator.js` with the actual URL where you uploaded the JavaScript file

### Method 2: Using a Page Template

1. Create a new file in your theme directory called `page-calculator.php`
2. Add the following code:

```php
<?php
/**
 * Template Name: Reactor Calculator
 */

get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <div class="entry-content">
                <?php the_content(); ?>
                
                <div id="reactor-calculator-container"></div>
                
                <script src="<?php echo esc_url( get_template_directory_uri() . '/assets/js/reactor-calculator.js' ); ?>"></script>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        if (window.ReactorCalculator) {
                            new ReactorCalculator('#reactor-calculator-container');
                        }
                    });
                </script>
            </div>
        </article>
    </main>
</div>

<?php
get_footer();
```

3. Upload the `reactor-calculator.js` file to your theme's assets/js directory
4. Create a new page and select "Reactor Calculator" as the template

## Troubleshooting

- If styles are conflicting with your WordPress theme, you can add custom CSS to override them.
- If you see any errors in the browser console, make sure the path to the JavaScript file is correct.
- The calculator requires a modern browser; it may not work in older versions of Internet Explorer.

## Customization

If you need to customize the appearance further, you can add custom CSS to your WordPress theme or directly in the page using a style tag.
