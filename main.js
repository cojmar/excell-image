class app{
    constructor(){
        $(()=>this.init_table().main());
    }
    init_table(){        
        $('#example').DataTable({            
            dom: 'Bfrtip',
            buttons: [
                'excel', 'pdf',
            ]
        });        
        return this;
    }
    log(data){
        console.log(data)
    }
    main(){
        this.log('ok');
        return this;
    }
}
new app();