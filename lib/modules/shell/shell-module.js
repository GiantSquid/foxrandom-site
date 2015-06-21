Polymer({

    is: 'shell-module',

    properties: {

        propExample: {
            type: String,
            value: ''
        }

    },

    hostAttributes: {},

    created: function () {
        console.log('Element "' + this.is + '" - created');
    }

});