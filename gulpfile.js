import gulp from 'gulp';
import zip from 'gulp-zip';
import app from './package.json' assert { type: 'json' };

export default gulp.series((cb) => {
  gulp
    .src('build/**', { encoding: false })
    .pipe(zip(`${app.name}-${app.version}.mds.zip`))
    .pipe(gulp.dest('minidapp'));

  cb();
});
