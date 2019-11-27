(function(){
    'use strict';
    // 各フォームパーツ
    /**
     * Item フォームパーツ単位
     * @param params
     * @constructor
     */
    let Item = function(params){
        if(!params || !params.name){
            return;
        }
        this.name = '';
        this.value = '';
        this.value_lavel = '';
        this.title = ''; //見出し文字列
        this.form_type = ''; // text|number|date|time|checkbox|radio|select|textarea|hidden
        this.disp_type = '';// edit|view|enable
        this.err_msgs = [];
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
            if(this[key] !== void 0 || typeof params[key] == "function"){
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
            date: 'form-input',
            time: 'form-input',
            checkbox: 'form-checkbox',
            radio:'form-radio',
            select:'form-select',
            textarea:'form-textarea',
            file:'form-file',
            hidden: 'form-input'
        };
        this.component_name = this.disp_type === 'view' ? 'form-display_only' : component_name_map[this.form_type];
    };
    Item.prototype.updateProperty = function(name, value){
        this[name] = value;
    };
    Item.prototype.setValueLabel = function(){
        // 特に指定がなければ value をそのまま表示
        this.value_label = this.value || '(未設定)';
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
        this.err_msgs = [];
        this.observe_other_unit_ids = []; // 更新情報を受けとりたい他のUnitのidの配列
        this.notify_update_other_units = [];// 更新情報を通知するほかのUnit(オブジェクト)の配列

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
            this.items_obj[item.name] = item;
        },this);
        this.updateItemsByUpdate();
    };
    ItemUnit.prototype.getDispType = function(){
        let exists_edit_item = this.items.some(function(item){
            return item.disp_type === 'edit';
        });
        return exists_edit_item ? 'edit' : 'view'
    };
    ItemUnit.prototype.updateItemsByUpdate = function(){};
    // 更新情報を通知するほかのUnit(オブジェクト）を追加
    ItemUnit.prototype.setNotifyUpdateToOtherUnit = function(unit){
        this.notify_update_other_units.push(unit);
    };
    // notify_update_other_units にある unit（オブジェクト） の observerFromOtherUnit をたたく
    ItemUnit.prototype.notifyUpdateToOtherUnits = function(){
        this.notify_update_other_units.forEach(function(other_unit){
            other_unit.observerFromOtherUnit(this);
        },this)
    };
    // 他のUnitからの更新情報受け取り口
    ItemUnit.prototype.observerFromOtherUnit = function(other_unit){
        console.log('this',this);
        console.log('other_unit', other_unit);
    };
    ItemUnit.prototype.isValid = function(){
        // チェック内容がなければ常にtrue
        return true;
    };
    // 未入力エラーがないか汎用
    ItemUnit.prototype.hasEmptyError = function(){
        return this.items.reduce(function(flg,item){
            return !item.value || flg;
        },false);
    };
    // エラーメッセージをリセット
    ItemUnit.prototype.resetErrMsg = function(){
        this.err_msgs.splice(0);
    };
    // エラーメッセージをセット
    ItemUnit.prototype.setErrMsg = function(msg){
        this.err_msgs.push(msg);
    };
    // エラーメッセージがあるかどうか
    ItemUnit.prototype.hasErrMsg = function(){
        return !!this.err_msgs.length;
    };

    window.ItemUnit = ItemUnit;

})();