let project_folder = require("path").basename(__dirname);
let source_folder = "#src";

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/assets/css/",
		js: project_folder + "/assets/js/",
		img: project_folder + "/assets/images/",
		fonts: project_folder + "/assets/fonts/",
		php: project_folder + "/assets/php/",
		//php: project_folder + "/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/assets/sass/**/*.sass",
		js: source_folder + "/assets/js/script.js",
		img: source_folder + "/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/assets/fonts/*",
		php: source_folder + "/assets/php/**/*.php",
		//php: source_folder + "/*.php",


	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/assets/sass/**/*.sass",
		js: source_folder + "/assets/js/**/*.js",
		img: source_folder + "/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: "./" + project_folder + "/",

};

let {
	src,
	dest
} = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	webp = require("gulp-webp"),
	webphtml = require("gulp-webp-html"),
	//webpcss = require("gulp-webpcss");
	svgSprite = require("gulp-svg-sprite"),
	ttf2woff = require("gulp-ttf2woff"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	fonter = require("gulp-fonter"),
	concat = require('gulp-concat'),
	rigger = require('gulp-rigger'),
	sourcemaps = require('gulp-sourcemaps');

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	});
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function php() {
	return src(path.src.php)
		.pipe(dest(path.build.php))
		.pipe(browsersync.stream())

}

function css() {
	return src(path.src.css)
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: "expanded"
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		//.pipe(webpcss())
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function cssConcat() {
	return gulp.src([
			'#src/assets/css/normalize.css',
			'#src/assets/css/font.css',
			'#src/assets/css/slick.css',
			'#src/assets/css/slick-theme.css',
			//'node_modules/selectize/dist/css/selectize.default.css',
			//'src/assets/css/tooltipster-sideTip-borderless.min.css',
			//'src/assets/css/tooltipster.bundle.min.css',
			//'src/assets/css/animate.css',
			//'src/assets/css/tiltedpage-scroll.css',
			/*'src/css/fontello.css',*/
			//'#src/assets/css/jquery.fancybox.min.css',
			'node_modules/animate.css/animate.css',
			//'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',


		])
		.pipe(concat('_libs.css'))
		.pipe(dest(path.build.css))
		.pipe(dest('#src/assets/css'))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}


function jsConcat() {
	return gulp.src([ // Берем все необходимые библиотеки
			'#src/assets/js/jquery.min.js',
			'#src/assets/js/jquery.fancybox.min.js',
			//'node_modules/selectize/dist/js/standalone/selectize.js',
			//'src/assets/js/tooltipster.bundle.min.js',
			//'node_modules/jquery-validation/dist/jquery.validate.min.js',
			//'node_modules/card-info/dist/card-info.min.js',
			//'src/assets/js/jquery.validate.min.js',
			//'src/assets/js/jquery.maskedinput.min.js',
			//'src/assets/js/jquery.vide.js',
			//'src/assets/js/jquery.tiltedpage-scroll.min.js',
			'#src/assets/js/slick.js', // Берем jQuery
			// Берем Magnific Popup
			//'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
			//'node_modules/jquery.waitforimages/dist/jquery.waitforimages.js',
			//'node_modules/wow.js/dist/wow.js'
			//'node_modules/jquery-validation/dist/jquery.validate.min.js',
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('#src/assets/js')) // Выгружаем в папку app/js
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{
					removeViewBox: false
				}],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}


function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
}

gulp.task('otf2ttf', function () { //Запускается руками для создания конвертирования otf в ttf
	return gulp.src([source_folder + '/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'));
})

gulp.task('svgSprite', function () { //Запускается руками для создания svg спрайтов
	return gulp.src([source_folder + '/iconsprite/*.svg'])
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../icons/icons.svg", // Имя файла спрайта
					//example: true Для примера разкоментить и там будут примеры для подключения
				}
			},
		}))
		.pipe(dest(path.build.img))
})

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(jsConcat, js, cssConcat, css, html, images, fonts /*php*/ ));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.php = php;
exports.jsConcat = jsConcat;
exports.cssConcat = cssConcat;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;