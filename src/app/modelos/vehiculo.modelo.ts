export class Vehiculo {
    constructor(
        public vehicle_id:Number,
        public image: String,
        public year: String,
        public color: String,
        public price: String,
        public location: String,
        public engine:number,
        public cylinders:Number,
        public doors: Number,
        public description:String,
        
        public model_id: Number,
        public fuel_type_id: Number,
        public seller_id: Number,

        public brand_id:Number,
        public sold:Number,

        public model : {
            model_id:Number,
            name: String,
            brand: {
                brand_id: Number,
                name: String
            }
        },  

        public fuel_type: {
            fuel_type_id: Number,
            name: String
        },
 
        public seller: {
            seller_id: Number,
            name: String,
            email:String
            
        }

    ){}
}

        // public model : {
        //     model_id:Number,
        //     name: String,
        //     brand: {
        //         brand_id: Number,
        //         name: String
        //     }
        // },  

        // public fuel_type: {
        //     fuel_type_id: Number,
        //     name: String
        // },
 
        // public seller: {
        //     seller_id: Number,
        //     name: String,
        //     email:String
            
        // }