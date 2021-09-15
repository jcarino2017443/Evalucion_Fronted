export class Usuario {
    constructor (
        public id: Number,
        public name: String,
        public email: String,
        public phone_number: String,
        public identification: String,
        public role_id: Number,
        public role:{
            role_id:Number,
            name:String
        },
        public password: String,
        public password_confirmation: String

    ){}
}