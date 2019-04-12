var COM = new Vue({
    el: '#example-2',
    data: {
        items: []
    },
    created: function () {
        var vm = this;
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:5000/api/request/',
            async: false,
            ContentType: 'application/json',
            success: function(data){
                vm.items = jQuery.parseJSON(data).requests;
            }
        });
    },
    methods: {
        createRequest (id) {

            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:5000/api/request/',
                async: false,
                dataType: 'json',
                data: {description: '1', service_id: id},
                ContentType: 'application/json',
                success: function(data){
                    debugger;
                }
            });
        }
    }
})
