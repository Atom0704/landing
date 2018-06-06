const
    path                   = "./src/",
    distPath               = "./dist/",
    dir                    = "default/",
    browserSync            = require('browser-sync'),
    gulp                   = require('gulp'),
    pug                    = require('gulp-pug'),
    less                   = require('gulp-less'),
    notify                 = require('gulp-notify'),
    uncss                  = require('gulp-uncss'),
    concat                 = require('gulp-concat'),
    uglify                 = require('gulp-uglifyjs'),
    csso                   = require('gulp-csso'),
    rename                 = require('gulp-rename'),
    autoprefixer           = require('gulp-autoprefixer'),
    imagemin               = require('gulp-imagemin'),
    multipipe              = require('multipipe');


gulp.task('css-common', function ()
{
    return multipipe
    (
        gulp.src(path + 'less/main.less'),
        less(),
        autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }),
        csso(),
        rename({
            dirname: "./",
            basename: "common",
            suffix: ".min",
            extname: ".css"
        }),
        gulp.dest(distPath + 'css/' + dir),
        browserSync.reload({stream: true})
    ).on('error', notify.onError());
});

gulp.task('css-vendor', function ()
{
    return gulp.src
    ([
        path + 'libs/animate.css/animate.css/'
    ])
        .pipe(concat('vendor.min.css'))
        .pipe(uncss({
         html: [distPath + 'index.html']
         }))
        .pipe(csso())
        .pipe(gulp.dest(distPath + 'css/'))
});

gulp.task('scripts-common', function ()
{
    return multipipe
    (
        gulp.src
        ([
            path + 'js/**/*.js'
        ]),
        concat('common.min.js'),
        uglify(),
        gulp.dest(distPath + 'js/'),
        browserSync.reload({stream: true})
    )
});

gulp.task('scripts-vendor', function ()
{
    return gulp.src
    ([
        path + 'libs/jquery/dist/jquery.js'
    ])
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distPath + 'js/'))
});

gulp.task('pug', function() {
    return multipipe
    (
        gulp.src(path + 'pug/pages/index.pug'),
        pug({
            pretty: true
        }),
        rename({
            dirname: "./",
            basename: "index",
            extname: ".html"
        }),
        gulp.dest(distPath),
        browserSync.reload({stream: true})
    )
});

gulp.task('parts', function() {
    return gulp.src([
        '!' + path + 'pug/parts/_template.pug',
        path + 'pug/parts/**/_*.pug'
    ])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(distPath + 'parts/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function ()
{
    browserSync
    ({
        server:
            {
                baseDir: distPath,
            },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'pug', 'css-common', 'css-vendor', 'scripts-common', 'scripts-vendor', 'fonts', 'images'], function ()
{
    gulp.watch(path + 'less/**/*.less', ['css-common', 'images']);
    gulp.watch(path + 'pug/**/*.pug', ['pug', 'images']);
    gulp.watch(path + 'js/**/*.js', ['scripts-common']);
});

gulp.task('default', ['watch']);