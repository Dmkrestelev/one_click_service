export default {
    el: '#app',
    data: () => ({
        title: "hhhh",
        uslugi: [],
        usl: [{id: 1, name: "Консультация"}, {id: 2, name: "Адвокат"}, {id: 3, name: "Юрист"}]
    }),
    created:function(){
        this.loadProducts() //method1 will execute at pageload
    },
    methods: {
        loadProducts () {
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:5000/api/services/',
                async: false,
                ContentType: 'application/json',
                success: function(data){
                    this.title = "lldldld";
                    this.uslugi = jQuery.parseJSON(data).services;
//                    jQuery.parseJSON(data).services.map(function(item){
//                        $('#spisok').append($('li').text(item.name));
//                    });

                }
            });
        }
    }
};