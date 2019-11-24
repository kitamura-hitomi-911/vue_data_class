(function(){
    'use strict';

    Vue.component('form-unit',{
        props:{
            unit_data:{
                type:ItemUnit,
                requird:true
            }
        },
        template:'#tmpl-form-unit'
    });

    Vue.component('form-input',{
        props:{
            form_data:{
                type:Item,
                requird:true
            }
        },
        template:'#tmpl-form-input'
    });


})();