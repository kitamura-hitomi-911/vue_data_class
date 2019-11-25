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
        updateItemsByUpdateValue:function(){
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
        isValid:function(){
            this.resetErrMsg();
            this.hasEmptyError() && this.setErrMsg('〇〇は入力必須です');
            !this.hasErrMsg() && !this.items_obj.unit5_start.value.match(/hoge/) && this.setErrMsg('開始のフォーマットが正しくありません');
            return !this.hasErrMsg();
        }
    },
    {
        id: 'unit6',
        title: 'viewタイプテスト',
        items:[
            {
                id: 'unit6_text',
                name: 'unit6_text',
                title: 'viewタイプテスト',
                form_type:'text',
                disp_type:'view',
                value: '',
                placeholder:'個別のタイトルを入力',
                setValueLabel:function(){
                    this.value_label = this.value || '(未設定)';
                }
            }
        ]
    },
];