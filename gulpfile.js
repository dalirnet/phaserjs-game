const gulp         = require("gulp"),
      babel        = require("gulp-babel"),
      uglify       = require("gulp-uglify"),
      browserify   = require("gulp-browserify"),
      rename       = require("gulp-rename"),
      tinypng      = require("gulp-tinypng-compress"),
      notify       = require("gulp-notify"),
      autoprefixer = require("gulp-autoprefixer"),
      cleanCSS     = require("gulp-clean-css"),
      browserSync  = require("browser-sync").create();

gulp.task("js", function () {
    return gulp.src("src/js/game.js")
    .pipe(browserify())
    .pipe(babel())
    .pipe(uglify({
        mangle: {
            toplevel: true
        }
    }))
    .pipe(rename("run.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(notify({
        title  : "javascript build done.",
        message: "phaserGame"
    }));
});

gulp.task("css", function () {
    return gulp.src("src/css/style.css")
    .pipe(autoprefixer({
        browsers: [
            "last 2 version",
            "safari 5",
            "ie 9",
            "opera 12.1",
            "ios 6",
            "android 4"
        ]
    }))
    .pipe(cleanCSS())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(notify({
        title  : "stylesheet build done.",
        message: "phaserGame"
    }));
});


gulp.task("js-watch", ["js"], function (done) {
    browserSync.reload();
    done();
});

gulp.task("css-watch", ["css"], function (done) {
    browserSync.reload();
    done();
});

gulp.task("image", function () {
    return gulp.src([
        "src/image/*.{png,jpg,jpeg}",
        "src/image/player/*/*/*.png",
        "src/image/player/*/*.png"
    ])
    .pipe(tinypng({
        key    : "ssWfmsQd-m_1ed6b7DSOP11WUCNU4NUm",
        sigFile: "src/image/.tinypng",
        log    : true
    }))
    .pipe(gulp.dest("dist/image"));
});


gulp.task("default", [
    "js",
    "css"
], function () {
    browserSync.init({
        ui    : false,
        notify: false,
        open  : false,
        port  : 80,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch([
        "index.html",
        "src/js/*.js",
        "src/js/scene/*.js",
        "src/js/scene/level/*.js",
        "src/js/class/*.js"
    ], ["js-watch"]);

    gulp.watch([
        "index.html",
        "src/css/*.css",
    ], ["css-watch"]);
});
