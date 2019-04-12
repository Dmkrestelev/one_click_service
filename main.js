var VM = new Vue({
    el: '#example-1',
    data: {
        items: []
    },
    created: function () {
        var vm = this;
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:5000/api/services/',
            async: false,
            ContentType: 'application/json',
            success: function(data){
                vm.items = jQuery.parseJSON(data).services;
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



//$( document ).ready(function() {
//
//    $.ajax({
//        type: 'GET',
//        url: 'http://127.0.0.1:5000/api/services/',
//        async: false,
//        ContentType: 'application/json',
//        success: function(data){
//            jQuery.parseJSON(data).services.map(function(item){
//                $('#spisok').append("<li class='item' data-id='"+item.id+"'>"+item.name+"</li>");
//            });
//
//        }
//    });
//
//    $('#spisok li').on('click', function(){
////        var json = JSON.stringify({description: '1', service_id: $(this).data('id')});
//
//        $.ajax({
//            type: 'POST',
//            url: 'http://127.0.0.1:5000/api/request/',
//            async: false,
//            dataType: 'json',
//            data: {description: '1', service_id: $(this).data('id')},
//            ContentType: 'application/json',
//            success: function(data){
//                debugger;
//            }
//        });
//    });
//
//});