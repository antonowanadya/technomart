var gulp = require("gulp");
/*require- подключение модуля галп ,
 переменная галп становится объектом со своими методами*/
var less =  require("gulp-less");
var plumber = require("gulp-plumber");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var server = require("browser-sync");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require('gulp-rename');
var del = require("del");
var run = require("run-sequence");

gulp.task("style", function() { //less- имя задачи, его потом пишем в консоли gulp less
    gulp.src("assets/less/base.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([

            autoprefixer({ browsers: [
                "last 1 version",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions"
            ]}),
            mqpacker({
                sort: true
            })
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(server.reload({stream:true}));
});


gulp.task("serve", function() {
    server.init({
        server: "build"
    });

    gulp.watch("assets/less/**/*.less", ["style"]);
    gulp.watch("*.html", ["copy"])
        .on("change", server.reload);
});

gulp.task("build", function(fn) {
    run("clean", "copy", "style", fn)
});

gulp.task("clean", function(){
    return del("build")
});

gulp.task("copy", function(){
    return gulp.src([
        "fonts/**",
        "images/**",
        "js/**",
        "*.html"
    ] , {
        base: "."
    })
        .pipe(gulp.dest("build"))
})
