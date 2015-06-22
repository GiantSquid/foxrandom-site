Polymer({

    is: 'projects-section',

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