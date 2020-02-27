class app{
    constructor(){
        document.getElementById('export_button').onclick=()=>{
            this.export('export_table','test.xls');
        }
    }
    make_png_form_svg(svg_xml){
        return new Promise((resolve,reject)=>{
            let png;
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");
            let img = new Image();        
            img.src = "data:image/svg+xml;base64," + btoa(svg_xml);    
            img.onload = function() {            
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            }           
        });
    }
    get_table_data(tableId){
        return new Promise((resolve,reject)=>{
            let temp = document.createElement("div");
            temp.innerHTML = document.getElementById(tableId).outerHTML;
            let svgs = temp.getElementsByTagName("svg");
            let done = 0;
            let len = svgs.length;
            for(let svg of svgs){
                let svg_text = svg.outerHTML;           
                this.make_png_form_svg(svg_text).then(
                    (png)=>{
                        temp.innerHTML = temp.innerHTML.split(svg_text).join(png);
                        done++
                        if (len-done <=0 ) resolve(temp.innerHTML);                    
                    }
                );            
            }
        });        
    }
    export(tableId,file_name){
        this.get_table_data(tableId).then((tableData)=>{
            let a = document.createElement('a');
            let dataType = 'data:application/vnd.ms-excel';
            a.href = `${dataType}, ${encodeURIComponent(tableData)}`
            a.download = file_name;
            a.click()
        });
    }
}
new app();