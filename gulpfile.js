let gulp = require('gulp');
let fs = require('fs');
let $ = require('gulp-load-plugins')({ pattern: '*' });
const isDev = process.argv.indexOf('--dev') !== -1;
const isProd = !isDev;
const isSync = process.argv.indexOf('--sync') !== -1;

let ftpconf = JSON.parse(fs.readFileSync('./ftp.json')),
pth = {
	pbl: {
		root: './docs/', 
		html: './docs/',
		js: './docs/',
		css: './docs/',
		img: './docs/images/',
		fnts: './docs/fonts/'
	},
	src: {
		root: './src/',
		html: './src/[^_]*.html', // src/*.html - взять все файлы с расширением кроме _
		js: './src/js/common.js',
		css: './src/scss/style.scss',
		scss: './src/scss/lib/',		
		img: ['./src/images/**','!./src/images/**/*.psd'],
		fnts: './src/fonts/**/*.*',
		tmp: './src/tmp/'
	},
	wtch: {
		html: './src/**/*.html',
		js: ['./src/js/**/*.js','./src/blocks/**/*.js'],
		css: ['./src/scss/**/*.scss','./src/blocks/**/*.scss'],
		img: './src/images/**/*.*',
		fnts: './src/fonts/**/*.*'
	}
};

function getFtpConnection() {
	return $.vinyl_ftp.create({
		host:		ftpconf.host,
		user:		ftpconf.user,
		password:	ftpconf.password,
		parallel:	10,
		log:		$.fancyLog
	});
}

function swallowError (error) {
	console.log(error.toString())
	this.emit('end')
}

function clear() {
	return $.del(pth.pbl.root + '*');
}

function js() {
	return $.browserify({ entries: pth.src.js })
		.transform($.babelify, { presets: ['@babel/preset-env'] })
		.bundle()
		.pipe($.vinylSourceStream('common.js'))
		.pipe($.vinylBuffer())
		.pipe($.if(isDev, $.sourcemaps.init()))
		.pipe($.if(isProd, $.uglifyEs.default()))
		.on('error', swallowError)
		.pipe($.if(isDev, $.sourcemaps.write()))
		.pipe(gulp.dest(pth.pbl.js))
		.pipe($.if(isSync, $.browserSync.stream()));
}

function html() {
	return gulp.src(pth.src.html)
		.pipe($.fileInclude({ prefix: '@@', basepath: '@file' }))	
		.on('error', swallowError)
		.pipe(gulp.dest(pth.pbl.html))
		.pipe($.if(isSync, $.browserSync.stream()));
}

function styles() {
	return gulp.src(pth.src.css)
		.pipe($.if(isDev, $.sourcemaps.init()))
		.pipe($.sass())
		.on('error', swallowError)
		.pipe($.autoprefixer({ cascade: false }))
		.pipe($.cssUrlencodeInlineSvgs())
		.pipe($.if(isProd, $.cleanCss({ level: 2 })))
		.pipe($.if(isDev, $.sourcemaps.write()))
		.pipe(gulp.dest(pth.pbl.css))
		.pipe($.if(isSync, $.browserSync.stream()));
}

function images() {
	return $.del([pth.pbl.img+'*']).then(function(paths) {
		gulp.src(pth.src.img) 
		.pipe(gulp.dest(pth.pbl.img))
		.pipe($.if(isSync, $.browserSync.stream()));
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});
}

function fonts() {
	return $.del([pth.pbl.fnts+'*']).then(function(paths) {
		gulp.src(pth.src.fnts) 
		.pipe(gulp.dest(pth.pbl.fnts))
		.pipe($.if(isSync, $.browserSync.stream()));
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});
}

function watch() {
	if(isSync){
		$.browserSync.init({
			server: { baseDir: pth.pbl.root }
		});
	}
	gulp.watch(pth.wtch.js, js);
	gulp.watch(pth.wtch.html, html);
	gulp.watch(pth.wtch.css, styles);
	gulp.watch(pth.wtch.img, images);
	gulp.watch(pth.wtch.fnts, fonts);
}

let gridOptions = {
	outputStyle: 'scss', 
	columns: 24,
	offset: "40px",  // gutter width px || % 
	container: {
		maxWidth: '1400px',  // max-width оn very large screen 
		fields: '20px'  // side fields 
	},
	breakPoints: {
		xxxxxlg: { 'width': '2160px' },
		xxxxlg: { 'width': '1920px' },
		xxxlg: { 'width': '1680px' },
		xxlg: { 'width': '1440px' },
		xlg: { 'width': '1280px' },
		lg: { 'width': '1100px' },
		md: { 'width': '960px' },
		sm: { 'width': '780px' },
		xs: { 'width': '640px' },
		xxs: { 'width': "480px" },
		xxxs: { 'width': "360px"}
	},
	'properties': [],
	'oldSizeStyle': false
};

function grid(done) {
	$.smartGrid('./src/scss/lib', gridOptions);
	done();
}

function deploy() {
	var conn = getFtpConnection()
	if (process.argv.indexOf('--remove') !== -1) {
		conn.rmdir(ftpconf.workdir+'/*', function(err) {
			if (err) return cb(err);
			return gulp.src(path.public.root+'**', {base: path.public.root, buffer: false})
					.pipe(conn.dest(ftpconf.workdir));
		});
	}
	else if (process.argv.indexOf('--new') !== -1) {
		return gulp.src(path.public.root+'**', {base: path.public.root, buffer: false})
			.pipe(conn.newerOrDifferentSize(ftpconf.workdir))
			.pipe(conn.dest(ftpconf.workdir))
			.pipe(conn.clean(ftpconf.workdir, path.public.root));
	} else {
		return gulp.src([path.public.js+'**', path.public.css+'*.css'], {base: path.public.root, buffer: false})
			.pipe(conn.newerOrDifferentSize(ftpconf.workdir))
			.pipe(conn.dest(ftpconf.workdir));
	}
}



const build = gulp.series(clear, gulp.parallel(html, js, styles, images, fonts));

exports.build = build;
exports.watch = gulp.series(build, watch);
exports.deploy = deploy;
exports.grid = grid;


