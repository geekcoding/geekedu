seajs.config({
   plugins: ['shim'],
   alias: {
       'main': '/themes/default/js/main.js',
       'jquery': {
           src: '/themes/default/libs/jquery-2.0.0.js',
           exports: 'jQuery'
       },
       'bootstrap': {
           src: '/themes/default/libs/bootstrap/js/bootstrap.min.js',
           deps: ['jquery']
       },
       'less': {
       	   src: '/themes/default/libs/less-1.3.3.min.js',
       }
       ,
       'mediaelement':{
           src: '/themes/default/libs/mediaelement/mediaelement-and-player.min.js',
           deps: ['jquery']
       }
    }
});