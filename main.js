// https://sheetjs.com/demo/table.html
class app{
    constructor(){
        this.init_table_data().init_dom().render();
    }
    init_table_data(){
        return this
        this.table_data = [
            ["This",   "is",     "a",    "Test"],
            ["வணக்கம்", "สวัสดี", "你好", "가지마"],            
            ["Click",  "to",     "edit", "cells"],
            [`
            <svg width="50" height="40" xmlns="http://www.w3.org/2000/svg"> 
                <g>                
                    <rect id="svg_1" height="37" width="33" y="108" x="95" stroke-width="1.5" stroke="#000" fill="#fff"/>
                </g>
            </svg>
            
            `]
        ];
        return this;
    }
    init_dom(){
        this.dom = [
            'output',
            'export_button',
        ].reduce((acc,el)=>{acc[el] = document.getElementById(el);return acc},{});
        
        this.dom.export_button.onclick=()=>{
            this.export('exTable');            
        }
        return this;
    }
    export(tableId){
        let tableData = document.getElementById(tableId).outerHTML;
        //tableData = tableData.replace(/<img[^>]*>/gi,""); //enable thsi if u dont want images in your table
        //tableData = tableData.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
        //tableData = tableData.replace(/<input[^>]*>|<\/input>/gi, ""); //remove input params    
        let a = document.createElement('a')
        let dataType = 'data:application/vnd.ms-excel';
        a.href = `${dataType}, ${encodeURIComponent(tableData)}`
        a.download = `test.xls`
        a.click()
    }
    render(){        
        return this
        var ws = XLSX.utils.aoa_to_sheet(this.table_data);
        var html_string = XLSX.utils.sheet_to_html(ws, { id: "data-table", editable: true });
        this.dom.output.innerHTML = html_string;
        return this;
    }
}
new app();