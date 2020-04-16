
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        trim:true
    },
    email:{

        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('email has not correct format')
                }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('age must be positive')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],

    avatar:{
        type:Buffer
    }


},
{

    timestamps:true
})


    userSchema.virtual('tasks',{
        ref:'Task',
        localField:'_id',
        foreignField:'owner'
    })

    userSchema.methods.toJSON=function(){

        const user=this
        const userObject=user.toObject()
        delete userObject.password
        delete userObject.tokens
        delete userObject.avatar
        return userObject

    }
    userSchema.methods.generateAuthToken= async function(){

            const user=this
            const token=await jwt.sign({ _id:user._id.toString() },process.env.JWT_SECRET,{expiresIn:'7 days'})
            user.tokens=user.tokens.concat({token})
            await user.save()
            return token

    }
    userSchema.statics.findByCredintials = async(email,password)=>{
        
        const user= await User.findOne({email})
        if(!user){
            
            throw new Error('unabale to login')
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error('unabale to login')
        }

        
        return user
    }


// hash password
userSchema.pre('save',async function(next){

    const user=this


if(user.isModified('password')){

    user.password=await bcrypt.hash(user.password,8)

}
    next()
})

const User=mongoose.model('User',userSchema)
 module.exports=User