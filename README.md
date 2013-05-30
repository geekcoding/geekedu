geekedu
=======

编程类在线教育网站程序,基于symfony2+mongodb
composer.phar install
php app/console doctrine:mongodb:schema:create
php app/console doctrine:mongodb:generate:documents SiteCommonBundle 
php app/console doctrine:mongodb:generate:documents SiteLessonBundle
php app/console doctrine:mongodb:fixtures:load
php app/console assets:install -env=develpment
php app/console cache:clear -env=develpment