const model=require("./model");
const bcrypt=require("bcrypt");

const registerUser=async(req, res)=>{
    const { username, email, password }=req.body;
    if(!username || !email || !password){
        return res.status(400).json({ message: "All are required" });
    }
    try{
        const checkUsername=await model.query(`select * from users where username=$1`, [username]);
        if(checkUsername.rowCount!==0){
            return res.status(400).json({ message: "A user with this username is already there" });
        }
        const checkEmail=await model.query(`select * from users where email=$1`, [email]);
        if(checkEmail.rowCount!==0){
            return res.status(400).json({ message: "A user with same email is already there" });
        }
        const hashedPassword=await bcrypt.hash(password, 10);
        const result=await model.query(`insert into users(username, email, password) values($1, $2, $3) returning username`, [username, email, hashedPassword])
        return res.status(200).json({ username: result.rows[0].username, message: "User registration successful" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const loginUser=async(req, res)=>{
    const { credential, password }=req.body;
    if(!credential || !password){
        return res.status(400).json({ message: "All are required" });
    }
    try{
        const result=await model.query(`select * from users where username=$1 or email=$1`, [credential]);
        if(result.rowCount===0){
            return res.status(400).json({ message: "User not found" });
        }
        const user=result.rows[0];
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Passwords don't matches" });
        }
        return res.status(200).json({ username: user.username, message: "Login successfull" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const logoutUser=async(req, res)=>{}

const deleteUser=async(req, res)=>{
    const { username }=req.body;
    try{
        if(!username){
            return res.status(400).json({ message: "User not found" });
        }
        const result=await model.query(`delete from users where username=$1`, [username]);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const fetchDates=async(req, res)=>{
    const { username }=req.params;
    if(!username){
        return res.status(400).json({ message: "User not found" });
    }
    try{
        const result=await model.query(`select * from fav where username=$1 order by date`, [username]);
        if(result.rowCount===0){
            return res.status(200).json({ data: [], message: "Favourite list is empty" });
        }
        res.status(200).json({ data: result.rows, message: "Items fetched successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const inFav=async(req, res)=>{
    const { username, date }=req.params;
    if(!username){
        return res.status(400).json({ message: "User not found" });
    }
    if(!date){
        return res.status(400).json({ message: "Date is required" });
    }
    try{
        const check=await model.query(`select * from fav where username=$1 and date=$2`, [username, date]);
        const result=check.rowCount!==0;
        res.status(200).json({ present: result });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const toggleFav=async(req, res)=>{
    const { username, title, date }=req.body;
    if(!username){
        return res.status(400).json({ message: "User not found" });
    }
    if(!title || !date){
        return res.status(400).json({ message: "Title and date are required" });
    }
    try{
        const check=await model.query(`select * from fav where username=$1 and date=$2`, [username, date]);
        if(check.rowCount===0){
            const result=await model.query(`insert into fav(username, title, date) values($1, $2, $3) returning *`, [username, title, date]);
            res.status(200).json({ title: result.rows[0].title, date: result.rows[0].date, message: "Item added to favourites" });
        }
        else{
            const result=await model.query(`delete from fav where username=$1 and date=$2`, [username, date]);
            res.status(200).json({ message: "Item removed from favourites" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const removeItem=async(req, res)=>{
    const { username, title, date }=req.body;
    if(!username){
        return res.status(400).json({ message: "User not found" });
    }
    if(!title || !date){
        return res.status(400).json({ message: "Title and date are required" });
    }
    try{
        const result=await model.query(`delete from fav where username=$1 and date=$2`, [username, date]);
        res.status(200).json({ message: "Item removed from favourites" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports={
    registerUser,
    loginUser,
    deleteUser,
    fetchDates,
    inFav,
    toggleFav,
    removeItem
}