Polymer({

    is: 'shell-module',

    prevMenuItem: false,

    buildMenu: function() {
        var menuModel = appConfig.sections;
        var targetElement = this.$$('.menu_container');
        menuModel.forEach(function(item, i) {
            var menuItem = document.createElement('a');
            menuItem.innerHTML = item.menuItem;
            menuItem.setAttribute('href', '#/' + item.path);
            menuItem.setAttribute('class', 'menu_item mi_' + i);
            menuItem.setAttribute('data-color', 'color_' + i);
            targetElement.appendChild(menuItem);
        })
    },

    router: function() {

        var sections = [];

        appConfig.sections.forEach(
            function(item) {
                sections.push(item.path);
            }
        );

        var context = this;

        setSectionView = function(target, title) {
            context.$$('.section_viewport').innerHTML = '<' + target + '-section></' + target +'-section>';
            document.title = title;
        };

        getRoute = function() {

            var section = document.location.hash.split('/')[1];

            var currentIndex = sections.indexOf(section);

            if(sections.indexOf(section) != -1) {
                var title = appConfig.sections[currentIndex].pageTitle;
            }

            if(section && currentIndex != -1) {

                setSectionView(section, title);

                context.$$('.left_space').setAttribute('class', 'left_space color_' + currentIndex);
                context.$$('.big_arrow').setAttribute('class', 'big_arrow color_' + currentIndex);
                context.$$('.shadow_kill').setAttribute('class', 'shadow_kill color_' + currentIndex);
                context.$$('.section_viewport').setAttribute('class', 'section_viewport color_' + currentIndex + '_shift');

                var menuItem = context.$$('.mi_' + currentIndex);

                setTimeout(function() {
                    var shift = menuItem.offsetTop;
                    context.$$('.menu_container').style.transform = 'translate(0, -' + shift + 'px)';
                }, 50);

                menuItem.style.marginRight = '-10px';
                menuItem.style.fontSize = '3vh';
                context.prevMenuItem = menuItem;

            } else if(!section) {
                setSectionView(appConfig.sections[0].path, appConfig.sections[0].pageTitle);
                context.$$('.mi_0').style.marginRight = '-10px';
                context.$$('.mi_0').style.fontSize = '3vh';
                context.prevMenuItem = context.$$('.mi_0');
            } else {
                context.$$('.section_viewport').innerHTML = '<error-section></error-section>';
                document.title = '404';
            }

        };

        window.onpopstate = function() {
            getRoute();
        };

        window.onhashchange = function() {
            getRoute();
        };

        getRoute();

    },

    menuHandler: function() {
        var context = this;
        context.$$('.menu_container').addEventListener('click', function(e) {
            console.log(e.target);
            var colorProp = e.target.getAttribute('data-color');
            if (colorProp) {
                context.$$('.left_space').setAttribute('class', 'left_space ' + colorProp);
                context.$$('.big_arrow').setAttribute('class', 'big_arrow ' + colorProp);
                context.$$('.shadow_kill').setAttribute('class', 'shadow_kill ' + colorProp);
                context.$$('.section_viewport').setAttribute('class', 'section_viewport ' + colorProp + '_shift');
            }

            var shift = e.target.offsetTop;
            context.$$('.menu_container').style.transform = 'translate(0, -' + shift + 'px)';

            if(context.prevMenuItem) {
                context.prevMenuItem.style.marginRight = '0px';
                context.prevMenuItem.style.fontSize = '2.4vh';
            }

            e.target.style.marginRight = '-10px';
            e.target.style.fontSize = '3vh';
            context.prevMenuItem = e.target;
        })
    },

    created: function () {
        console.log('Element "' + this.is + '" - created');
    },

    ready: function() {
        this.buildMenu();
        this.menuHandler();
    },

    attached: function() {
        this.router();
    }

});