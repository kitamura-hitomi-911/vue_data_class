let item_unit_list = [
    {
        id: 'unit1',
        title: 'input-type テキスト1つ',
        items:[
            {
                name: 'fuga',
                title: '個別のタイトル',
                form_type:'text',
                disp_type:'edit',
                value: '',
                placeholder:'個別のタイトルを入力'
            }
        ]
    },
    {
        id: 'unit2',
        title: 'input-type radio',
        items:[
            {
                name: 'fuga',
                title: '個別のタイトル',
                form_type:'radio',
                disp_type:'edit',
                value: '',
                list:[
                    {
                        value:1,
                        label:'表示用ラベル1'
                    },
                    {
                        value:2,
                        label:'表示用ラベル2'
                    }
                ]
            }
        ]
    },
    {
        id: 'unit3',
        title: 'input-type checkbox',
        items:[
            {
                name: 'fuga_check',
                title: 'チェックボックス複数',
                form_type:'checkbox',
                disp_type:'edit',
                value: [],
                list:[
                    {
                        value:1,
                        label:'表示用ラベル1'
                    },
                    {
                        value:2,
                        label:'表示用ラベル2'
                    }
                ]
            }
        ]
    },
    {
        id: 'unit4',
        title: 'input-type checkbox & input',
        items:[
            {
                name: 'unit4_check',
                title: '',
                form_type:'checkbox',
                disp_type:'edit',
                value: false, // 1つのときは Boolean
                list:[
                    {
                        value:1,
                        label:'チェック？'
                    }
                ]
            },
            {
                name: 'unit4_text',
                title: '補足',
                form_type:'text',
                disp_type:'edit',
                value: '',
                placeholder:'チェックしたときだけ入力'
            }
        ],
        updateItemsByUpdate:function(){
            this.items_obj.unit4_text.updateProperty('disabled', !this.items_obj.unit4_check.value)
        }
    },
    {
        id: 'term',
        title: 'term',
        items:[
            {
                name: 'entry_open_dt',
                title: '開始日',
                form_type:'date',
                disp_type:'edit',
                value: ''
            },
            {
                name: 'entry_open_time',
                title: '開始時間',
                form_type:'time',
                disp_type:'edit',
                value: ''
            },
            {
                name: 'term_end_dt',
                title: '終了日',
                form_type:'date',
                disp_type:'edit',
                value: '',
            },
            {
                name: 'term_end_time',
                title: '終了時間',
                form_type:'time',
                disp_type:'edit',
                value: '',
            }
        ],
        observe_unit_ids:['unit6'],
        isValid:function(){
            this.resetErrMsg();
            // this.hasEmptyError() && this.setErrMsg('〇〇は入力必須です');
            //!this.hasErrMsg() && !this.items_obj.entry_open_time.value.match(/^\d{2}:\d{2}$/) && this.setErrMsg('開始のフォーマットが正しくありません');
            return !this.hasErrMsg();
        },
        onNotifiedUpdateFromObserveUnit:function(unit){
            console.log(unit , 'からの更新通知きた。');
            this.items_obj.entry_open_time.disabled =  unit.items_obj.tour_type.value === 2;
        }
    },
    {
        id: 'unit6',
        title: '大会形式',
        items:[
            {
                name: 'tour_type',
                title: '形式',
                form_type:'radio',
                disp_type:'edit',
                value: '',
                list:[
                    {
                        value:1,
                        label:'個人'
                    },
                    {
                        value:2,
                        label:'団体'
                    }
                ]
            },
            {
                name: 'tour_member',
                title: '団体の場合は人数を入力',
                form_type:'number',
                disp_type:'edit',
                value: '',
                min:2,
                max:5
            },
        ],
        updateItemsByUpdate:function(){
            this.items_obj.tour_member.updateProperty('disabled', !this.items_obj.tour_type.value || this.items_obj.tour_type.value === 1)
        }
    },
    {
        id: 'unit7',
        title: 'file',
        design_type: 'filetype',
        items:[
            {
                name: 'mainimage',
                form_type:'file',
                disp_type:'edit',
                value: ''
            },
            {
                name: 'temporary_id',
                form_type:'hidden',
                disp_type:'edit',
                value: ''
            },
        ]
    },
];