(function(){
    'use strict';
    // 各フォームパーツ
    /**
     * Item フォームパーツ単位
     * @param params
     * @constructor
     */
    let Item = function(params){
        if(!params || !params.id || !params.name){
            return;
        }
        this.id = '';
        this.name = '';
        this.value = '';
        this.value_lavel = '';
        this.title = ''; //見出し文字列
        this.form_type = ''; // text|number|datetime|date|time|checkbox|radio|select|textarea|hidden
        this.view_type = '';// edit|view|enable
        this.err_msg = '';
        this.is_modified = false;
        this.disabled = false;

        // form_type が number
        this.max = '';
        this.min = '';
        this.step = '';

        // form_type が text, textarea
        this.maxlength = '';
        this.minlength = '';
        this.placeholder = '';
        this.pattern = '';

        // form_type が text
        this.pattern = '';

        // form_type が select|checkbox|radio
        this.list = [];

        Object.keys(params).forEach(function(key) {
            if(this[key] !== void 0){
                this[key] = params[key];
            }
        }, this);
        this.init();
    };
    Item.prototype.init = function(){
        // component_name をセット
        let component_name_map = {
            text : 'form-input',
            number: 'form-input',
            datetime: 'form-datetime',
            date: 'form-input',
            time: 'form-input',
            checkbox: 'form-checkbox',
            radio:'form-radio',
            select:'form-select',
            textarea:'form-textarea',
            hidden: 'form-input'
        };
        this.component_name = component_name_map[this.form_type];
    };
    Item.prototype.updateProperty = function(key, value){
        this[key] = value;
    };
    window.Item = Item;

    /**
     * ItemUnit 見出し単位
     * @param params
     * @constructor
     */
    let ItemUnit = function(params){
        if(!params || !params.id || !params.title){
            return;
        }
        this.id = '';
        this.title = ''; // 見出し文字列
        this.design_type = 'single';// single | multiple
        this.items = []; // 各フォームパーツがぶら下がる
        Object.keys(params).forEach(function(key) {
            if(this[key] !== void 0 || typeof params[key] == "function"){
                this[key] = key === 'items' ? params[key].map(function(item_params){
                    return new Item(item_params);
                }) : this[key] = params[key];
            }
        }, this);
        this.init();
    };
    ItemUnit.prototype.init = function(){
        this.items_obj = {};
        this.items.forEach(function(item){
            this.items_obj[item.id] = item;
        },this);
        this.updateItemsByUpdateValue();
    };
    ItemUnit.prototype.updateItemsByUpdateValue = function(){};
    ItemUnit.prototype.isValid = function(){
        // チェック内容がなければ常にtrue
        return true;
    };
    // 未入力エラーがないか汎用チェック
    ItemUnit.prototype.hasEmptyError = function(){
        return this.items.reduce(function(flg,item){
            item.err_msg = item.value ? '' : '入力してください';
            return !item.value || flg;
        },false);
    };

    window.ItemUnit = ItemUnit;

})();